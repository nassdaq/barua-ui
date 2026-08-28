"use client";

import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ElementType, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export const TopNav = block("header", "b-topnav", "TopNav");
export const TopNavBrand = block("a", "b-topnav__brand", "TopNavBrand");
export const TopNavLinks = block("nav", "b-topnav__links", "TopNavLinks");

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  active?: boolean;
  children?: ReactNode;
}

/** Active state is a class *and* an ARIA fact — never one without the other. */
function navLink(base: string, displayName: string) {
  const Component = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
    { as: Tag = "a", active, className, children, ...rest },
    ref
  ) {
    const El = Tag as ElementType;
    return (
      <El
        ref={ref}
        className={cn(base, active && "is-active")}
        aria-current={active ? "page" : undefined}
        {...rest}
      >
        {children}
      </El>
    );
  });
  Component.displayName = displayName;
  return Component;
}

export const TopNavLink = navLink("b-topnav__link", "TopNavLink");
export const BottomNavItem = navLink("b-bottomnav__item", "BottomNavItem");
export const DockItem = navLink("b-dock__item", "DockItem");

export const BottomNav = block("nav", "b-bottomnav", "BottomNav");
export const Dock = block("div", "b-dock", "Dock");
export const DockTray = block("div", "b-dock__tray", "DockTray");
export const PillNav = block("nav", "b-pill-nav", "PillNav");
export const BackButton = block("button", "b-back-btn", "BackButton");
export const MarketingNav = block("header", "b-marketing-nav", "MarketingNav");
export const MarketingNavBrand = block("a", "b-marketing-nav__brand", "MarketingNavBrand");
export const MarketingNavLinks = block("nav", "b-marketing-nav__links", "MarketingNavLinks");

export interface Step {
  label: ReactNode;
  state?: "complete" | "active" | "upcoming";
}

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  /** Zero-based index of the current step; sets the states for you. */
  current?: number;
}

export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { steps, current, className, ...rest },
  ref
) {
  return (
    <ol ref={ref} className={cn("b-steps", className)} {...rest}>
      {steps.map((step, i) => {
        const state =
          step.state ?? (current === undefined ? undefined : i < current ? "complete" : i === current ? "active" : undefined);
        return (
          <li
            key={i}
            className={state ? `is-${state}` : undefined}
            data-step={i + 1}
            aria-current={state === "active" ? "step" : undefined}
          >
            {step.label}
          </li>
        );
      })}
    </ol>
  );
});

export interface DrawerProps extends HTMLAttributes<HTMLElement> {
  /** Anchor to the trailing edge instead of the leading one. */
  end?: boolean;
  children?: ReactNode;
}

/**
 * Uses the platform popover, so light-dismiss and the top layer are the
 * browser's job rather than a scroll-lock hack.
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(
  { end, className, children, ...rest },
  ref
) {
  return (
    <nav ref={ref as never} className={cn("b-drawer", end && "b-drawer--end", className)} {...rest}>
      {children}
    </nav>
  );
});

export const DrawerHeader = block("div", "b-drawer__header", "DrawerHeader");
export const DrawerBody = block("div", "b-drawer__body", "DrawerBody");
export const StatusBar = block("div", "b-statusbar", "StatusBar");
export const StatusBarItem = block("span", "b-statusbar__item", "StatusBarItem");

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
}

/** Alignment lives on the Dropdown, not here — pass end to that. */
export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(
  { className, children, ...rest },
  ref
) {
  return (
    <ul ref={ref} className={cn("b-menu", className)} role="menu" {...rest}>
      {children}
    </ul>
  );
});

export interface MenuItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Keyboard hint, right-aligned. Not a place for secondary text. */
  shortcut?: ReactNode;
  danger?: boolean;
  /** Leading glyph. */
  icon?: ReactNode;
  children?: ReactNode;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { shortcut, danger, icon, className, children, ...rest },
  ref
) {
  return (
    <li role="none">
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={cn("b-menu__item", danger && "b-menu__item--danger", className)}
        {...rest}
      >
        {icon}
        {children}
        {shortcut ? <span className="b-menu__shortcut">{shortcut}</span> : null}
      </button>
    </li>
  );
});

export const MenuLabel = block("li", "b-menu__label", "MenuLabel");
export const MenuSeparator = block("li", "b-menu__separator", "MenuSeparator");

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDetailsElement>, "children" | "label"> {
  /** What the trigger reads — the current value for a select, the action for a menu. */
  label: ReactNode;
  /**
   * "select" when the trigger holds a chosen value: it is painted by the same
   * rule as Input, so it matches the fields beside it. "button" is for a menu
   * of actions. Getting this backwards puts a borderless grey pill in a column
   * of bordered fields, which is the single most common way this component is
   * misused.
   */
  variant?: "button" | "select";
  /** Align the panel to the trailing edge, for triggers near the window edge. */
  end?: boolean;
  triggerProps?: HTMLAttributes<HTMLElement>;
  children?: ReactNode;
}

/**
 * A menu that needs no JavaScript to open: <details> does it, and the system's
 * script handles edge-flipping and outside-click.
 */
export const Dropdown = forwardRef<HTMLDetailsElement, DropdownProps>(function Dropdown(
  { label, variant = "button", end, triggerProps, className, children, ...rest },
  ref
) {
  const { className: triggerClass, ...triggerRest } = triggerProps ?? {};
  return (
    <details ref={ref} className={cn("b-dropdown", end && "b-dropdown--end", className)} {...rest}>
      <summary
        className={cn(variant === "select" ? "b-select" : "b-btn", triggerClass)}
        aria-haspopup={variant === "select" ? "listbox" : "menu"}
        {...triggerRest}
      >
        {label}
      </summary>
      {children}
    </details>
  );
});
