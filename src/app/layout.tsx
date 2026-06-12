import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AnalyticsPlaceholder } from "@/components/layout/AnalyticsPlaceholder";
import { getSiteUrl, siteMetadata } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: siteMetadata.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteMetadata.shortName,
  },
  authors: [{ name: "Sushi Bliss" }],
  category: "restaurant",
  description: siteMetadata.description,
  icons: {
    apple: "/apple-icon.png",
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: getSiteUrl(),
  openGraph: {
    description: siteMetadata.description,
    images: [
      {
        alt: "Sushi Bliss omakase nigiri on a dark luxury surface",
        height: 1080,
        url: "/assets/editorial/hero-otoro-nigiri-no-red-moon.webp",
        width: 1920,
      },
    ],
    locale: "en_US",
    siteName: siteMetadata.name,
    title: siteMetadata.name,
    type: "website",
  },
  title: {
    default: siteMetadata.name,
    template: `%s | ${siteMetadata.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: siteMetadata.description,
    images: ["/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"],
    title: siteMetadata.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-sb-ink text-sb-rice">
        {children}
        <AnalyticsPlaceholder />
      </body>
    </html>
  );
}
