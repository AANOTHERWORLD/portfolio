import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CursorTrail from "@/components/CursorTrail";
import Motion from "@/components/Motion";
import { portfolio, isDraftMode } from "@/lib/content";

// One family, Inter, self-hosted from public/fonts and served at weight 500 nearly everywhere.
const inter = localFont({
  src: [{ path: "../public/fonts/inter-normal-latin.woff2", style: "normal", weight: "300 700" }],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${portfolio.name} | Creative Direction, Architecture and Interiors`,
    template: `%s | ${portfolio.name}`,
  },
  description: `${portfolio.headline} ${portfolio.positioning}`,
  openGraph: {
    title: `${portfolio.name}, ${portfolio.headline}`,
    description: portfolio.positioning,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const draft = isDraftMode();
  return (
    <html lang="en" className={inter.variable} data-draft={draft || undefined}>
      <body>
        {/* GA4 reads UTMs on entry. Enhanced Measurement owns history page views;
            do not add a second route-change page_view or retag internal links. */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Q5GJ7YP773" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "G-Q5GJ7YP773");
        `}</Script>
        <SiteHeader />
        {draft && (
          <p className="draft-banner" role="status" data-header-invert>
            Draft preview. Projects, assets, and claims awaiting permission or verification are shown with markers. Production builds exclude them.
          </p>
        )}
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
        <Motion />
        <CursorTrail />
      </body>
    </html>
  );
}
