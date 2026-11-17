import type { CSSProperties, ReactNode } from "react";
import { cn } from "cn";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  "aria-label": string;
};

export function Marquee({ children, className, duration = 38, "aria-label": ariaLabel }: MarqueeProps) {
  return (
    <div
      className={cn("tech-marquee relative overflow-hidden", className)}
      role="region"
      aria-label={ariaLabel}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="tech-marquee__track flex w-max">
        <div className="tech-marquee__group">{children}</div>
        <div className="tech-marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}