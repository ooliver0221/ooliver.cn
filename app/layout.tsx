import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { personalConfig } from "@/config/personal";
import { fontDecorative, fontPrimary } from "@/config/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${personalConfig.site.url}/#website`,
      url: personalConfig.site.url,
      name: personalConfig.site.name,
      description: personalConfig.site.description,
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${personalConfig.site.url}/#person`,
      name: personalConfig.person.name,
      alternateName: personalConfig.person.alternateName,
      url: personalConfig.site.url,
      jobTitle: personalConfig.person.jobTitle,
      worksFor: {
        "@type": "Organization",
        name: personalConfig.person.organization,
      },
      alumniOf: personalConfig.person.alumniOf.map((name) => ({
        "@type": "CollegeOrUniversity",
        name,
      })),
      sameAs: [
        personalConfig.links.github,
        personalConfig.links.steam,
        personalConfig.links.wechat,
        personalConfig.links.qq,
        personalConfig.links.bilibili,
        personalConfig.links.tiktok,
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          crossOrigin="anonymous"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={clsx(
          fontPrimary.className,
          "tracking-wide",
          fontDecorative.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class" }}>
          <div className="relative flex flex-col bg-[#f6f2f2] dark:bg-[#0b0f11] overflow-y-auto scrollbar-hide min-h-screen">
            <main className="container mx-auto max-w-7xl pt-10 pb-[25px] md:pt-16 flex flex-col">
              {children}
              <Analytics />
            </main>
            <footer className="text-center text-xs text-gray-500 dark:text-gray-400 py-4 px-4">
              <p>
                Copyright &copy; by{" "}
                <a
                  className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  href="https://ooliver.cn"
                  rel="noopener"
                  target="_blank"
                >
                  ooliver
                </a>{" "}
                All Rights Reserved.
              </p>
              <p className="mt-1 flex items-center justify-center flex-wrap gap-x-1">
                <a
                  className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  href="https://beian.miit.gov.cn/"
                  rel="noopener"
                  target="_blank"
                >
                  赣ICP备2025071019号-1
                </a>
                <span className="mx-1">|</span>
                <img
                  alt="备案图标"
                  className="inline-block"
                  height={15}
                  src="https://blog.ooliver.cn/wp-content/uploads/2025/09/1757172069-备案图标.png"
                  width={15}
                />
                <a
                  className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  href="https://beian.mps.gov.cn/#/query/webSearch?code=36010802001219"
                  rel="noreferrer"
                  target="_blank"
                >
                  赣公网安备36010802001219号
                </a>
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
