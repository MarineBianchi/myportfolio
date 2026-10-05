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
  // Hero has its own top/bottom bars - this header only takes over once
  // the hero has fully scrolled past, so the two never overlap.
  const [visible, setVisible] = useState(false);
  // Over the Works photos, difference blending turns the white text into
  // muddy grays/cyans - the header drops the blend and stays plain white
  // while that section is under it.
  const [overPhoto, setOverPhoto] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setVisible(heroBottom <= 2);
      const works = document.getElementById("works")?.getBoundingClientRect();
      const navH = navRef.current?.offsetHeight ?? 0;
      setOverPhoto(!!works && works.top <= navH / 2 && works.bottom >= navH / 2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Freezes Lenis's scroll while the full-screen mobile menu is open, same
  // as any native overlay would lock page scroll.
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    return () => {
      lenis?.start();
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    // The open menu stopped Lenis, and a stopped Lenis ignores scrollTo -
    // restart it now rather than waiting for the effect above, which only
    // runs after this scroll request would already have been dropped.
    (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
    scrollToSection(router, href);
  };

  return (
    <>
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
          // photographic, like the Works backdrop) - difference blend mode
          // against fixed white text self-inverts to stay legible on whatever
          // is behind it, instead of tracking each section's theme by hand.
          color: "#ffffff",
          mixBlendMode: overPhoto ? "normal" : "difference",
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
            setMenuOpen(false);
            // Same as go(): Lenis may still be stopped by the open menu.
            (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
            scrollToHome(router, pathname);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            textDecoration: "none",
            color: "inherit",
            minWidth: 0,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.95rem", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
            Marine Bianchi
          </span>
          <span
            aria-hidden="true"
            className="navbar-dot"
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "currentColor",
              opacity: 0.5,
              flexShrink: 0,
            }}
          />
          <span className="navbar-tagline" style={{ fontSize: "0.8rem", opacity: 0.65, whiteSpace: "nowrap" }}>
            Design &amp; développement web
          </span>
        </a>

        <nav className="navbar-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
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

        {/* Hidden above the mobile breakpoint (see globals.css) - the
            header is a single unwrapped row and genuinely has no room for
            logo + tagline + 4 links below ~768px. */}
        <button
          type="button"
          className="navbar-burger"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
            width: 28,
            height: 28,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <span
            style={{
              width: "100%",
              height: 1.5,
              background: "currentColor",
              transition: "transform 0.25s ease",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              width: "100%",
              height: 1.5,
              background: "currentColor",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          />
          <span
            style={{
              width: "100%",
              height: 1.5,
              background: "currentColor",
              transition: "transform 0.25s ease",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </header>

      {/* Mobile menu overlay - solid background instead of the header's
          difference-blend trick, so the links stay legible regardless of
          what's scrolled underneath. */}
      <div
        className="navbar-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "0 2.5rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => go(link.href)}
            style={{
              fontSize: "2rem",
              fontWeight: 500,
              color: "#f8f7f4",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
