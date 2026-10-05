// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LenisLike = { scrollTo: (target: Element | number, opts?: any) => void; resize?: () => void };

function getLenis(): LenisLike | undefined {
  return (window as unknown as { lenis?: LenisLike }).lenis;
}

function scrollToElement(el: Element, offset = 0) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

// Scrolls to a section by id, navigating home first if it isn't on the
// current page (Lenis owns the scroll position, so a plain `<a href="#id">`
// doesn't reliably land on the target - this always goes through it).
// `offset` (px, usually negative) leaves room above the target, e.g. for
// the fixed navbar.
export function scrollToSection(
  router: { push: (href: string) => void },
  href: string,
  offset = 0
) {
  const id = href.includes("#") ? href.slice(href.indexOf("#") + 1) : href;

  const existing = document.getElementById(id);
  if (existing) {
    scrollToElement(existing, offset);
    return;
  }

  router.push(`/#${id}`);
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      // The freshly mounted page is still growing (pin spacers land a
      // frame or two late, images load): Lenis would clamp to its stale,
      // shorter scroll limit and stop short. Let it settle, re-measure,
      // then go - and once more after load for anything that came in late.
      setTimeout(() => {
        getLenis()?.resize?.();
        scrollToElement(el, offset);
      }, 150);
      const settle = () => {
        getLenis()?.resize?.();
        scrollToElement(el, offset);
      };
      if (document.readyState === "complete") setTimeout(settle, 900);
      else window.addEventListener("load", settle, { once: true });
      return;
    }
    if (performance.now() - start > 2000) return;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Always goes to the real homepage top - scrolling to y:0 locally would
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
