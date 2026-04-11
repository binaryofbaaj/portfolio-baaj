import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Gurman Singh | Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Gurman Singh Budhiraja — Full Stack Developer specializing in AI-powered applications, React, Next.js, and modern web technologies.",
  keywords: [
    "Gurman Singh",
    "Full Stack Developer",
    "AI",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Gurman Singh Budhiraja" }],
  openGraph: {
    title: "Gurman Singh | Full Stack Developer",
    description: "Full Stack Developer & AI Enthusiast. Building the future, one line of code at a time.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#050816",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
          {/* CRT Scanlines overlay */}
          <div className="crt-overlay" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
