import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.agentName} | ${siteConfig.agentTitle} at ${siteConfig.brokerage}`,
  description: siteConfig.heroSubtext,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
