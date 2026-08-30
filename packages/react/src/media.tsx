"use client";

import { forwardRef, useState, type AnchorHTMLAttributes, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export const MediaPlaceholder = block("div", "b-media-placeholder", "MediaPlaceholder");

export interface AsyncImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "placeholder"> {
  src: string;
  alt: string;
  /**
   * A tiny copy of the same picture as a data URI — 32px wide is about a
   * kilobyte. Shown blurred until the real one arrives, so the frame is filled
   * with something true rather than with a shimmer.
   */
  placeholder?: string;
  /** e.g. "16/10". Reserves the space so nothing below jumps when it loads. */
  aspect?: string;
  className?: string;
}

/**
 * An image that fills its frame before it has finished arriving.
 *
 * With a placeholder it blurs up; without one it shimmers. Either way the box
 * is the right size from the first paint, which is the part that matters —
 * layout that settles after the fact is what makes a page feel cheap.
 */
export const AsyncImage = forwardRef<HTMLImageElement, AsyncImageProps>(function AsyncImage(
  { src, alt, placeholder, aspect, className, style, ...rest },
  ref
) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      className={cn("b-async-img", loaded && "is-loaded", className)}
      data-placeholder={placeholder ? "" : undefined}
      style={{
        ...(aspect ? { aspectRatio: aspect } : null),
        ...(placeholder ? { ["--b-img-placeholder" as string]: `url("${placeholder}")` } : null),
        ...style,
      }}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        // A picture that failed still has to stop pretending to load.
        onError={() => setLoaded(true)}
        {...rest}
      />
    </span>
  );
});

export const Web = block("div", "b-web", "Web");
export const Video = block("video", "b-video", "Video");
export const Audio = block("div", "b-audio", "Audio");
export const Waveform = block("div", "b-waveform", "Waveform");

export interface ThumbProps extends HTMLAttributes<HTMLDivElement> {
  /** Runtime badge — marks it as a video without a second glance. */
  duration?: ReactNode;
  children?: ReactNode;
}

export const Thumb = forwardRef<HTMLDivElement, ThumbProps>(function Thumb(
  { duration, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-thumb", duration !== undefined && "b-thumb--video", className)} {...rest}>
      {children}
      {duration ? <span className="b-thumb__duration">{duration}</span> : null}
    </div>
  );
});

/* ---- Progress and axes --------------------------------------------------- */

export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100, or omit for an indeterminate ring. */
  value?: number;
  label?: ReactNode;
  /** States what is progressing, for assistive tech. */
  description?: string;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress({ value, label, description, className, style, ...rest }, ref) {
    return (
      <div className="b-circular-wrap">
        <div
          ref={ref}
          className={cn("b-circular", className)}
          style={{ ...(value === undefined ? null : { ["--b-progress" as string]: value }), ...style }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={value === undefined ? undefined : 0}
          aria-valuemax={value === undefined ? undefined : 100}
          aria-label={description}
          {...rest}
        >
          {label ? <div className="b-circular__label">{label}</div> : null}
        </div>
      </div>
    );
  }
);

export interface AxisProps extends HTMLAttributes<HTMLDivElement> {
  /** Value axis rather than the category one. */
  y?: boolean;
  /** Tick labels, in order. */
  ticks?: ReactNode[];
  children?: ReactNode;
}

export const Axis = forwardRef<HTMLDivElement, AxisProps>(function Axis(
  { y, ticks, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-axis", y && "b-axis--y", className)} aria-hidden="true" {...rest}>
      {ticks ? ticks.map((tick, i) => <span key={i}>{tick}</span>) : children}
    </div>
  );
});

export const RadarChart = block("svg", "b-radar-svg", "RadarChart");
export const LineChart = block("svg", "b-line-svg", "LineChart");
export const AreaChart = block("svg", "b-area-svg", "AreaChart");
export const ScatterChart = block("svg", "b-scatter-svg", "ScatterChart");
export const GridLines = block("div", "b-gridlines", "GridLines");

/* ---- Navigation leftovers ------------------------------------------------ */

export const MenuBar = block("div", "b-menubar", "MenuBar");
export const MenuBarItem = block("button", "b-menubar__item", "MenuBarItem");
export const PaginationEllipsis = block("span", "b-pagination__ellipsis", "PaginationEllipsis");

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  children?: ReactNode;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { label = "Pagination", className, children, ...rest },
  ref
) {
  return (
    <nav ref={ref} aria-label={label} {...rest}>
      <ul className={cn("b-pagination", className)}>{children}</ul>
    </nav>
  );
});

export interface PaginationItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
  children?: ReactNode;
}

export const PaginationItem = forwardRef<HTMLAnchorElement, PaginationItemProps>(
  function PaginationItem({ current, className, children, ...rest }, ref) {
    return (
      <li>
        <a
          ref={ref}
          className={cn("b-pagination__item", current && "is-active", className)}
          aria-current={current ? "page" : undefined}
          {...rest}
        >
          {children}
        </a>
      </li>
    );
  }
);

export interface LiquidToggleProps extends HTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  children?: ReactNode;
}

export const LiquidToggle = forwardRef<HTMLButtonElement, LiquidToggleProps>(function LiquidToggle(
  { pressed, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("b-liquid-toggle", className)}
      aria-pressed={pressed}
      {...rest}
    >
      {children}
    </button>
  );
});

/* ---- Command centre ------------------------------------------------------ */

export const CommandCenterTile = block("div", "b-cc__tile", "CommandCenterTile");
export const CommandCenterLabel = block("div", "b-cc__label", "CommandCenterLabel");
export const CommandCenterStatus = block("div", "b-cc__status", "CommandCenterStatus");
export const ImageLens = block("div", "b-lens", "ImageLens");
