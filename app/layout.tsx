import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Salvador Duarte | Personal Site",
  description:
    "Currently helping build the home and infrastructure for solo founders.",
  keywords: [
    "Salvador Duarte",
    "salvduarte",
    "progreshion",
    "podcast",
    "philosophy",
    "economics",
    "Portugal",
    "Emergent Ventures",
  ],
  authors: [{ name: "Salvador Duarte", url: "https://salvadorduarte.com" }],
  creator: "Salvador Duarte",
  publisher: "Salvador Duarte",
  metadataBase: new URL("https://salvadorduarte.com"),
  alternates: {
    canonical: "https://salvadorduarte.com",
  },
  openGraph: {
    title: "Salvador Duarte | Personal Site",
    description:
      "Currently helping build the home and infrastructure for solo founders.",
    type: "website",
    siteName: "Salvador Duarte",
    url: "https://salvadorduarte.com",
    locale: "en_US",
    images: [
      {
        url: "https://salvadorduarte.com/social/preview-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Salvador Duarte's retro desktop site, with a photo card floating over the desktop wallpaper",
      },
    ],
    videos: [
      {
        url: "https://salvadorduarte.com/social/preview-v2.mp4",
        secureUrl: "https://salvadorduarte.com/social/preview-v2.mp4",
        type: "video/mp4",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salvador Duarte | Personal Site",
    description: "Currently helping build the home and infrastructure for solo founders.",
    images: [
      {
        url: "https://salvadorduarte.com/social/preview-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Salvador Duarte's retro desktop site, with a photo card floating over the desktop wallpaper",
      },
    ],
    creator: "@salvduarte",
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
    apple: "/favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Salvador Duarte",
              url: "https://salvadorduarte.com",
              description:
                "Currently helping build the home and infrastructure for solo founders.",
              sameAs: [
                "https://twitter.com/salvduarte",
              ],
              jobTitle: "Writer & Podcaster",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
