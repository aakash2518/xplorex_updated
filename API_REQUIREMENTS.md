# API Requirements

The following REST API endpoints must be exposed by `xplorex_crm` to power the headless frontend. All endpoints should return JSON data and support standard HTTP status codes.

## 1. Destinations & Packages
- **`GET /api/public/destinations`**
  - **Query Params**: `region`, `featured`, `limit`
  - **Description**: Returns a list of destinations for grid displays.
- **`GET /api/public/destinations/:slug`**
  - **Description**: Returns detailed information for a single destination (intro, highlights, tags, visa info).
- **`GET /api/public/packages`**
  - **Query Params**: `destinationSlug`, `category`, `type`, `limit`
  - **Description**: Returns a list of travel packages filtered by category (e.g., Honeymoon, Group) or destination.
- **`GET /api/public/packages/:slug`**
  - **Description**: Returns detailed itinerary, pricing, and inclusions for a specific package.

## 2. Blogs
- **`GET /api/public/blogs`**
  - **Query Params**: `category`, `limit`
  - **Description**: Returns a list of blog posts for the blog hub and previews.
- **`GET /api/public/blogs/:slug`**
  - **Description**: Returns the full HTML content and metadata of a specific blog post.

## 3. Page Specific Data
- **`GET /api/public/homepage`**
  - **Description**: Returns curated data specifically structured for the homepage (hero content, featured destinations, active promotions).
- **`GET /api/public/testimonials`**
  - **Query Params**: `limit`, `featured`
  - **Description**: Returns customer reviews, ratings, and associated media for the Happy Customers section.
- **`GET /api/public/gallery`**
  - **Description**: Returns images and media for the "Journey in Frames" section.

## 4. Global Settings & Support
- **`GET /api/public/settings`**
  - **Description**: Returns global configurations like contact numbers, email addresses, social links, and current promotional banners used in Navbars and Footers.
- **`GET /api/public/faqs`**
  - **Description**: Returns a list of Frequently Asked Questions.

## 5. Lead Generation (Mutations)
- **`POST /api/public/leads`**
  - **Payload**: `name`, `phone`, `email`, `destination`, `month`, `travelers`, `notes`, `budget`
  - **Description**: Accepts general inquiries and quick quotes.
- **`POST /api/public/bookings`**
  - **Payload**: Detailed booking parameters.
  - **Description**: Distinct endpoint for high-intent booking requests, allowing the CRM to categorize them separately from general leads.
