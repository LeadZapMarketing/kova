import { supabase } from "./supabase";
import localPostMeta from "@/content/posts/local-posts.json";

/*
 * Posts kept in the repo (src/content/posts): the site's Supabase key is
 * read-only, so the SEO guides LeadZap writes ship with the code instead.
 * Metadata is small and bundled; each body is its own lazy chunk, loaded
 * only when that article is rendered. scripts/generate-sitemap.mjs reads
 * the same JSON, so these posts also land in the sitemap.
 */
const localBodies = import.meta.glob("../content/posts/*.html", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>;
const localPosts = localPostMeta as Array<Omit<BlogPost, "content"> & { slug: string; lang: string }>;

async function getLocalPost(slug: string, lang: string): Promise<BlogPost | null> {
  const meta = localPosts.find((p) => p.slug === slug && p.lang === lang);
  const load = meta && localBodies[`../content/posts/${slug}.html`];
  if (!meta || !load) return null;
  return { ...meta, content: await load() };
}

function byPublishedDesc(a: BlogPostSummary, b: BlogPostSummary) {
  return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
}

export type BlogCategory = "All" | "设计知识" | "项目故事";

export interface BlogPost {
  id: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
  content?: string;
  excerpt?: string;
  image?: string;
  publishedAt?: string;
  tags?: string;
  title?: string;
  featured?: boolean;
  slug?: string;
  lang?: string;
}

/** 列表页使用的轻量级类型 */
export type BlogPostSummary = Omit<BlogPost, "content">;

/**
 * 获取特定语言、已发布的文章（按发布时间倒序）
 */
export async function listPosts(category: BlogCategory = "All", lang: string = "en"): Promise<BlogPostSummary[]> {
  const local = localPosts.filter((p) => p.lang === lang);
  const remote = await listRemotePosts(category, lang);
  const seen = new Set(remote.map((p) => p.slug));
  return [...remote, ...local.filter((p) => !seen.has(p.slug))].sort(byPublishedDesc);
}

async function listRemotePosts(_category: BlogCategory, lang: string): Promise<BlogPostSummary[]> {
  if (!supabase) {
    console.warn("[blog] Supabase 客户端未初始化");
    return [];
  }

  // 1. 基础查询：增加了 .eq("lang", lang) 来精确筛选语言
  let query = supabase
    .from("KovaTable")
    .select(`
      id, 
      slug, 
      title, 
      excerpt, 
      image, 
      author, 
      tags, 
      featured, 
      lang,
      createdAt:"createdAt", 
      updatedAt:"updatedAt", 
      publishedAt:"publishedAt"
    `)
    .eq("lang", lang); 

  // 2. 时间与发布状态过滤
  query = query
    // .not('"publishedAt"', "is", null)
    // .lte('"publishedAt"', new Date().toISOString())
    .order('"publishedAt"', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error("[blog] listPosts 失败:", error.message);
    return [];
  }

  console.log(`[blog] 从 KovaTable 成功获取到的 [${lang}] 原始数据包:`, data);
  
  return (data ?? []) as BlogPostSummary[];
}

/**
 * 根据 slug 和当前语言获取单篇文章内容
 */
// lib/blog.ts 临时修改
export async function getPost(slug: string, lang: string = "en"): Promise<BlogPost | null> {
  const local = await getLocalPost(slug, lang);
  if (local) return local;
  if (!supabase) return null;

  // 这里只保留最核心的两个维度：slug 和 lang
  const { data, error } = await supabase
    .from("KovaTable")
    .select(`
      id, slug, title, excerpt, content, image, author, tags, featured, lang,
      createdAt, updatedAt, publishedAt
    `)
    .eq("slug", slug)
    .eq("lang", lang) 
    .maybeSingle();

  if (error) {
    console.error("[blog] getPost 失败:", error.message);
    return null;
  }
  
  return (data ?? null) as BlogPost | null;
}

/**
 * 构建期（SSG）用：列出所有文章的 slug + lang，
 * 给 vite-react-ssg 的 getStaticPaths 和 sitemap 预渲染每篇文章。
 * 两条路由（/blog/:slug 和 /bidai/jurnal/:slug）都会调用，所以缓存一次请求。
 */
let slugCache: Promise<Array<{ slug: string; lang: string }>> | null = null;
export function listPostPaths(): Promise<Array<{ slug: string; lang: string }>> {
  if (slugCache) return slugCache;
  const local = localPosts.map((p) => ({ slug: p.slug, lang: p.lang }));
  slugCache = (async () => {
    if (!supabase) return local;
    const { data, error } = await supabase
      .from("KovaTable")
      .select("slug, lang")
      .not("slug", "is", null);
    if (error) {
      console.warn("[blog] listPostPaths 失败:", error.message);
      return local;
    }
    const remote = (data ?? []).filter((r) => r.slug) as Array<{ slug: string; lang: string }>;
    const seen = new Set(remote.map((r) => `${r.lang}:${r.slug}`));
    return [...remote, ...local.filter((r) => !seen.has(`${r.lang}:${r.slug}`))];
  })();
  return slugCache;
}

// 月份写死而不用 toLocaleDateString：文章现在会在构建期预渲染，
// 构建机器和访客浏览器的时区/ICU 不同会导致日期字符串不一致 → hydration 报错。
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_MS = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];

/** 格式化日期显示 ("12 March 2025") — 在服务器和浏览器输出完全一致 */
export function formatPostDate(iso: string | undefined | null, locale = "en-MY"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const months = locale.startsWith("ms") ? MONTHS_MS : MONTHS_EN;
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}