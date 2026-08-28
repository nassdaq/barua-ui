"use client";

import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

/* ---- Actions ------------------------------------------------------------- */

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Fuse the buttons into one control with shared borders. */
  attached?: boolean;
  children?: ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { attached, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("b-btn-group", attached && "b-btn-group--attached", className)}
      role="group"
      {...rest}
    >
      {children}
    </div>
  );
});

export interface SplitButtonProps extends HTMLAttributes<HTMLSpanElement> {
  /** The default action — the one most people want. */
  children?: ReactNode;
  /** The menu of the rest. */
  menu?: ReactNode;
  menuLabel?: string;
}

/** One obvious action, with its variations tucked behind the chevron. */
export const SplitButton = forwardRef<HTMLSpanElement, SplitButtonProps>(function SplitButton(
  { children, menu, menuLabel = "More options", className, ...rest },
  ref
) {
  return (
    <span ref={ref} className={cn("b-split-btn", className)} {...rest}>
      {children}
      <button type="button" className="b-btn b-btn--primary" aria-label={menuLabel} aria-haspopup="menu">
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
          <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {menu}
    </span>
  );
});

export interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  children?: ReactNode;
}

/** A button that stays down. The pressed state is announced, not just drawn. */
export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton(
  { pressed, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("b-toggle-btn", pressed && "is-active", className)}
      aria-pressed={pressed}
      {...rest}
    >
      {children}
    </button>
  );
});

export const SortControl = block("div", "b-sort-control", "SortControl");
export const Share = block("div", "b-share", "Share");

/* ---- Disclosure ---------------------------------------------------------- */

export const Accordion = block("div", "b-accordion", "Accordion");

export interface DisclosureProps extends Omit<HTMLAttributes<HTMLDetailsElement>, "title"> {
  /** The always-visible summary line. */
  title: ReactNode;
  /** Drop the surface, for a disclosure inside something already carrying one. */
  plain?: boolean;
  defaultOpen?: boolean;
  children?: ReactNode;
}

/** Progressive disclosure on <details> — open state survives without JS. */
export const Disclosure = forwardRef<HTMLDetailsElement, DisclosureProps>(function Disclosure(
  { title, plain, defaultOpen, className, children, ...rest },
  ref
) {
  return (
    <details
      ref={ref}
      className={cn("b-disclosure", plain && "b-disclosure--plain", className)}
      open={defaultOpen}
      {...rest}
    >
      <summary>{title}</summary>
      <div className="b-disclosure__body">{children}</div>
    </details>
  );
});

/* ---- Calendar and dates -------------------------------------------------- */

export const Calendar = block("div", "b-calendar", "Calendar");
export const CalendarGrid = block("div", "b-calendar__grid", "CalendarGrid");
export const CalendarMonth = block("span", "b-calendar__month", "CalendarMonth");
export const CalendarWeekday = block("span", "b-calendar__weekday", "CalendarWeekday");
export const CalendarHeader = block("div", "b-calendar__header", "CalendarHeader");
export const DatePicker = block("details", "b-datepicker", "DatePicker");
export const CalendarView = block("div", "b-calview", "CalendarView");
export const CalendarViewHead = block("div", "b-calview__head", "CalendarViewHead");
export const CalendarViewCell = block("div", "b-calview__cell", "CalendarViewCell");

export interface CalendarDayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Outside the shown month — present for the grid, quiet to the eye. */
  muted?: boolean;
  today?: boolean;
  selected?: boolean;
  children?: ReactNode;
}

