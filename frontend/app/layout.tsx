import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Manrope } from "next/font/google";
import { Suspense } from "react";
import FloatingNav from "@/components/FloatingNav";
import ChatOrb from "@/components/ChatOrb";
import { SpoilerProvider } from "@/lib/spoiler";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Throne of Glass Archive",
    template: "%s · Throne of Glass Archive",
  },
  description:
    "Immersive unofficial Throne of Glass fan archive with scrollytelling, characters, villains, places, and a quiet oracle chatbot.",
  icons: {
    icon: "/icon.svg",
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
      className={`${cormorant.variable} ${cinzel.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SpoilerProvider>
          <div className="site-shell site-shell--immersive">
            <FloatingNav />
            <main className="site-main">{children}</main>
            <footer className="disclaimer-strip">
              Unofficial fan archive · Not affiliated with Sarah J. Maas or
              Bloomsbury · Personal passion project
            </footer>
            <Suspense fallback={null}>
              <ChatOrb />
            </Suspense>
          </div>
        </SpoilerProvider>
      </body>
    </html>
  );
}
