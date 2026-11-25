# Scorpion Golf Cart Rental: SEO audit and 90-day plan

Prepared October 20, 2026; updated November 25, 2026. Canonical website: https://www.scorpiongolfcarts.com/.

## November 25, 2026 update: why the site still is not showing, and what changed

**Live checks (Nov 25):** the Oct 20 prerendered build is live. HTTPS, apex/HTTP redirects to www, real 404s, robots.txt, and sitemap all respond correctly. The site is therefore crawlable in principle. However:

- A web search index from the Bing family (which also powers ChatGPT search, Copilot, and DuckDuckGo) returned **no pages** from scorpiongolfcarts.com, and the brand name returned no results. Search results for "golf cart rental San Pedro" are dominated by Expedia, Marriott Activities, Booking.com, and Viator-style listings of competing operators.
- Hostinger's CDN (`hcdn`) returned **429 Too Many Requests to the GPTBot user agent** and **403 to requests claiming to be Googlebot/Bingbot**. The 403 is probably Hostinger's fake-bot filter (the test did not come from Google or Bing IP addresses), but it must be confirmed with Search Console's live URL test and Bing's URL inspection. The 429 suggests AI crawlers are being blocked or rate-limited at the hosting level.
- The site is new, has no known backlinks, and has no verified Google Business Profile linked to it. For a local rental search, the Google map pack and travel marketplaces win far more clicks than a new website's organic listing.

**Code changes in this update:**

| Area | Change |
| --- | --- |
| Performance | Replaced the 3.9 MB Material Symbols font (preloaded on every page with `font-display: block`) with a 22 KB content-hashed subset. `npm run icons` regenerates it. |
| AI engines | robots.txt explicitly allows search and AI crawlers. Added `/llms.txt` with key facts and page list. Added answer-first "quick facts" blocks. |
| Bing / IndexNow | Added an IndexNow key file and `npm run indexnow` to submit all URLs to Bing, Yandex, and other engines after each deploy. |
| Structured data | Business is now `AutoRental` (a LocalBusiness subtype) with opening hours, contact point, payment methods, services, and Instagram + TikTok `sameAs`. FAQPage on four pages (generated from the same text shown on the page) and Article markup on both guides. |
| Content | New page `/things-to-do-in-san-pedro-by-golf-cart`. Rental guide roughly doubled (costs, delivery/airstrip, driving tips, FAQ). Fleet page now has static size comparison, inclusions, and FAQ (it previously relied on the API alone). Contact page adds booking steps and service area. About page adds a facts block. |
| Snippets | Homepage description now shows starting rates and free delivery; guide title adds "Ambergris Caye". |
| Sitemap | Real `lastmod` dates from git history. |
| Fixes | Broken partner link (`mayaaislandair.com` → `mayaislandair.com`). Nav now links to both guides. |
| Build checks | Build fails if a page lacks substantial content, FAQ markup does not match visible text, a route is missing from .htaccess/llms.txt, robots blocks the site, or the icon font is not subset. |

**Design refresh (same update):** mobile-first redesign built for search and conversions. Every page answers the query above the fold (H1, prices, booking actions). Photos no longer carry the layout, so stock or missing images don't hurt it. Phones get a sticky Call / WhatsApp / Book bar. Guides have "On this page" jump links. Motion is restrained and never hides content from crawlers: a CSS-only intro shown once per session (skipped for bots and reduced-motion users, outside the React root, under 2 s; the build fails otherwise), CSS scroll reveals, and a drifting hero light. Brand graphics: custom golf cart, 6-seater, palm, wave, and cart-at-the-door icons (src/components/BrandIcons.jsx); a splash where a golf cart drives the loading road; a cart driving across the "How it works" steps; a destination marquee; a reading-progress bar on guides; and a wave into the footer. All motion is transform/opacity only (no layout shift) and stops for reduced-motion users. The misleading sports-car "fleet" image and the 512px stretched hero were removed. Replace the remaining stock images with real photos when possible.

**Agent readiness (Hostinger checklist):** robots.txt declares `Content-Signal: search=yes, ai-input=yes, ai-train=yes` (change `ai-train` to `no` if the owner prefers not to allow model training). Each public page has a generated Markdown twin (`<page>/index.md`), served for `Accept: text/markdown` and advertised via `<link rel="alternate">` and RFC 8288 `Link` headers alongside `llms.txt`. The `.md` files are `noindex` so search results stay on HTML. WebMCP tools are registered in supporting browsers: `get_rental_info` (read-only) and `start_booking_request`, which only opens a prefilled form. The visitor still presses send, so agents cannot submit bookings on their own. New `/rental-terms` and `/privacy` pages are linked from every footer. An MCP Server Card is intentionally not published: the site runs no MCP server, and a card must point to a real endpoint.

