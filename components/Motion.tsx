"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { debug } from "@/lib/debug";

// Page-wide motion ported from the reference prototype, rescanned on every route change:
//
//   [data-reveal]  Slide-in on scroll: opacity 0 and 100px below until the element crosses a
//                  line 10% above the viewport bottom, then 600ms ease-out (CSS, class is-in).
//   [data-sweep]   Line sweep on hover: the element's line sits at -102%, slides to 0 on enter
//                  (300ms), continues out to 101% on leave (300ms), then resets without a
//                  transition. Used by text links, footer links, nav links and list rows.
//
// Reduced motion: reveals show at once; sweeps remain a hover affordance.

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Reveals
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0 },
      );
      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        // Anything already above the fold on arrival shows without waiting for a scroll.
        if (r.top < window.innerHeight * 0.9) el.classList.add("is-in");
        else io.observe(el);
      });
      cleanups.push(() => io.disconnect());
    }

    // Line sweeps
    const sweeps = Array.from(document.querySelectorAll<HTMLElement>("[data-sweep]"));
    sweeps.forEach((el) => {
      let timer = 0;
      const enter = () => {
        window.clearTimeout(timer);
        el.classList.remove("is-leave");
        el.classList.add("is-hover");
      };
      const leave = () => {
        if (!el.classList.contains("is-hover")) return;
        el.classList.remove("is-hover");
        el.classList.add("is-leave");
        timer = window.setTimeout(() => el.classList.remove("is-leave"), 320);
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("focus", enter);
      el.addEventListener("blur", leave);
      cleanups.push(() => {
        window.clearTimeout(timer);
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("focus", enter);
        el.removeEventListener("blur", leave);
      });
    });

    debug.log("motion", "scanned", { reveals: reveals.length, sweeps: sweeps.length, reduced });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
