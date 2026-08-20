const CRM_BASE_URL = process.env.NEXT_PUBLIC_CRM_API_URL;

if (!CRM_BASE_URL) {
  console.error("FATAL ERROR: NEXT_PUBLIC_CRM_API_URL is not defined in environment variables.");
}

export async function fetchFromCRM<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${CRM_BASE_URL}${endpoint}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`CRM API Error [${res.status}] for ${url}:`, errorText);
      throw new Error(`CRM API Error: ${res.status}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`Failed to fetch from CRM (${url}):`, error);
    throw error;
  }
}

// -------------------------------------------------------------
// Global Settings
// -------------------------------------------------------------
export interface SiteSettings {
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await fetchFromCRM<SiteSettings>("/api/public/settings", {
      next: { revalidate: 3600 },
    });
  } catch {
    return null; // Graceful degradation if API is down
  }
}

// -------------------------------------------------------------
// Homepage
// -------------------------------------------------------------
export interface HomepageData {
  hero: {
    headline: string;
    subheadline: string;
    backgroundMedia: string;
  };
  featuredRegions: {
    name: string;
    subtitle: string;
    bgMedia: string;
    exploreLink: string;
    destinations: unknown[];
  }[];
}

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    return await fetchFromCRM<HomepageData>("/api/public/homepage", {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// Destinations & Packages
// -------------------------------------------------------------
export async function getPackages(params?: { category?: string; region?: string; destinationSlug?: string }) {
  const query = new URLSearchParams();
  if (params?.category) query.append("category", params.category);
  if (params?.region) query.append("region", params.region);
  if (params?.destinationSlug) query.append("destinationSlug", params.destinationSlug);

  try {
    return await fetchFromCRM<unknown[]>(`/api/public/packages?${query.toString()}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return [];
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    return await fetchFromCRM<unknown>(`/api/public/destinations/${slug}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}

export async function getPackageBySlug(slug: string) {
  try {
    return await fetchFromCRM<unknown>(`/api/public/packages/${slug}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// Blogs
// -------------------------------------------------------------
export async function getBlogs() {
  try {
    return await fetchFromCRM<unknown[]>("/api/public/blogs", {
      next: { revalidate: 3600 },
    });
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    return await fetchFromCRM<unknown>(`/api/public/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}
