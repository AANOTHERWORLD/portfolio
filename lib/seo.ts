import type { Metadata } from "next";
import { withBasePath } from "./basePath";

export const SITE_ORIGIN = "https://jamelwilliams.com";
export function pageMetadata(title: string, description: string, pathname: string, image = "/social-preview.png"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: withBasePath(pathname) },
    openGraph: {
      title: `${title} | Jamel Williams`, description,
      url: withBasePath(pathname), type: "website", siteName: "Jamel Williams",
      images: [{ url: withBasePath(image), alt: `${title} | Jamel Williams` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Jamel Williams`, description, images: [withBasePath(image)] },
  };
}
