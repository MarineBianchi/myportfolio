"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Portfolio", href: "#projects" },
  { label: "Services", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { y: -72, opacity: 0 });

    let prevScrollY = 0;
    let visible = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroH = window.innerHeight;

      if (scrollY > heroH * 0.85) {
        if (scrollY < prevScrollY && !visible) {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
          visible = true;
        } else if (scrollY > prevScrollY && visible) {
          gsap.to(nav, { y: -72, opacity: 0, duration: 0.3, ease: "power2.in" });
          visible = false;
        }
      } else if (visible) {
        gsap.to(nav, { y: -72, opacity: 0, duration: 0.3 });
        visible = false;
      }

      prevScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as unknown as { lenis?: any }).lenis;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-4 backdrop-blur-md"
      style={{
        background: "rgba(248,247,244,0.92)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <a
        href="#"
        className="font-bold tracking-tight text-sm"
        style={{ color: "var(--foreground)" }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Marine.
      </a>

      <nav className="flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-sm font-medium relative group"
            style={{ color: "var(--foreground)" }}
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>
    </header>
  );
}
