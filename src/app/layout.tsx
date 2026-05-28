import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";
import TopoBackground from "@/components/TopoBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Ryan's Trip on the Camino Francés",
  description: "Sarria to Santiago de Compostela, May 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TopoBackground />
        <div className="relative z-10 min-h-full">{children}</div>
      </body>
    </html>
  );
}
