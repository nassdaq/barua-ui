"use client";

import { forwardRef, useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

export type RevealVariant = "up" | "fade" | "scale" | "start" | "end";

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: RevealVariant;
  children?: ReactNode;
}

/**
 * An entrance tied to the element's own position in the scrollport, driven by
 * the browser rather than by a scroll listener. Where scroll timelines are
 * unsupported the content is simply visible — an entrance that fails closed
 * would hide the page.
 */
export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { as: Tag = "div", variant = "up", className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      className={cn("b-reveal", variant !== "up" && `b-reveal--${variant}`, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

export interface FitTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Never smaller than this. */
  min?: string;
  /** Never larger than this. */
  max?: string;
  /** Size as a share of the container's width, in cqi. */
  scale?: string;
  children?: ReactNode;
}

/** One line sized to its container — a total, a headline figure, a long name. */
export const FitText = forwardRef<HTMLDivElement, FitTextProps>(function FitText(
  { min, max, scale, className, style, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("b-fit-text", className)}
      style={{
        ...(min ? { ["--b-fit-min" as string]: min } : null),
        ...(max ? { ["--b-fit-max" as string]: max } : null),
        ...(scale ? { ["--b-fit-scale" as string]: scale } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface CountUpProps extends HTMLAttributes<HTMLSpanElement> {
  /** The value to travel to. */
  to: number;
  decimals?: number;
  duration?: number;
  /** Kept around the number, so "TZS 4.2M" stays "TZS 4.2M". */
  prefix?: string;
  suffix?: string;
  /** Thousands separators. */
  grouped?: boolean;
}

/**
 * A figure that travels to its new value instead of blinking to it. Honours
 * reduced motion by arriving immediately, and uses tabular figures so the
 * width does not jitter while the digits change.
 */
export const CountUp = forwardRef<HTMLSpanElement, CountUpProps>(function CountUp(
  { to, decimals = 0, duration = 700, prefix = "", suffix = "", grouped = true, className, ...rest },
  ref
) {
  const node = useRef<HTMLSpanElement | null>(null);
  const from = useRef(0);

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    const start = from.current;
    const target = to;
    from.current = to;

    const render = (value: number) => {
      const text = grouped
        ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : value.toFixed(decimals);
      el.textContent = `${prefix}${text}${suffix}`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(target);
      return;
    }

    let frame = 0;
    const began = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - began) / duration);
      render(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, decimals, duration, prefix, suffix, grouped]);

  return (
    <span
      ref={(el) => {
        node.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as { current: HTMLSpanElement | null }).current = el;
      }}
      className={cn("b-tabular-nums", className)}
      {...rest}
    >
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
});

export interface ContextMenuTargetProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** CSS selector of the .b-menu to open, e.g. "#row-menu". */
  menu: string;
  children?: ReactNode;
}

/** Right-click, or long-press, opens the named menu at the pointer. */
export const ContextMenuTarget = forwardRef<HTMLElement, ContextMenuTargetProps>(
  function ContextMenuTarget({ as: Tag = "div", menu, children, ...rest }, ref) {
    const Component = Tag as ElementType;
    return (
      <Component ref={ref} data-b-contextmenu={menu} {...rest}>
        {children}
      </Component>
    );
  }
);
