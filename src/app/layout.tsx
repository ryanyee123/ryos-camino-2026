import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";
import TopoBackground from "@/components/TopoBackground";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Ryan's Camino de Santiago",
  description: "Sarria to Santiago de Compostela, May 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistPixelSquare.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TopoBackground />
        <div className="relative z-10 min-h-full">{children}</div>
      </body>
    </html>
  );
}
