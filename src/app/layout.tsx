import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Terminal from "@/components/terminal/Terminal";
import { ThemeProvider } from "@/contexts/ThemeContext";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shashank Yadav | Software Development Engineer",
    template: "%s | Shashank Yadav"
  },
  description: "Modern interactive portfolio showcasing AI-driven solutions, full-stack development expertise, and innovative projects. Built with Next.js, TypeScript, and Three.js featuring advanced animations and responsive design.",
  keywords: [
    "Shashank Yadav",
    "Software Engineer", 
    "AI", 
    "Machine Learning", 
    "Full Stack Developer", 
    "React", 
    "Next.js", 
    "TypeScript", 
    "Portfolio", 
    "Frontend Developer",
    "Backend Developer",
    "Web Development",
    "JavaScript",
    "Three.js",
    "Node.js"
  ],
  authors: [{ name: "Shashank Yadav", url: "https://shashank11yadav.github.io/shashank-yadav-portfolio/" }],
  creator: "Shashank Yadav",
  publisher: "Shashank Yadav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shashank11yadav.github.io/shashank-yadav-portfolio/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shashank11yadav.github.io/shashank-yadav-portfolio/",
    title: "Shashank Yadav | Software Development Engineer",
    description: "Modern interactive portfolio showcasing AI-driven solutions, full-stack development expertise, and innovative projects with advanced animations.",
    siteName: "Shashank Yadav Portfolio",
    images: [
      {
        url: "/apple-icon.svg",
        width: 1200,
        height: 630,
        alt: "Shashank Yadav - Software Development Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Yadav | Software Development Engineer",
    description: "Modern interactive portfolio showcasing AI-driven solutions, full-stack development expertise, and innovative projects.",
    creator: "@shashankyadav",
    images: ["/apple-icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased transition-colors duration-300`}>
        <ThemeProvider>
          {children}
          <Terminal />
          <Toaster 
            position="top-right"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
