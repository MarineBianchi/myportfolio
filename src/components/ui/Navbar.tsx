"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { scrollToSection, scrollToHome } from "@/lib/scrollToSection";

const navLinks = [
  { label: "Portfolio", href: "#grid-projects" },
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  // Hero has its own top/bottom bars — this header only takes over once
  // the hero has fully scrolled past, so the two never overlap.
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setVisible(heroBottom <= 2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.85rem clamp(2.5rem, 5vw, 5rem)",
        background: "transparent",
        // Transparent header sitting over sections of any color (flat or
        // photographic, like the Works backdrop) — difference blend mode
        // against fixed white text self-inverts to stay legible on whatever
        // is behind it, instead of tracking each section's theme by hand.
        color: "#ffffff",
        mixBlendMode: "difference",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          scrollToHome(router, pathname);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.85rem",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
          Marine Bianchi
        </span>
        <span
          aria-hidden="true"
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "currentColor",
            opacity: 0.5,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "0.8rem", opacity: 0.65 }}>
          Design &amp; développement web
        </span>
      </a>

      <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollToSection(router, link.href)}
            className="relative group"
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "inherit",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>
    </header>
  );
}