export const CalendarDay = forwardRef<HTMLButtonElement, CalendarDayProps>(function CalendarDay(
  { muted, today, selected, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("b-calendar__day", muted && "is-muted", today && "is-today", selected && "is-selected", className)}
      aria-current={today ? "date" : undefined}
      aria-pressed={selected || undefined}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface EventProps extends HTMLAttributes<HTMLDivElement> {
  /** Calendar colour — how one stream is told from another at a glance. */
  tone?: "green" | "orange" | "purple";
  children?: ReactNode;
}

export const Event = forwardRef<HTMLDivElement, EventProps>(function Event(
  { tone, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-event", tone && `b-event--${tone}`, className)} {...rest}>
      {children}
    </div>
  );
});

/* ---- Combobox and search ------------------------------------------------- */

export const Combobox = block("div", "b-combobox", "Combobox");
export const ComboboxList = block("ul", "b-combobox__list", "ComboboxList");
export const ComboboxEmpty = block("li", "b-combobox__empty", "ComboboxEmpty");
export const SearchResults = block("div", "b-search-results", "SearchResults");

export interface ComboboxOptionProps extends HTMLAttributes<HTMLLIElement> {
  selected?: boolean;
  children?: ReactNode;
}

export const ComboboxOption = forwardRef<HTMLLIElement, ComboboxOptionProps>(function ComboboxOption(
  { selected, className, children, ...rest },
  ref
) {
  return (
    <li
      ref={ref}
      role="option"
      aria-selected={selected}
      className={cn("b-combobox__option", selected && "is-active", className)}
      {...rest}
    >
      {children}
    </li>
  );
});

export interface SearchResultProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "title"> {
  title: ReactNode;
  /** Matched text — wrap the hit in <mark>. */
  snippet?: ReactNode;
  /** Where it lives, so the same title in two places is still distinguishable. */
  path?: ReactNode;
  href?: string;
}

export const SearchResult = forwardRef<HTMLAnchorElement, SearchResultProps>(function SearchResult(
  { title, snippet, path, className, ...rest },
  ref
) {
  return (
    <a ref={ref} className={cn("b-search-result", className)} {...rest}>
      <span className="b-search-result__title">{title}</span>
      {snippet ? <span className="b-search-result__snippet">{snippet}</span> : null}
      {path ? <span className="b-search-result__path">{path}</span> : null}
    </a>
  );
});

/* ---- Media --------------------------------------------------------------- */

export const Carousel = block("div", "b-carousel", "Carousel");
export const CarouselTrack = block("div", "b-carousel__track", "CarouselTrack");
export const CarouselSlide = block("div", "b-carousel__slide", "CarouselSlide");
export const CarouselDots = block("div", "b-carousel__dots", "CarouselDots");
export const Gallery = block("div", "b-gallery", "Gallery");
export const ImageViewer = block("div", "b-image-viewer", "ImageViewer");
export const ImageViewerBar = block("div", "b-image-viewer__bar", "ImageViewerBar");
export const UploadPreviews = block("div", "b-upload-previews", "UploadPreviews");
export const UploadPreview = block("div", "b-upload-preview", "UploadPreview");

export interface LightboxProps extends HTMLAttributes<HTMLDialogElement> {
  caption?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export const Lightbox = forwardRef<HTMLDialogElement, LightboxProps>(function Lightbox(
  { caption, actions, className, children, ...rest },
  ref
) {
  return (
    <dialog ref={ref} className={cn("b-lightbox", className)} {...rest}>
      <div className="b-lightbox__frame">{children}</div>
      {caption ? <div className="b-lightbox__caption">{caption}</div> : null}
      {actions ? <div className="b-lightbox__actions">{actions}</div> : null}
    </dialog>
  );
});

/* ---- Accounts, rails and the rest ---------------------------------------- */

export const AccountSwitcher = block("div", "b-account-switcher", "AccountSwitcher");
export const CommandCenter = block("div", "b-command-center", "CommandCenter");
export const Gantt = block("div", "b-gantt", "Gantt");
export const GanttRow = block("div", "b-gantt__row", "GanttRow");
export const GanttBar = block("div", "b-gantt__bar", "GanttBar");
export const HoverCardHost = block("span", "b-hover-card-host", "HoverCardHost");
export const GlassInteractive = block("div", "b-glass-interactive", "GlassInteractive");

export interface RailProps extends HTMLAttributes<HTMLElement> {
  material?: "glass";
  children?: ReactNode;
}

/** Icon-width navigation for when a sidebar costs too much room. */
export const Rail = forwardRef<HTMLElement, RailProps>(function Rail(
  { material, className, children, ...rest },
  ref
) {
  return (
    <nav ref={ref} className={cn("b-rail", material && `b-rail--${material}`, className)} {...rest}>
      {children}
    </nav>
  );
});

export const RailItem = block("a", "b-rail__item", "RailItem");

export interface AccountProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  name: ReactNode;
  email?: ReactNode;
  /** Marks the account in use. */
  current?: boolean;
  children?: ReactNode;
}

export const Account = forwardRef<HTMLDivElement, AccountProps>(function Account(
  { name, email, current, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-account", className)} {...rest}>
      {children}
      <span className="b-account__meta">
        <span className="b-account__name">{name}</span>
        {email ? <span className="b-account__email">{email}</span> : null}
      </span>
      {current ? (
        <span className="b-account__check" aria-label="Current account">
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
            <path d="M4 10.5 8.5 15 16 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : null}
    </div>
  );
});

export interface OnboardingFeatureProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export const OnboardingFeature = forwardRef<HTMLDivElement, OnboardingFeatureProps>(
  function OnboardingFeature({ title, description, icon, className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("b-onboarding-feature", className)} {...rest}>
        {icon}
        <div>
          <div className="b-onboarding-feature__title">{title}</div>
          {description ? <p className="b-onboarding-feature__desc">{description}</p> : null}
        </div>
      </div>
    );
  }
);
