# Scorpion Golf Cart Rental frontend

React frontend for https://www.scorpiongolfcarts.com/.

- Start locally: npm start
- Build production HTML and assets: npm run build
- Recheck generated SEO output: npm run check:seo
- Check production hydration and booking/navigation interactions with mocked APIs: npm run check:smoke

The production build renders all public routes to HTML, then attaches React interactions in the browser. Public page metadata and sitemap routes are defined in src/seo/site.js. Live fleet and review data still load from the backend API.

See [the SEO audit and 90-day plan](docs/SEO_PLAN.md) and [deployment instructions](docs/DEPLOYMENT.md). Upload the entire build directory, including its hidden .htaccess file and generated route directories. Configure equivalent routing if the host is not Apache/LiteSpeed.

Environment variable names are documented in .env.example. Keep production API settings and analytics IDs in the private deployment configuration; React environment variables are visible to visitors. GA4 is optional until a real measurement ID is configured.
