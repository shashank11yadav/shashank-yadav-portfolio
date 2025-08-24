import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Terminal from "@/components/terminal/Terminal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shashank Yadav | Software Development Engineer",
  description: "Modern interactive portfolio showcasing AI-driven solutions, full-stack development expertise, and innovative projects. Built with Next.js, TypeScript, and Three.js.",
  keywords: ["Software Engineer", "AI", "Machine Learning", "Full Stack", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Shashank Yadav" }],
  creator: "Shashank Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shashankyadav.dev",
    title: "Shashank Yadav | Software Development Engineer",
    description: "Modern interactive portfolio showcasing AI-driven solutions and full-stack development expertise.",
    siteName: "Shashank Yadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Yadav | Software Development Engineer",
    description: "Modern interactive portfolio showcasing AI-driven solutions and full-stack development expertise.",
    creator: "@shashankyadav",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Terminal />
        <Toaster 
          position="top-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#f1f5f9',
            },
          }}
        />
      </body>
    </html>
  );
}
