import type { MetadataRoute } from "next";
import { allProjects } from "@/data/projects";

export const dynamic = "force-static";

const SITE_URL = "https://marinebianchi.com";
// Pages kept on the site but left out of the sitemap.
const SITEMAP_EXCLUDED = new Set(["urban-keratin"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = allProjects
    .filter((project) => !project.comingSoon && !SITEMAP_EXCLUDED.has(project.slug))
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
