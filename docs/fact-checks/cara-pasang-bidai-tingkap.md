# Fact-check: Cara Pasang Bidai Tingkap (Malay guide)

- Draft: `src/content/posts/cara-pasang-bidai-tingkap.html` (body)
- Page: https://kovasunshade.com/bidai/jurnal/cara-pasang-bidai-tingkap (MS, plan item g5, keyword "cara pasang bidai tingkap" 390/mo + "cara pasang bidai" 110/mo, Keyword Planner MY via keyword_volume, 19 Oct 2026; no service or location page targets it)
- Title (search): "Cara Pasang Bidai Tingkap: Langkah & Tip Keselamatan | Kova" (`src/lib/blogSeoOverrides.ts`)
- H1: "Cara Pasang Bidai Tingkap: Apa yang Perlu Tahu Sebelum Pasang"
- Meta description: "Cara pasang bidai tingkap: dalam atau luar bingkai, mengukur, menggerudi tanpa kena kabel, alat keselamatan tali, dan bila lebih baik guna pemasang."
- Excerpt (`src/content/posts/local-posts.json`): "Langkah memasang bidai tingkap: pemasangan dalam atau luar, mengukur, menggerudi dengan selamat, alat keselamatan tali, dan bila lebih baik guna pemasang bidai."
- Image: Kova's own showcase photo `/showcase/white-venetian-800.webp` (the site's white aluminium Venetian, `src/lib/brochure/data.ts` 206-207 and 230 "alu"). Alt: "Bidai Venetian aluminium putih dipasang di dalam ceruk tingkap dapur, di atas singki dan kaunter" (what the photo shows: a white Venetian inside a kitchen window recess above a sink and counter).
- Structured data (built page): Article, author = Organization "Kova Sun Shade" (no person byline: nobody at Kova reviewed it), datePublished set; html lang "ms"; canonical and hreflang ms / x-default to itself. No price anywhere (quote-only client).
- Only-the-client element: Kova's own measuring and installation process (conversation, hand measuring with a photo and notes for every window, check of inside or outside mount, one-visit install, every blind tested), its 10-14 working-day lead time, free measuring in the Klang Valley and the one-working-day callback, all from Kova's own site copy (`src/lib/i18n/ms.ts`).
- Safety facts (health/safety): each one is from a recognised safety body: RoSPA (UK Royal Society for the Prevention of Accidents) for cords, Electrical Safety First (UK electrical safety charity) for drilling. Both are listed under "Sumber" on the page.

## Claims → sources

