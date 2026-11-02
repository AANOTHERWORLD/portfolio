"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const ID = "G-Q5GJ7YP773";
const KEY = "jw-analytics-consent-v1";
type Choice = "accepted" | "rejected";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-Q5GJ7YP773"?: boolean;
  }
}
function readChoice(): Choice | null {
  try { const value = localStorage.getItem(KEY); return value === "accepted" || value === "rejected" ? value : null; }
  catch { return null; }
}
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  // GA cookies use the root path. Expire both host-only and domain cookies.
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax; Secure`;
  }
}

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const settingsButton = useRef<HTMLElement | null>(null);
  const firstButton = useRef<HTMLButtonElement | null>(null);
  const settingsOpen = useRef(false);

  useEffect(() => {
    const saved = readChoice();
    setChoice(saved); setOpen(!saved);
    if (saved !== "accepted") clearAnalyticsCookies();
    const show = () => {
      settingsButton.current = document.activeElement as HTMLElement;
      settingsOpen.current = true;
      setOpen(true);
      requestAnimationFrame(() => firstButton.current?.focus());
    };
    const sync = (event: StorageEvent) => { if (event.key === KEY || event.key === null) location.reload(); };
    window.addEventListener("open-cookie-settings", show);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("open-cookie-settings", show); window.removeEventListener("storage", sync); };
  }, []);

  function choose(next: Choice) {
    try { localStorage.setItem(KEY, next); } catch { /* The choice still applies to this page. */ }
    const wasAccepted = choice === "accepted";
    window["ga-disable-G-Q5GJ7YP773"] = next !== "accepted";
    if (next === "rejected") {
      window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      clearAnalyticsCookies();
    }
    setChoice(next); setOpen(false);
    if (settingsOpen.current) settingsButton.current?.focus();
    if (wasAccepted && next === "rejected") location.reload();
  }

  useEffect(() => {
    if (!ready || choice !== "accepted" || !pathname) return;
    window.gtag?.("set", { page_path: pathname, page_location: location.origin + pathname });
    window.gtag?.("event", "page_view", { page_path: pathname, page_location: location.origin + pathname });
    if (/\/work\/[^/]+\/$/.test(pathname)) window.gtag?.("event", "view_project", { project_slug: pathname.split("/").filter(Boolean).at(-1) });
  }, [pathname, ready, choice]);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    const track = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.protocol === "mailto:") window.gtag?.("event", "contact_click", { method: "email" });
      else if (link.origin === location.origin && /\.pdf$/i.test(link.pathname)) window.gtag?.("event", "file_download", { file_name: link.pathname.split("/").at(-1), file_extension: "pdf" });
    };
    document.addEventListener("click", track);
    return () => document.removeEventListener("click", track);
  }, [ready, choice]);

  return <>
    {choice === "accepted" && <Script id="consented-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" onReady={() => {
      window["ga-disable-G-Q5GJ7YP773"] = false;
      window.dataLayer = window.dataLayer || [];
      // GA expects an arguments object, not an array.
      window.gtag = function () { window.dataLayer!.push(arguments); };
      window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      window.gtag("js", new Date());
      window.gtag("config", ID, { send_page_view: false, page_location: location.origin + location.pathname, allow_google_signals: false, allow_ad_personalization_signals: false });
      setReady(true);
    }} />}
    {open && <section className="cookie-banner" aria-labelledby="cookie-title" aria-describedby="cookie-description" role="region">
      <div><h2 id="cookie-title">Your privacy choices</h2><p id="cookie-description">With your permission, Google Analytics helps me understand how visitors explore this portfolio. Analytics stays off until you accept. You can change your choice in Cookie settings.</p><Link href="/privacy/">Privacy policy</Link></div>
      <div className="cookie-banner__actions"><button ref={firstButton} type="button" onClick={() => choose("rejected")}>Reject analytics</button><button type="button" onClick={() => choose("accepted")}>Accept analytics</button>{choice && <button type="button" onClick={() => { setOpen(false); settingsButton.current?.focus(); }}>Close settings</button>}</div>
    </section>}
  </>;
}
