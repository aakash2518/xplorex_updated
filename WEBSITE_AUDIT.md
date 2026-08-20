# Website Audit: Xplorex

## 1. Folder Structure
The Next.js 15 App Router structure is organized as follows:
- `src/app/`: Core routing and pages (e.g., `admin`, `api`, `blog`, `contact`, `destinations`, `why-us`, etc.).
- `src/components/`: Reusable UI components including layouts, complex interactive sections, and a `ui/` directory for Shadcn Radix primitives.
- `src/constants/`: Global constants like theme configs and contact details.
- `src/data/`: Hardcoded fallback and mock data (`destinations.ts`, `blogs.ts`).
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Core utilities (e.g., `store.ts` for localStorage persistence).
- `src/services/`: API integration services (e.g., `api.ts` for CRM webhooks).
- `src/utils/`: General helper functions.

## 2. Existing Pages
- **Homepage** (`/`)
- **Contact** (`/contact`)
- **Destinations Hub** (`/destinations`)
- **Dynamic Destination Details** (`/destinations/[slug]`)
- **Blog Hub** (`/blog`)
- **Dynamic Blog Post** (`/blog/[slug]`)
- **Package Categories**: `/group-tours`, `/honeymoon-packages`, `/india-trips`, `/international`, `/international-trips`, `/national`
- **Why Us** (`/why-us`)
- **Admin** (`/admin/*`)

## 3. Existing Components
- **Core**: `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `FloatingButtons.tsx`, `WhatsAppButton.tsx`, `IntroScreen.tsx`.
- **Sections**: `RegionShowcase.tsx`, `Trips.tsx`, `WhyUs.tsx`, `HappyCustomers.tsx`, `BlogPreview.tsx`, `JourneyInFrames.tsx`, `Testimonials.tsx`.
- **Lead Capture**: `Quote.tsx`, `LeadPopup.tsx`, `ContactForm.tsx`, `QuotationForm.tsx`.
- **UI Primitives**: `Skeleton.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, `select.tsx`, `tabs.tsx`, etc.
- **Destinations**: `BentoTripCard.tsx`, `PackageCard.tsx`, `FiltersSidebar.tsx`, `QuickInfoBar.tsx`.

## 4. Existing Layouts
- **Root Layout** (`src/app/layout.tsx`): Configures global fonts (Plus Jakarta Sans, Space Grotesk, Caveat), SEO metadata, Google schema structured data, `NextTopLoader`, `Providers`, and `ClientDynamics`.
- **Admin Layout** (`src/app/admin/layout.tsx`): Layout for the admin section.

## 5. Existing Animations
- **Framer Motion** powers smooth scrolling, page transitions, floating elements, and micro-interactions.
- **Embla Carousel** handles horizontal swiping in Testimonials and Package sections.
- **Tailwind CSS Animate** is used for utility-based animations.

## 6. Existing Forms
- Powered by `react-hook-form` and validated using `zod`.
- **Forms**: Quick quote request modals, lead capture popups, and the main contact page form.

## 7. Existing APIs
- **CRM Webhook (`src/services/api.ts`)**: `sendLeadToCRM` and `sendBookingRequestToCRM` push payload data directly to a CRM via a POST request to `NEXT_PUBLIC_CRM_API_URL`.
- **WhatsApp API**: Client-side formatting of user inputs into a pre-filled WhatsApp message URL and redirecting the user.
- **Next.js API Routes**: Under `src/app/api/crm/`.

## 8. Existing Static Data
- Data is mocked via `localStorage` (managed in `src/lib/store.ts`).
- Fallback data exists in `src/data/destinations.ts` and `src/data/blogs.ts`.

## 9. Hardcoded Data
- **Destinations (`destinations.ts`)**: 18+ hardcoded destinations with nested package arrays, tags, pricing, and descriptions.
- **Blogs (`blogs.ts`)**: Hardcoded blog entries with titles, slugs, descriptions, and HTML content.
- **Homepage Content**: Static text like "A Journey Through Time, Colour And Culture".

## 10. SEO Status
- **Pros**: Next.js App Router Metadata API is used effectively in `layout.tsx`. Semantic HTML tags and schema structured data (TravelAgency) are present.
- **Cons**: Missing dynamic `sitemap.xml` and `robots.txt` generation for dynamic routes like `/destinations/[slug]` and `/blog/[slug]`.

## 11. Performance Issues
- **Pros**: `next/image` is used with aggressive caching, and heavy packages like `framer-motion` and `lucide-react` are tree-shaken in `next.config.mjs`.
- **Potential Bottlenecks**: Heavy use of Framer Motion might cause scroll jank on low-end devices. 

## 12. Responsive Issues
- Overall responsive design relies on Tailwind breakpoints. However, complex animated components and horizontal carousels (Embla) require rigorous testing on smaller viewports to ensure they don't break layout.

## 13. Security Issues
- **Vulnerability**: Exposing `NEXT_PUBLIC_CRM_API_URL` to the client-side allows anyone to spam the CRM webhook. 
- **Missing**: No server-side rate limiting or bot protection (e.g., Turnstile/reCAPTCHA) on forms.
- **Admin**: LocalStorage-based pseudo-CMS has no real authentication.

## 14. Duplicate Code
- Multiple package listing pages (`/group-tours`, `/honeymoon-packages`, `/india-trips`, etc.) likely share almost identical layouts.

## 15. Unused Files
- Root utility scripts: `download-videos.cjs`, `replace-lucide.mjs`.

## 16. Recommendations
- **Backend Migration**: Move CRM integration logic (`sendLeadToCRM`) to secure Next.js Server Actions or Route Handlers to hide the API URL.
- **Dynamic Content Integration**: Replace the `localStorage` and hardcoded `src/data` models with dynamic fetch calls connecting to `xplorex_crm` APIs.
- **Component Abstraction**: Consolidate repetitive package category pages into a single dynamic `PackageListing` template.
- **Dynamic SEO**: Generate sitemaps for the upcoming dynamic CRM content.