**Owner review before deploy:** `/things-to-do-in-san-pedro-by-golf-cart` describes Secret Beach, Boca del Rio, the north (bridge), the south, and reef-tour docks in general terms. Confirm each description is accurate and adjust anything that is out of date. The `$35` / `$65` starting rates now appear in the homepage meta description and fleet FAQ; confirm the currency (USD or BZD) and add it.

### Actions only the owner / account holder can do (highest impact first)

1. **Google Business Profile.** Create or claim and verify it (category "Golf cart rental service" or closest), with the same name, phone, website, hours, service area, and at least 10 original photos. Add its URL to `SOCIAL_PROFILES` in `src/seo/site.js`. This is the single biggest lever for "golf cart rental San Pedro" searches and for Google Maps/Gemini answers.
2. **Hostinger bot settings.** In hPanel, check the CDN / Security / "AI crawlers" (bot protection) settings and allow verified search engine bots and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot). Then confirm in Search Console that Googlebot is not getting 403s.
3. **Google Search Console.** Submit `/sitemap.xml` again. Use URL Inspection → "Test live URL" on all six pages, then "Request indexing". Check the Pages report for "Blocked due to access forbidden (403)" or "Crawled – currently not indexed".
4. **Bing Webmaster Tools.** Sign in and use "Import from Google Search Console" (no code needed). Submit the sitemap. After each deploy run `npm run indexnow`. Bing feeds ChatGPT search, Copilot, and DuckDuckGo.
5. **Bing Places for Business.** Import the Google Business Profile. Apple Business Connect (Apple Maps / Siri) is the same idea.
6. **Marketplace and directory listings that rank today.** Tripadvisor (business listing), Viator / GetYourGuide (they feed Marriott, Expedia, and Booking activity listings, which currently dominate results), the Belize Tourism Board directory, Facebook page, and local San Pedro directories. Use identical name, phone, and website everywhere, and link back to the site.
7. **Reviews.** Ask every customer for an honest Google review using the profile's review link, and reply to all reviews. Review count and recency drive map-pack ranking and AI recommendations.
8. **Local links and mentions.** Ask partner hotels, Airbnb hosts, and tour operators to link to the site from their "getting around" pages. Pitch the things-to-do guide to local travel blogs and the San Pedro Sun.
9. **Real photos.** The current hero and story images are 512×512 stock-style images stretched full-screen. Replace them with original photos of the carts, team, and deliveries (1600px wide or more, compressed).
10. **GA4.** Set `REACT_APP_GA_MEASUREMENT_ID` in the private production environment and rebuild, so search traffic and bookings can be measured.

Realistic timing: after the deploy and the account actions, expect the site to be indexed in days to weeks. The Business Profile can appear in Maps within days of verification. Competitive non-brand rankings usually build over two to four months as reviews and links accumulate. No ranking can be guaranteed.

## Objective and measurement limits

Increase qualified organic inquiries for golf cart rentals in San Pedro, Ambergris Caye, Belize. Track completed booking requests, WhatsApp clicks, and phone clicks alongside traffic. Rankings and traffic gains are outcomes to measure, not guarantees.

This audit inspected the frontend source and the www homepage returned by the web retrieval tool. That response was labeled as crawled four weeks earlier and exposed the JavaScript notice and splash content. Requests to the bare domain failed in the retrieval tool; direct HTTP/header checks from this workspace also failed. These failures do not establish that the live server is down. DNS, redirect chains, actual HTTP status codes, Google indexing, mobile field performance, backlinks, and traffic totals remain unverified. A site search returning no results is not a reliable indexation report. No Search Console, Analytics, hosting, or Business Profile account was connected.

## Findings and code changes

