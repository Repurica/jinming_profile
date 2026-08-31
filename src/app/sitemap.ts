import type { MetadataRoute } from "next";
import { projects } from "@/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/profile", "/timeline", "/contact", "/resume"];

  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: "monthly" as const })),
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
    })),
  ];
}
