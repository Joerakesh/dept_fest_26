import "@/components/landing-page.css";
import { FestivalShell } from "@/components/festival-shell";

export default function FestivalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <FestivalShell>{children}</FestivalShell>;
}