| Priority | Finding in the original code | Implemented remedy |
| --- | --- | --- |
| P0 | Initial HTML contained an empty React root and a splash. React waited at least two seconds and up to four seconds for fonts before rendering. | Public pages are rendered to static HTML during `npm run build`; JavaScript hydrates that content immediately. Removed splash and font gate. |
| P0 | Homepage title, description, canonical, and business schema were hardcoded into every page's base HTML, then combined with route metadata. | A shared route registry now generates one title, description, canonical, social preview, and structured data graph per public route. |
| P0 | Unknown routes redirected to the homepage; frontend-only routing could create soft 404s. | A visible noindex not-found page, generated `404.html`, and Apache/LiteSpeed configuration with actual 404 responses. Server behavior still needs deployment verification. |
| P0 | Homepage defaulted to 4.9/200 reviews and used sample data on API failure, including self-serving rating markup. More unsupported ratings and counts appeared in the stats banner. | Removed rating schema, fabricated counters, public sample reviews, and public sample carts. Real reviews remain API driven. Failed review submissions now display an error. |
| P1 | Main heading and About story targeted golfers and golf courses instead of island travelers. Some feature claims were unsupported. | Rewrote headings and core copy around San Pedro rentals, group seating, accommodation delivery, and booking requests. Removed invented founder history, founding year, and inspection/feature claims. |
| P1 | No dedicated contact page or trip-planning guide. | Added `/contact` and `/san-pedro-golf-cart-rental-guide`, connected by crawlable navigation and contextual links. |
| P1 | Sitemap dates were fixed and could misrepresent updates. | Sitemap generated from the public route registry; no invented lastmod values. Admin and errors excluded. |
| P1 | Admin had no dedicated initial noindex response. | Generated admin HTML with noindex, client metadata, and an Apache header. Crawling is allowed so bots can read noindex. Authentication remains necessary. |
| P1 | GA4 was not configured in the local production environment; SPA page views were not explicitly handled. | Added route page-view tracking and telephone clicks; retained WhatsApp and successful booking events. Actual GA4 property setup remains required. |

Rendering does not snapshot backend inventory or testimonials: the build publishes stable service content; current carts and real reviews load from the existing API. A later server-rendered inventory integration may help if individual cart pages become a meaningful search target.

## Keyword and page ownership

These are intent hypotheses, not measured search-volume or difficulty estimates. Confirm opportunities using Search Console and, if available, a keyword research account.

| Search intent | Primary page | Content focus |
| --- | --- | --- |
| golf cart rental San Pedro Belize; Ambergris Caye golf cart rental | `/` | Service, location, seating, delivery, clear booking request |
| 4 seater / 6 seater golf cart rental San Pedro | `/cars` | Actual fleet and availability; add owner-confirmed rates and conditions |
| Scorpion Golf Cart Rental | `/about` | Real business identity, original photos, verified history and team |
| how to rent a golf cart in San Pedro; rental pickup questions | `/san-pedro-golf-cart-rental-guide` | Practical booking preparation and links to fleet/contact |
| Scorpion phone, WhatsApp, delivery contact | `/contact` | Consistent contact details, hours, locality, delivery inquiry |

Avoid making many nearly identical location pages or separate pages for keyword spelling variants. Build additional content only when it answers a distinct customer question with accurate local information.

## Days 0–7: publish, verify, and establish a baseline

1. Deploy the complete validated `build/` output using [DEPLOYMENT.md](DEPLOYMENT.md). Confirm the host serves the generated files, not a universal homepage fallback.
2. Check HTTPS, www/apex redirects, direct deep links, missing URLs returning 404, admin noindex, robots, sitemap, canonical consistency, and API/booking behavior. Preserve a copy of the current hosting configuration for rollback.
3. In the existing verified Google Search Console property, submit `/sitemap.xml`. Inspect all six public URLs using the live test; confirm rendered headings and Google-selected canonical. Request indexing after deployment. The existing verification meta and verification file are preserved.
4. Connect GA4 by setting `REACT_APP_GA_MEASUREMENT_ID` in the private production environment and rebuilding. In the web stream's enhanced measurement settings, turn off history-based page-change detection because the application sends page views explicitly. Verify in DebugView/Realtime that each navigation yields one `page_view`.
5. Validate `booking_submit` only on successful API response. Mark it as a key event. Report WhatsApp and phone clicks separately as contact intent; a click is not a confirmed sale. Reconcile inquiries with actual bookings offline.
6. Export the previous 28 days and previous three months from Search Console: clicks, impressions, CTR, position, queries, landing pages, country, device, and branded/nonbranded splits. Record organic sessions and booking requests in GA4 once available. Record missing historical data as unknown rather than zero.
7. Test home, fleet, and contact in PageSpeed Insights on mobile. Record field data when available, otherwise label Lighthouse values as lab data. Target the 75th percentile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Removing the delay is a code improvement; it is not a measured Core Web Vitals result.

