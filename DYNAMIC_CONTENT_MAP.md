# Dynamic Content Map

The following sections currently contain hardcoded or mock data within the application. These will be transformed to dynamically fetch their content from the CRM API.

## 1. Global Components
- **Navbar**: Navigation links, promotional banners, and contact numbers.
- **Footer**: Social media links, company address, quick links, and contact details.
- **Floating WhatsApp Button**: Target phone number and default message parameters.
- **Contact Information**: Addresses, emails, and phone numbers shown on `/contact`.

## 2. Homepage Sections
- **Homepage Hero**: Background videos/images, headline text, and subheadlines.
- **Region Showcases (India & International)**: Section titles ("A Journey Through Time..."), background media, and the specific destinations curated for display.
- **Featured Packages (Trips Component)**: Hand-picked trips displayed on the homepage.
- **Why Us**: Selling points, icons, and text descriptions.
- **Testimonials / Happy Customers**: User reviews, star ratings, reviewer names, and embedded review media (videos/images).
- **Journey In Frames (Gallery)**: Images and captions used in the photo gallery section.

## 3. Destination & Package Listing (Cards)
- **Destination Cards**: Destination image, tagline, starting price, region label, and package count.
- **Package Cards**: Package title, duration, price, category (Luxury, Budget, Group, Honeymoon), and cover image.
- **Filters/Sidebar Options**: Available tags, durations, and price ranges used to filter lists.

## 4. Destination Details Page (`/destinations/[slug]`)
- **Hero Image & Title**: Destination banner.
- **Introduction Text**: Multi-paragraph SEO descriptions.
- **Quick Info Bar**: Best time to visit, currency, visa status (e.g., "Visa on Arrival", "Schengen Visa").
- **Itinerary / Highlights**: Day-by-day plans or list of key highlights (currently stored in `highlights` or `intro`).
- **Available Packages List**: The specific trips attached to that destination.
- **Other Destinations**: Suggested alternative destinations for cross-selling.

## 5. Blog Sections
- **Blog Cards (Preview)**: Blog title, excerpt/description, cover image, read time, date, and category.
- **Blog Details**: The full HTML content of the blog, author details, and SEO metadata.

## 6. Support & Utility Sections
- **FAQ**: Frequently asked questions on package pages or support pages (if added).
- **Terms & Conditions / Privacy Policy**: Legal text (if applicable).
