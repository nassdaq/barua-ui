"use client";

import { forwardRef, type HTMLAttributes, type ElementType, type ReactNode } from "react";
import { cn } from "./cn";
import { block, type BlockProps } from "./primitive";

type Align = "start" | "center" | "end" | "between" | "stretch";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Token gap: 0–4, 6 or 8. Anything else is a margin, and margins are not the system. */
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  align?: Align;
  wrap?: boolean;
  children?: ReactNode;
}

function stackClasses(base: string, p: StackProps, className?: string) {
  return cn(
    base,
    p.gap !== undefined && `b-gap-${p.gap}`,
    p.align && `b-stack--${p.align}`,
    p.wrap && "b-stack--wrap",
    className
  );
}

/** Vertical flow — the default building block for any view. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as: Tag = "div", gap, align, wrap, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={stackClasses("b-stack", { gap, align, wrap }, className)} {...rest}>
      {children}
    </Component>
  );
});

export const VStack = Stack;

/** Horizontal flow. Same gap scale, same alignment vocabulary. */
export const HStack = forwardRef<HTMLElement, StackProps>(function HStack(
  { as: Tag = "div", gap, align, wrap, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={stackClasses("b-hstack", { gap, align, wrap }, className)} {...rest}>
      {children}
    </Component>
  );
});

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Fixed track count, or "auto" to fit as many as the width allows. */
  cols?: 2 | 3 | 4 | 6 | "auto";
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  children?: ReactNode;
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { as: Tag = "div", cols, gap, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      className={cn("b-grid", cols && `b-grid--${cols}`, gap !== undefined && `b-gap-${gap}`, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

export interface ContainerProps extends BlockProps {
  size?: "sm" | "md" | "xl" | "fluid";
}

/** Centred measure with the page gutters already applied. */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { as: Tag = "div", size, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={cn("b-container", size && `b-container--${size}`, className)} {...rest}>
      {children}
    </Component>
  );
});

export interface ScrollAreaProps extends BlockProps {
  axis?: "x" | "y";
  /** Fade the clipped edge, so cut-off content looks deliberate. */
  fade?: boolean;
}

/**
 * The only element allowed to scroll. Everything outside one of these is a
 * screen: it fits, or it is redesigned until it does.
 */
export const ScrollArea = forwardRef<HTMLElement, ScrollAreaProps>(function ScrollArea(
  { as: Tag = "div", axis, fade, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      className={cn("b-scroll-area", axis && `b-scroll-area--${axis}`, fade && "b-scroll-area--fade", className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

export interface DividerProps extends BlockProps {
  vertical?: boolean;
  inset?: boolean;
  /** Centres a caption in the rule — pass the text as children. */
  label?: boolean;
}

export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  { as: Tag = "div", vertical, inset, label, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      role={children ? undefined : "separator"}
      className={cn(
        "b-divider",
        vertical && "b-divider--vertical",
        inset && "b-divider--inset",
        label && "b-divider--label",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

/** Holds the viewport still: the app is a screen, not a document. */
export const Stage = block("div", "b-stage", "Stage");
/** Pushes siblings apart in a flex row. */
export const Spacer = block("span", "b-spacer", "Spacer");
/** Takes the leftover space in a flex row. */
export const Grow = block("div", "b-grow", "Grow");
export const Split = block("div", "b-split", "Split");
export const Section = block("section", "b-section", "Section");
export const SafeArea = block("div", "b-safe-area", "SafeArea");
export const CardGrid = block("div", "b-card-grid", "CardGrid");
export const Bento = block("div", "b-bento", "Bento");
/** 12-column dashboard grid; children claim width with span={n}. */
export const Dashboard = block("div", "b-dashboard", "Dashboard");
/** App frame: chrome that stays put, with one scrolling main. */
export const Workspace = block("div", "b-workspace", "Workspace");
export const WorkspaceMain = block("main", "b-workspace__main", "WorkspaceMain");
export const Inspector = block("aside", "b-inspector", "Inspector");
export const SkipLink = block("a", "b-skip-link", "SkipLink");

export interface SpanProps extends BlockProps {
  /** Columns to claim inside a Dashboard — 2 through 12. */
  span: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

/** Width claim for a dashboard child. Spans in one row should total twelve. */
export const Span = forwardRef<HTMLElement, SpanProps>(function Span(
  { as: Tag = "div", span, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={cn(`b-span-${span}`, className)} {...rest}>
      {children}
    </Component>
  );
});

export interface SidebarProps extends BlockProps {
  material?: "glass" | "surface";
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { as: Tag = "nav", material, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={cn("b-sidebar", material && `b-sidebar--${material}`, className)} {...rest}>
      {children}
    </Component>
  );
});

export const SidebarHeading = block("div", "b-sidebar__heading", "SidebarHeading");
export const SidebarGroup = block("div", "b-sidebar__group", "SidebarGroup");

export interface SidebarItemProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  active?: boolean;
  href?: string;
  children?: ReactNode;
}

export const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(function SidebarItem(
  { as: Tag = "a", active, className, children, ...rest },
  ref
) {
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      className={cn("b-sidebar__item", active && "is-active", className)}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
});
