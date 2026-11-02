import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/seo";
import { withBasePath } from "@/lib/basePath";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work/", "/approach/", "/about/", "/contact/", "/privacy/", "/terms/", ...getProjects().map(({ project }) => `/work/${project.slug}/`)]
    .map((pathname) => ({ url: new URL(withBasePath(pathname), SITE_ORIGIN).href }));
}
