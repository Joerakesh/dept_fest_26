import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TECHRODEO 2026 | The Doomsday Protocol",
  description: "Eight event arenas. One day of code, creativity, and competition. Join TECHRODEO at Loyola College on December 4, 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
