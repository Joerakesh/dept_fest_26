import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "TECHRODEO 2026 | The Doomsday Protocol",
  description: "Eight event arenas. One day of code, creativity, and competition. Join TECHRODEO at Loyola College on December 4, 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={cn("font-sans", geist.variable)}><body>{children}</body></html>;
}
