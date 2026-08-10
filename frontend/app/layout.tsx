import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import FloatingNav from "@/components/FloatingNav";
import ChatOrb from "@/components/ChatOrb";
import { SpoilerProvider } from "@/lib/spoiler";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Throne of Glass Archive",
    template: "%s · Throne of Glass Archive",
  },
  description:
    "Immersive unofficial Throne of Glass fan archive — scrollytelling, characters, villains, places, and a quiet oracle chatbot.",
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
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
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
