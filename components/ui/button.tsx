import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "subtle" | "destructive"; size?: "default" | "sm" | "icon" };
const variants = { default: "bg-violet-600 text-white shadow-sm hover:bg-violet-700", outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900", subtle: "bg-violet-50 text-violet-700 hover:bg-violet-100", destructive: "bg-rose-600 text-white hover:bg-rose-700" };
const sizes = { default: "h-10 px-4", sm: "h-9 rounded-md px-3 text-xs", icon: "size-9" };
export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return <button className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
}
