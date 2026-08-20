# Missing CRM APIs

The frontend CRM integration has been paused because the external CRM server is unreachable and the following required Public APIs are missing or unresponsive at the base URL (`http://localhost:3000`):

## 1. Homepage & Global Data
- `GET /api/public/homepage`
- `GET /api/public/settings`
- `GET /api/public/testimonials`
- `GET /api/public/gallery`
- `GET /api/public/faqs`

## 2. Destinations & Packages
- `GET /api/public/destinations`
- `GET /api/public/destinations/:slug`
- `GET /api/public/packages`
- `GET /api/public/packages/:slug`

## 3. Blogs
- `GET /api/public/blogs`
- `GET /api/public/blogs/:slug`

## 4. Lead Capture
- `POST /api/public/leads`

> **Note:** As per strict requirements, no fake data or hardcoded fallbacks will be created to bypass this. The integration of dynamic components (Modules 2, 3, 4, 5) will remain blocked until the `xplorex_crm` APIs are successfully deployed and accessible from the frontend environment.
