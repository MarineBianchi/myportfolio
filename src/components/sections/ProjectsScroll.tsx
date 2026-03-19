"use client";

const projects = [
  { id: "01", title: "Brand Identity", category: "Graphic Design", year: "2024" },
  { id: "02", title: "E-Commerce Platform", category: "Full Stack Dev", year: "2024" },
  { id: "03", title: "Interactive Campaign", category: "Creative Dev", year: "2023" },
  { id: "04", title: "Design System", category: "UI/UX Design", year: "2023" },
];

// Triple for seamless CSS loop (animate -33.333% = one copy width)
const items = [...projects, ...projects, ...projects];

export default function ProjectsScroll() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ background: "var(--foreground)" }}
    >
      <div className="projects-marquee flex" style={{ width: "max-content" }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-5 px-10 py-5 shrink-0 cursor-pointer group"
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span
              className="text-xs font-mono"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {p.id}
            </span>
            <div>
              <p
                className="text-sm font-semibold group-hover:opacity-60 transition-opacity duration-200"
                style={{ color: "rgba(255,255,255,0.88)" }}
              >
                {p.title}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {p.category} · {p.year}
              </p>
            </div>
            <span
              className="text-sm opacity-20 group-hover:opacity-50 group-hover:translate-x-1 transition-all duration-200"
              style={{ color: "white" }}
            >
              →
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .projects-marquee {
          animation: scroll-marquee 28s linear infinite;
        }
        .projects-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
