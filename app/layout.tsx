import type { Metadata } from "next";
import localFont from "next/font/local";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import { SITE_ORIGIN } from "@/lib/seo";
import { withBasePath } from "@/lib/basePath";
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
  metadataBase: new URL(SITE_ORIGIN),
  alternates: { canonical: withBasePath("/") },
  icons: { icon: [{ url: withBasePath("/favicon.svg"), type: "image/svg+xml" }, { url: withBasePath("/favicon-32.png"), sizes: "32x32", type: "image/png" }], apple: withBasePath("/apple-touch-icon.png") },
  twitter: { card: "summary_large_image", title: `${portfolio.name}, ${portfolio.headline}`, description: portfolio.positioning, images: [withBasePath("/social-preview.png")] },
  title: {
    default: `${portfolio.name} | Creative Direction, Architecture and Interiors`,
    template: `%s | ${portfolio.name}`,
  },
  description: `${portfolio.headline} ${portfolio.positioning}`,
  openGraph: {
    title: `${portfolio.name}, ${portfolio.headline}`,
    description: portfolio.positioning,
    type: "website",
    url: withBasePath("/"),
    siteName: portfolio.name,
    images: [{ url: withBasePath("/social-preview.png"), width: 1200, height: 630, alt: "Jamel Williams. One Vision. Multiple Scales." }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const draft = isDraftMode();
  return (
    <html lang="en" className={inter.variable} data-draft={draft || undefined}>
      <body>
        <AnalyticsConsent />
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
