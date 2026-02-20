import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { content } from "./_data/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${content.name} | ${content.title}`,
  description: content.tagline,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: `${content.name} | ${content.title}`,
    description: content.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.name} | ${content.title}`,
    description: content.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    jobTitle: content.title,
    description: content.tagline,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

