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
    "Salvador Duarte — 18-year-old Portuguese writer, podcaster, and Emergent Ventures grantee. Thoughts on philosophy, economics, science and progress.",
  keywords: [
    "Salvador Duarte",
    "velmeryn",
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
      "Salvador Duarte — 18-year-old Portuguese writer, podcaster, and Emergent Ventures grantee. Thoughts on philosophy, economics, science and progress.",
    type: "website",
    siteName: "Salvador Duarte",
    url: "https://salvadorduarte.com",
    locale: "en_US",
    images: [
      {
        url: "https://salvadorduarte.com/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Salvador Duarte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salvador Duarte | Personal Site",
    description: "Salvador Duarte — 18-year-old Portuguese writer, podcaster, and Emergent Ventures grantee. Thoughts on philosophy, economics, science and progress.",
    images: ["https://salvadorduarte.com/images/profile.png"],
    creator: "@velmeryn",
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
                "18-year-old Portuguese writer, podcaster, and Emergent Ventures grantee. Thoughts on philosophy, economics, science and progress.",
              sameAs: [
                "https://twitter.com/velmeryn",
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
