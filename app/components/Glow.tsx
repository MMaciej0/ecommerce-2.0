"use client";

import { cn } from "@/app/lib/utils/utils";
import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  MouseEvent,
  useEffect,
  useRef,
} from "react";

interface GlowAreaProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
}

export const GlowArea = ({ size = 300, ...props }: GlowAreaProps) => {
  const glowAreaRef = useRef<HTMLDivElement>(null);
  const latestCoords = useRef<{ x: number; y: number } | null>(null);
  const frameId = useRef<number | null>(null);

  const updateGlow = () => {
    if (latestCoords.current && glowAreaRef.current) {
      glowAreaRef.current.style.setProperty(
        "--glow-x",
        `${latestCoords.current.x}px`,
      );
      glowAreaRef.current.style.setProperty(
        "--glow-y",
        `${latestCoords.current.y}px`,
      );
      frameId.current = null;
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    latestCoords.current = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => updateGlow());
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--glow-x");
    e.currentTarget.style.removeProperty("--glow-y");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={glowAreaRef}
      style={
        {
          position: "relative",
          "--glow-size": `${size}px`,
        } as CSSProperties
      }
      {...props}
    />
  );
};

interface GlowProps extends ComponentPropsWithoutRef<"div"> {
  color?: string;
}

export const Glow = ({
  color = "hsl(262.1 83.3% 85.8%)",
  className,
  children,
  ...props
}: GlowProps) => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    element.current?.style.setProperty(
      "--glow-top",
      `${element.current?.offsetTop}px`,
    );
    element.current?.style.setProperty(
      "--glow-left",
      `${element.current?.offsetLeft}px`,
    );
  }, []);

  return (
    <div
      ref={element}
      className={cn(className, "relative overflow-hidden")}
      {...props}
    >
      <div
        {...props}
        style={{
          backgroundImage: `radial-gradient(
        var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
        calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
        ${color} 0%,
        transparent 100%
      )`,
        }}
        className="after:inset-0.25 absolute inset-0 mix-blend-multiply"
      />
      {children}
    </div>
  );
};
