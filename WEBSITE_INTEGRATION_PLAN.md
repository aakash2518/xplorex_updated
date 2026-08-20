# Website Integration Plan

This document outlines the transition strategy for moving each page from hardcoded static data to dynamic data provided by `xplorex_crm`.

## 1. Homepage (`/`)
- **Current Data Source**: Hardcoded arrays (`indiaDestinations`, `intlDestinations` in `src/app/page.tsx`), static components (`Hero.tsx`, `WhyUs.tsx`, `HappyCustomers.tsx`, `Testimonials.tsx`).
- **Future CRM API**: `GET /api/public/homepage` (or combined endpoints like `GET /api/public/destinations?featured=true`).
- **Required Changes**: Replace static imports with Server Component `fetch()` calls. Hydrate `RegionShowcase`, `Testimonials`, and `BlogPreview` dynamically.
- **Required Database Entity**: `Destination`, `Testimonial`, `Blog`, `SiteSettings`.
- **Priority**: High

## 2. Destination Hub / Categories (`/destinations`, `/india-trips`, `/international-trips`, `/honeymoon-packages`, `/group-tours`, `/national`, `/international`)
- **Current Data Source**: Filter functions in `src/data/destinations.ts` (e.g., `getGroupTours()`, `getIndiaDestinations()`).
- **Future CRM API**: `GET /api/public/packages?category={category}&region={region}`.
- **Required Changes**: Fetch data based on the route. Map the API response to the `PackageCard` or `BentoTripCard` components.
- **Required Database Entity**: `Package` / `Trip`, `Destination`.
- **Priority**: High

## 3. Destination Details (`/destinations/[slug]`)
- **Current Data Source**: `getDestination(slug)` from `src/data/destinations.ts`.
- **Future CRM API**: `GET /api/public/destinations/:slug` and `GET /api/public/packages?destinationSlug=:slug`.
- **Required Changes**: Update the Server Component to dynamically fetch the destination and its associated packages using the slug param. Update SEO metadata generation (`generateMetadata`).
- **Required Database Entity**: `Destination`, `Package`.
- **Priority**: High

## 4. Blog Hub (`/blog`)
- **Current Data Source**: `blogs` array exported from `src/data/blogs.ts`.
- **Future CRM API**: `GET /api/public/blogs`.
- **Required Changes**: Fetch the list of blogs and map them to blog card components.
- **Required Database Entity**: `Blog`.
- **Priority**: Medium

## 5. Blog Details (`/blog/[slug]`)
- **Current Data Source**: Static find method on the `blogs` array.
- **Future CRM API**: `GET /api/public/blogs/:slug`.
- **Required Changes**: Fetch the specific blog post by slug. Inject dynamic HTML content safely.
- **Required Database Entity**: `Blog`.
- **Priority**: Medium

## 6. Contact & Forms (`/contact`, Global Quotes/Leads)
- **Current Data Source**: Forms submit locally, format WhatsApp URLs, or POST directly to an exposed CRM webhook (`NEXT_PUBLIC_CRM_API_URL`).
- **Future CRM API**: `POST /api/public/leads` (via secure internal Next.js Route Handler pointing to CRM).
- **Required Changes**: Refactor form submission logic to point to an internal API route (e.g., `/api/leads`), which will securely forward the request to the `xplorex_crm` backend, shielding the direct CRM URL.
- **Required Database Entity**: `Lead`, `Enquiry`.
- **Priority**: Critical

## 7. Global Settings (Navbar, Footer, Why Us)
- **Current Data Source**: `src/constants/theme.ts` or hardcoded JSX.
- **Future CRM API**: `GET /api/public/settings`, `GET /api/public/faqs`.
- **Required Changes**: Fetch global settings at the root layout layout level (or generate static layout at build time if cached).
- **Required Database Entity**: `SiteSettings`, `FAQ`.
- **Priority**: Low
