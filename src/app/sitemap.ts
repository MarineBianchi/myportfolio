import type { MetadataRoute } from "next";
import { allProjects } from "@/data/projects";

export const dynamic = "force-static";

const SITE_URL = "https://marinebianchi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = allProjects
    .filter((project) => !project.comingSoon)
    .map((project) => ({
      url: `${SITE_URL}/projets/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
