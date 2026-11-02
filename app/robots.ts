import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/seo";
import { withBasePath } from "@/lib/basePath";
import { isDraftMode } from "@/lib/content";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", ...(isDraftMode() ? { disallow: "/" } : { allow: "/" }) }, sitemap: new URL(withBasePath("/sitemap.xml"), SITE_ORIGIN).href };
}