| # | Claim in the guide | Source |
|---|---|---|
| 1 | Inside vs outside mount: neither is automatically better; inside gives a neat, integrated look when the recess is deep enough; outside covers past the opening, gives more coverage and helps cut light gaps at the sides | Kova roller FAQ `ms.ts` 1005-1006: "Tiada yang lebih baik secara automatik. Pemasangan dalam beri rupa kemas dan bersepadu bila ceruk tingkap cukup dalam. Pemasangan luar menutup melepasi bukaan tingkap dan beri liputan lebih, yang membantu bila anda nak kurangkan celah cahaya di tepi. Kami akan nasihatkan masa pengukuran." |
| 2 | "Kami tentukan perkara ini semasa pengukuran, bersama anda" | Same, `ms.ts` 1006 "Kami akan nasihatkan masa pengukuran"; `ms.ts` 892 "periksa keadaan pemasangan, termasuk sama ada pemasangan dalam atau luar lebih sesuai untuk ruang itu" |
| 3 | Measure the real window on site and check where the blind will be fitted | `ms.ts` 892: "Kami ukur tingkap yang sebenar dan periksa keadaan pemasangan" |
| 4 | Record every window with a photo and notes; that is how Kova's team works when measuring | `ms.ts` 448: "Di lokasi, ukur tangan-tangan. Setiap tingkap dicatat dengan foto dan nota." |
| 5 | Ceiling height, fixing position, access and the structure around the window all affect how the blind is fitted / the final spec | `ms.ts` 1626: "Ketinggian siling, lokasi lekapan, akses dan struktur sekeliling tingkap mempengaruhi spesifikasi akhir." |
| 6 | Before drilling, make sure no socket or switch is aligned vertically or horizontally with the hole; drilling through a cable risks a serious electric shock | Electrical Safety First: "Make sure you're not about to drill through a cable, which could risk you getting a serious electric shock … ensure there are no sockets or switches either vertically or horizontally aligned with the hole you're about to drill" https://www.electricalsafetyfirst.org.uk/news-and-insights/how-to-avoid-a-costly-lockdown-diy-disaster/ |
| 7 | If you hit a cable and the fuse blows or the breaker trips: don't remove the screw/nail, don't repair the cable yourself, call a registered electrician | Same page: "If you do damage a cable and the fuse blows or the circuit-breaker trips – don't try to remove any screw/nail that might be left in – and don't try to repair the damaged cable yourself. Instead, call in a registered electrician." |
| 8 | Wear goggles while drilling; keep children and pets away from the work area | Electrical Safety First, Drills: "It's advisable to wear a pair of goggles while drilling" and "keep pets and children away from the area you're working in" https://www.electricalsafetyfirst.org.uk/safety-advice/products-and-appliances/diy-tools/drills/ |
| 9 | Read the instructions that come with the blind and follow the manufacturer's guidance carefully | RoSPA: "read the instructions! Follow the manufacturer's guidance carefully." https://www.rospa.com/campaigns-fundraising/Current/Blind-cord |
| 10 | Install every safety device that comes with a new blind; a new blind with a looped cord or chain should come with a safety device already installed or included to install yourself | RoSPA: "Be sure to install any safety devices included with your new blind." and "If you buy a new blind with a looped cord or chain today, it will have a safety device already installed or included for you to install yourself." (same URL; the guide says "patut" = should, since this is the UK standard since 2014) |
| 11 | Fit cleats at least 1.5 m from the floor, out of children's reach, and wrap cords round them in a figure of eight | RoSPA: "Cords should be secured around cleats in a figure of eight. Install cleats at least 1.5 metres from the ground so that they are out of the reach of curious little hands." (same URL) |
| 12 | Don't cut cords or chains: it doesn't remove the risk and may damage the blind | RoSPA: "Don't cut cords or chains – this won't remove the risk and may damage your blind." (same URL) |
| 13 | Keep beds and cots away from the window; never fit a looped cord or chain blind in a child's bedroom; consider a cordless model for a new blind | RoSPA: "Position your child's cot or bed away from the window."; "Never fit a blind with a looped cord or chain in your child's bedroom" (quoted and passed in the motorised guide fact-check, 24 Oct); "consider choosing a cordless model" (same URL) |
| 14 | Roller: lower and raise; the fabric should roll smoothly and the blind sit correctly in the space | Kova roller page `ms.ts` 910: "Pasukan kami pasang dan uji setiap bidai untuk pastikan ia bergulung lancar dan duduk betul dalam ruang itu." |
| 15 | Venetian: slats tilt, raise and lower correctly | Kova Venetian page `ms.ts` 1306: "Pasukan kami pasang dan uji bidai supaya bilah miring, naik dan turun dengan betul." |
| 16 | VertiSheer: check alignment; slats move and rotate correctly across the whole opening | Kova VertiSheer page `ms.ts` 1677: "Pasukan kami pasang sistem itu, periksa penjajaran dan pastikan bilah bergerak dan berputar dengan betul merentasi keseluruhan bukaan." |
| 17 | Tall windows / glass walls: ceiling height and access affect the final spec; Kova's VertiSheer track is built for spans up to 6 m, for sliding doors, glass walls and double-height windows | `ms.ts` 1626 (as #5); `ms.ts` 356: "Pintu gelongsor, dinding kaca, tingkap dua tingkat. Trek dibina untuk jarak sehingga 6 meter."; `ms.ts` 557 "trek lancar sampai 6 meter" |
| 18 | Motorised: the right motor setup depends on blind size, access to power and how you want to control it | `ms.ts` 1002: "Sistem motor terbaik bergantung pada saiz bidai, akses kepada kuasa elektrik dan cara anda nak mengawalnya." (en.ts 1025 same) |
| 19 | Use an installer if you are not sure where electrical cables are or are not comfortable drilling | Advice that follows from #6-7 (Electrical Safety First): the risk is drilling into a hidden cable; no new fact |
| 20 | Kova's 4-step process: conversation about the room's use and how light comes in; on-site hand measuring with photo and notes per window, plus the inside/outside check; a small set of fabrics and mechanisms chosen for the room; installed in one visit | `ms.ts` 446-450 (steps 01-04: "Perbualan … apa fungsi bilik anda dan bagaimana cahaya masuk"; "Pengukuran … ukur tangan-tangan. Setiap tingkap dicatat dengan foto dan nota"; "Spesifikasi … Set kecil kain dan mekanisma yang dipilih khas untuk bilik anda"; "Pemasangan … Dipasang dalam satu lawatan"); `ms.ts` 892 |
| 21 | Kova's team installs and tests every blind so it moves smoothly and sits correctly | `ms.ts` 910, 1306, 1677 (as #14-16) |
| 22 | Most projects take 10-14 working days from order to install after the spec is confirmed, depending on fabric availability and motorisation | `ms.ts` 549: "Selepas spesifikasi disahkan, kebanyakan projek mengambil masa 10–14 hari bekerja dari pesanan ke pemasangan — bergantung pada ketersediaan kain dan pilihan bermotor." |
| 23 | Kova makes roller, Venetian and VertiSheer blinds to measure | `ms.ts` 20: "Bidai dan langsir tingkap ikut ukuran — roller, Venetian dan VertiSheer" |
| 24 | Free measuring across the Klang Valley | `ms.ts` 20 and 28: "Pengukuran percuma di Lembah Klang."; `ms.ts` 569 (Kuala Lumpur and Selangor) |
| 25 | The studio contacts you within one working day to arrange the measuring date | `ms.ts` 487: "Orang studio kami akan hubungi anda dalam satu hari bekerja untuk atur tarikh pengukuran." |
| 26 | WhatsApp for a free quote (+60 12-676 2409) / contact page | Kova contact details (site footer, `ms.ts` 65-67 "Dapatkan sebut harga bidai percuma … WhatsApp kami") |

No prices, discounts or "% cheaper" claims are in the guide (Kova is quote-only).

## Chief of Staff check
- Round 1: requested 30 Oct 2026 01:59 MYT; answered 02:02 MYT: PASS, no fixes.
- The Chief checked the draft, all three sources (opened and read 30 Oct), the Malay site copy, the live bundle and pages, the links and the cover photo.
- ✓ 1-5: live roller / VertiSheer pages and bundle, same wording as ms.ts 1006, 892, 448, 1626.
- ✓ 6-8: Electrical Safety First (lockdown DIY page; Drills page), quotes match.
- ✓ 9-13: RoSPA Blind cords page, quotes match; #10 framed as RoSPA's UK advice with "patut", fair for Malaysia.
- ✓ 14-18: live roller, Venetian and VertiSheer pages and /bidai FAQ, wording matches.
- ✓ 19: advice that follows from 6-7, no new fact.
- ✓ 20-26: live bundle and pages (process steps, 10-14 working days, free measuring KL and Selangor, one-working-day callback, contact number and WhatsApp link).
- ✓ Page checks: title, H1, description, excerpt, Article author Organization, image (rendered showcase image, alt accurate), links all 200, no price.

Checked by Chief of Staff 30 Oct 2026: PASS
