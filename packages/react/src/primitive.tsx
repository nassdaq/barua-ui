"use client";

import { createElement, forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

export interface BlockProps extends HTMLAttributes<HTMLElement> {
  /** Render a different element without losing the class. */
  as?: ElementType;
  children?: ReactNode;
}

/**
 * Most of this system is a class on an element. `block` binds one of those to a
 * component so the class name never has to be typed by hand — and so the wrong
 * one cannot be typed at all.
 */
export function block(defaultTag: ElementType, base: string, displayName: string) {
  const Component = forwardRef<HTMLElement, BlockProps>(function Block(
    { as, className, ...rest },
    ref
  ) {
    return createElement(as ?? defaultTag, { ref, className: cn(base, className), ...rest });
  });
  Component.displayName = displayName;
  return Component;
}
