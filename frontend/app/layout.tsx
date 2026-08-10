import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Nav from "@/components/Nav";
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
    "An immersive fan archive for Sarah J. Maas's Throne of Glass — characters, world, timeline, and a spoiler-aware chatbot.",
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
          <div className="site-shell">
            <Nav />
            <main style={{ flex: 1 }}>{children}</main>
            <footer className="disclaimer-strip">
              Unofficial fan archive · Not affiliated with Sarah J. Maas, Bloomsbury,
              or any rights holders · Spoilers gated by your reading progress
            </footer>
          </div>
        </SpoilerProvider>
      </body>
    </html>
  );
}