## Days 7–30: strengthen local trust and rental information

1. Verify and complete the real Google Business Profile. Use the genuine business name, the closest accurate category, the same phone and website, current hours, and an accurate service area. Publish a street address only if customers can visit and it meets Google's rules. Do not add keywords to the business name.
2. Confirm the exact business address and map pin. The code deliberately omits unverified coordinates and labels the map as a service area. Add the real street address and coordinates to the visible page and schema only after confirmation. The current locality-only schema does not establish eligibility for Google's LocalBusiness rich features.
3. Owner to confirm: the existing $35/$65 starting prices and currency; taxes; deposit; fuel; insurance/damage terms; driver eligibility; cancellation terms; free-delivery boundaries; payment methods; support hours; and transport-provider relationships. Existing rates and published policies were retained, not independently verified. Clarify USD/BZD and total cost before promoting rate-focused titles or Offer markup.
4. Replace generic stock/illustrative photos with original cart, team, delivery, and location images. Add accurate descriptions, compress appropriately, and give key images explicit dimensions. Request real travel and pickup questions from the booking team to improve the guide.
5. Ask every customer for an honest Google review after a completed rental using the actual Business Profile review link. Do not offer incentives or screen out dissatisfied customers. Reply to reviews and handle problems promptly. Website testimonials do not produce self-serving business review stars in Google.
6. Check business name, phone, website, and address consistency across actual Belize tourism listings, reputable local directories, social profiles, and existing hotel/resort partner listings. Fix duplicates and inaccuracies.

## Days 30–60: useful content and local referrals

1. Expand the guide using real questions from customers: pickup instructions, luggage capacity with original photos, rental-duration choices, and current route suitability. Add legal/driving guidance only after verifying it with an authoritative local source.
2. If the business genuinely serves an arrival point or destination, add a substantive section with verified meeting instructions and original imagery. Avoid claiming an airline/water-taxi partnership without confirmation.
3. Seek editorial referral links from actual accommodation partners and relevant local travel resources. Offer useful arrival instructions or a guest transport guide. Do not buy bulk links, automate directory spam, or publish copied city pages.
4. Review Search Console query-to-page mapping. Improve titles and introductions where impressions indicate a relevant audience but CTR is weak. Compare similar dates and avoid changing several variables every few days.
5. Review mobile conversion drop-offs: users reaching fleet, opening booking, submitting successfully, and clicking WhatsApp/phone. Measure form changes against completed requests.

## Days 60–90: refine based on evidence

1. Compare the latest 28 days with the previous 28 days, and year over year when possible; account for tourism seasonality.
2. Investigate pages excluded from indexing, duplicate canonicals, persistent crawl failures, and search queries landing on an unsuitable page.
3. Prioritize content that generates qualified inquiries. Add cart-detail pages only if inventory is stable and there are useful original specifications/photos, a reliable server data source, and actual search demand.
4. Review API reliability, loading behavior, image delivery, and mobile field performance. Consider stronger caching/image delivery or server rendering if measurements show the need.

## Weekly scorecard

| Metric | Source | Success criterion |
| --- | --- | --- |
| Public page delivery | HTTP checks / URL Inspection | All six public routes return 200 with readable content and matching canonical; missing URLs return 404 |
| Indexing | Search Console | Intended canonical URLs indexed; investigate exclusions rather than promising a fixed indexing deadline |
| Nonbrand organic discovery | Search Console | Relevant impressions and clicks trend upward from the recorded baseline |
| Search CTR | Search Console | Compare by query, position, device, and page; improve weak relevant snippets |
| Organic inquiries | GA4 + actual booking records | Growth in successful requests and qualified contacts, with clicks reported separately |
| Business Profile activity | Business Profile performance | Track calls, website visits, relevant search visibility, real reviews and responses |
| Page experience | PageSpeed / CrUX | Work toward good field thresholds; label lab-only data correctly |

Set numeric traffic and inquiry targets after collecting a reliable baseline. Budget, seasonality, competition, verified customer demand, and historical data are currently unknown.

## Primary references

- [Google: JavaScript SEO and pre-rendering](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: local ranking and Business Profile completeness](https://support.google.com/business/answer/7091)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: review snippet eligibility and self-serving reviews](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)

The visible FAQ remains useful customer content. No FAQ-rich-result or review-star promise is made, and no FAQ or AggregateRating markup is emitted.
