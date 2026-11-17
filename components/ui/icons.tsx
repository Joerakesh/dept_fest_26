import type { ReactNode, SVGProps } from "react";
type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };
type Shape = () => ReactNode;
const shapes: Record<string, Shape> = {
Activity: () => <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>, ArrowRight: () => <path d="M5 12h14m-7-7 7 7-7 7"/>,
Bell: () => <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
CalendarDays: () => <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01"/></>,
Check: () => <path d="m5 12 4 4L19 6"/>, ChevronDown: () => <path d="m6 9 6 6 6-6"/>, ChevronLeft: () => <path d="m15 18-6-6 6-6"/>, ChevronRight: () => <path d="m9 18 6-6-6-6"/>,
CircleHelp: () => <><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01"/></>,
ClipboardList: () => <><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5V3h6v1.5M9 10h6M9 14h6M9 18h3"/></>, Clock3: () => <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
Command: () => <><path d="M9 6a3 3 0 1 1 3 3H6a3 3 0 1 1 3-3v12a3 3 0 1 1-3-3h12a3 3 0 1 1-3 3V6a3 3 0 1 1 3 3"/></>,
Download: () => <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></>, Ellipsis: () => <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
FileChartColumnIncreasing: () => <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/><path d="M8 16v2M12 13v5M16 10v8"/></>,
Flame: () => <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.4 0 2.5-1.1 2.5-2.5 0-2-2.5-3-2.5-5.5-3 2-5 4.5-5 7.5a6 6 0 0 0 12 0c0-3-1.5-5-4-7 0 2-1 3-2 3"/></>,
LayoutDashboard: () => <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>,
Plus: () => <path d="M12 5v14M5 12h14"/>, Search: () => <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>, Settings2: () => <><path d="M20 7h-9M14 17H5M20 17h-2M9 7H4"/><circle cx="7" cy="7" r="2"/><circle cx="15" cy="17" r="2"/></>,
ShieldCheck: () => <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11"/><path d="m9 12 2 2 4-4"/></>, Skull: () => <><circle cx="12" cy="11" r="8"/><path d="M8 17v4h8v-4M9 11h.01M15 11h.01M10 15h4M12 3v2"/></>,
TicketCheck: () => <><path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM9 12l2 2 4-4"/></>,
Users: () => <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
Volume2: () => <><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></>, VolumeX: () => <><path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></>, X: () => <path d="m18 6-12 12M6 6l12 12"/>,
};
function makeIcon(name: keyof typeof shapes) {
  function Icon({ size = 24, strokeWidth = 2, ...props }: IconProps) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{shapes[name]()}</svg>; }
  Icon.displayName = name;
  return Icon;
}
export const Activity=makeIcon("Activity"), ArrowRight=makeIcon("ArrowRight"), Bell=makeIcon("Bell"), CalendarDays=makeIcon("CalendarDays"), Check=makeIcon("Check"), ChevronDown=makeIcon("ChevronDown"), ChevronLeft=makeIcon("ChevronLeft"), ChevronRight=makeIcon("ChevronRight"), CircleHelp=makeIcon("CircleHelp"), ClipboardList=makeIcon("ClipboardList"), Clock3=makeIcon("Clock3"), Command=makeIcon("Command"), Download=makeIcon("Download"), Ellipsis=makeIcon("Ellipsis"), FileChartColumnIncreasing=makeIcon("FileChartColumnIncreasing"), Flame=makeIcon("Flame"), LayoutDashboard=makeIcon("LayoutDashboard"), Plus=makeIcon("Plus"), Search=makeIcon("Search"), Settings2=makeIcon("Settings2"), ShieldCheck=makeIcon("ShieldCheck"), Skull=makeIcon("Skull"), TicketCheck=makeIcon("TicketCheck"), Users=makeIcon("Users"), Volume2=makeIcon("Volume2"), VolumeX=makeIcon("VolumeX"), X=makeIcon("X");
