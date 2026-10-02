import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects, getProjectBySlug } from "@/data/projects";
import ProjectDetailView from "@/components/project/ProjectDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.category}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projets/${project.slug}`,
      title,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: "Marine Bianchi" },
    about: project.category,
    datePublished: project.year,
    url: `https://marinebianchi.com/projets/${project.slug}`,
    ...(project.image && { image: `https://marinebianchi.com${project.image}` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailView project={project} />
    </>
  );
}
