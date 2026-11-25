# Deploying the SEO build

These changes are local until uploaded to the existing server. This repository contains the frontend; no hosting credentials or server session were supplied. No live deployment or account changes were performed.

## Build and verify

Use a supported Node version that satisfies the installed dependencies (this workspace uses Node 24). Keep the current private production API configuration. Set the real GA4 measurement ID if available; do not invent an ID or put private backend credentials into React environment variables.

```powershell
npm ci
npm run build
npm run check:seo
npm run check:smoke
```

The build compiles React, renders public pages from the same components used in the browser, generates a sitemap, and checks metadata, headings, local links, images, structured data, and excluded pages. It makes no backend requests at build time. Inventory and reviews continue to load from the API after hydration.

Implementation validation on November 25, 2026: production compilation and all SEO checks passed for six public pages. The production bundle also passed eleven DOM-based smoke scenarios: all six public pages, home/fleet API failures, the missing-page screen, admin login, and a protected admin route. APIs are mocked; these checks do not establish live server behavior, actual booking delivery, visual layout, or measured browser performance.

Deploy **the complete contents of `build/`**, including hidden `.htaccess`, public route directories, `404.html`, `admin/index.html`, assets, sitemap, robots, and both existing Google verification methods. Do not upload just the homepage and static JS. Rebuild whenever service content, metadata, public routes, or environment configuration changes. `public/index.html` is an input template, not a deployment artifact.

## Apache or LiteSpeed / Hostinger

`public/.htaccess` is copied to the build. It assumes a site served at the domain root on Apache 2.4-compatible rewriting, with `mod_rewrite`, `.htaccess` overrides allowed, and an optional headers module. Hostinger commonly uses LiteSpeed, but the actual hosting stack has not been verified. Merge its rules with any existing server configuration before replacing the live file. Preserve unrelated backend/API/security rules. Verify how a reverse proxy reports HTTPS; the supplied HTTPS redirect expects `%{HTTPS}` to reflect the visitor connection.

The rules keep the existing **https://www.scorpiongolfcarts.com** canonical host, redirect HTTP/apex, serve generated public HTML, route admin requests to the noindex admin shell, and return 404 for missing URLs. Verify that both domain variants have working DNS and valid TLS before enabling redirects. Public URL paths are extensionless without a trailing slash, except the root.

Hashed JS/CSS get long-lived caching; HTML, sitemap, and robots must refresh on deploy. Retain the previous hashed JS/CSS files for a release window so visitors with an older open page can still load their assets.

## Other hosts

Do not use a universal `try_files ... /index.html` fallback: it would serve homepage HTML for other public routes and unknown URLs. Configure your host to:

1. Redirect HTTP/apex to the canonical HTTPS www host, preserving path and query.
2. Serve `/cars`, `/about`, `/contact`, `/san-pedro-golf-cart-rental-guide`, and `/things-to-do-in-san-pedro-by-golf-cart` from the matching generated `index.html` with a 200 status.
3. Redirect public slash variants to the extensionless canonical path.
4. Serve `/admin` and its child paths from `admin/index.html`, and apply `X-Robots-Tag: noindex, follow` to them.
5. Serve real assets normally; respond to all other nonexistent paths with status 404 and the generated `404.html` body.

## After every deploy

Run `npm run indexnow` once the new build is live. It checks that the IndexNow key file is reachable on the live site, then submits every sitemap URL to Bing and the other IndexNow engines. Also confirm that `/llms.txt` and `/robots.txt` load on the live site.

## Post-deployment acceptance checks

- Open each of the six sitemap URLs directly and refresh it. View source: confirm one correct title, one self-referencing canonical, one description, visible page heading and service copy before JavaScript runs.
- Repeat with JavaScript disabled: page information, phone, WhatsApp, and navigation must remain usable. Fleet filters and the booking form require JavaScript; this is stated in the fallback contact message.
- Check that HTTP and apex redirect to HTTPS www, and that slash/index-document variants converge without loops. Unknown paths and nonexistent assets must return real 404 responses.
- Open `/admin/login` and a protected route. Verify the noindex HTML/header and existing authentication behavior. Robots directives are not authentication.
- Verify `/robots.txt`, `/sitemap.xml`, `/google99245ebc1ace1399.html`, logo, social image, CSS, JS, and fonts return their correct content types. Clear stale HTML/CDN caches.
- Test actual fleet/reviews API responses, mobile booking fields, a successful and failed booking request, confirmation delivery, WhatsApp links, and phone links. Confirm API CORS allows the production origin. Automated checks use mocked APIs and cannot validate real bookings.
- In GA4, disable automatic history-based page views when enabling the application's explicit page-view events. Check Realtime/DebugView and existing booking/contact events; mark only appropriate events as key events.
- Use Search Console URL Inspection and Google's Rich Results Test. Submit the sitemap after deployment. Business schema intentionally has no invented street address, coordinates, ratings, or price offers; confirm the real address before expecting LocalBusiness rich eligibility.
- Run mobile PageSpeed Insights and record actual results. No live Lighthouse/CrUX score was measured during implementation.

Back up the old frontend and hosting configuration before upload. If acceptance checks fail, restore that known release and investigate before retrying. Do not expose admin data or change the backend to resolve a frontend SEO deployment issue.
