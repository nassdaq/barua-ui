"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant =
  | "default"
  | "primary"
  | "tinted"
  | "outline"
  | "ghost"
  | "glass"
  | "danger"
  | "danger-tinted"
  | "success"
  | "provider"
  | "liquid";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  block?: boolean;
  loading?: boolean;
  /** Square icon-only button (pair with aria-label). */
  icon?: boolean;
  active?: boolean;
}

export type ButtonProps = ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function buttonClasses(p: ButtonOwnProps, extra?: string): string {
  return cn(
    "b-btn",
    p.variant === "liquid"
      ? "b-btn--primary b-btn--liquid"
      : p.variant && p.variant !== "default" && `b-btn--${p.variant}`,
    p.size && p.size !== "md" && `b-btn--${p.size}`,
    p.pill && "b-btn--pill",
    p.block && "b-btn--block",
    p.loading && "is-loading",
    p.active && "is-active",
    p.icon && "b-icon-btn",
    extra
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, pill, block, loading, icon, active, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={buttonClasses({ variant, size, pill, block, loading, icon, active }, className)}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
});

export type ButtonLinkProps = ButtonOwnProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Anchor styled as a button. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant, size, pill, block, loading, icon, active, className, children, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      className={buttonClasses({ variant, size, pill, block, loading, icon, active }, className)}
      {...rest}
    >
      {children}
    </a>
  );
});

export interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extended?: boolean;
  /** Render inline instead of fixed to the corner. */
  inline?: boolean;
  children: ReactNode;
}

export const Fab = forwardRef<HTMLButtonElement, FabProps>(function Fab(
  { extended, inline, className, style, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn("b-btn", !extended && "b-icon-btn", "b-fab", extended && "b-fab--extended", className)}
      style={inline ? { position: "static", ...style } : style}
      {...rest}
    >
      {children}
    </button>
  );
});

export function Toolbar({
  glass,
  className,
  children,
  ...rest
}: { glass?: boolean; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="toolbar" className={cn("b-toolbar", glass && "b-toolbar--glass", className)} {...rest}>
      {children}
    </div>
  );
}
