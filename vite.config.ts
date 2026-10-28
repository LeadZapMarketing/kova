import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// vite-react-ssg (see main.tsx's ViteReactSSG({ routes })) already renders
// each route server-side at build time and bakes in its own <title>/meta
// via <SeoHead>, producing a real dist/<route>/index.html per page. An
// earlier regex-based post-build "prerenderStaticHead" plugin that used to
// live here duplicated that job by copying the home page's HTML shell over
// every other route and hand-patching its <head> — with real per-route SSR
// in place, that copy would have overwritten every other page's rendered
// body with the home page's. Removed; vite-react-ssg is the single source
// of truth for prerendered HTML now.
// 直接引入包，TypeScript 会自动将 ssgOptions 的类型合并到 Vite 的 UserConfig 中
import "vite-react-ssg";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    dirStyle: 'nested',
    // Critical CSS (beasties): inline each page's above-the-fold rules and
    // load the full stylesheet after the content. Leave the <style> tags
    // React renders inside the page alone, or hydration no longer matches.
    beastiesOptions: {
      reduceInlineStyles: false,
      mergeStylesheets: false,
    },
    // The page's own meta tags are rendered ahead of everything in index.html,
    // which pushed <meta charset> about 5 KB down (browsers look for it in the
    // first 1 KB) and left the main photo's preload behind all the inline CSS.
    // Put them at the very top of <head> so a phone asks for the photo first.
    onPageRendered: (_route, html) => {
      let head = '<head>';
      const charset = html.match(/<meta charset="[^"]*">/i);
      if (charset) {
        html = html.replace(charset[0], '');
        head += charset[0];
      }
      // The viewport has to come before the photo, or a phone sizes the
      // preload for a 980 px desktop screen and fetches the 1400 px file too.
      const viewport = html.match(/<meta name="viewport"[^>]*>/i);
      if (viewport) {
        html = html.replace(viewport[0], '');
        head += viewport[0];
      }
      const photo = html.match(/<link rel="preload" as="image"[^>]*fetchpriority="high"[^>]*>/i);
      if (photo) {
        html = html.replace(photo[0], '');
        head += photo[0];
      }
      return html.replace('<head>', head);
    },
  },
  // 👇 添加下面这段 build 配置
  build: {
    modulePreload: {
      polyfill: true, // 确保开启预加载
    },
  }
});