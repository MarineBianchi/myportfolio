// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LenisLike = { scrollTo: (target: Element | number, opts?: any) => void };

function getLenis(): LenisLike | undefined {
  return (window as unknown as { lenis?: LenisLike }).lenis;
}

function scrollToElement(el: Element) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

// Scrolls to a section by id, navigating home first if it isn't on the
// current page (Lenis owns the scroll position, so a plain `<a href="#id">`
// doesn't reliably land on the target — this always goes through it).
export function scrollToSection(
  router: { push: (href: string) => void },
  href: string
) {
  const id = href.includes("#") ? href.slice(href.indexOf("#") + 1) : href;

  const existing = document.getElementById(id);
  if (existing) {
    scrollToElement(existing);
    return;
  }

  router.push(`/#${id}`);
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      scrollToElement(el);
      return;
    }
    if (performance.now() - start > 2000) return;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Always goes to the real homepage top — scrolling to y:0 locally would
// strand the user mid-page on any other route.
export function scrollToHome(
  router: { push: (href: string) => void },
  pathname: string
) {
  if (pathname === "/") {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    router.push("/");
  }
}
