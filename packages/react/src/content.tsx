"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

type DivProps = HTMLAttributes<HTMLDivElement>;

/* ---- Card family ----------------------------------------------------------- */

export interface CardProps extends DivProps {
  variant?: "default" | "glass" | "elevated" | "flat" | "accent";
  interactive?: boolean;
  /** iOS Settings group: zero body padding for flush lists. */
  flush?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "default", interactive, flush, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "b-card",
        variant !== "default" && `b-card--${variant}`,
        interactive && "b-card--interactive",
        flush && "b-card--flush",
        className
      )}
      {...rest}
    />
  );
});

export const CardHeader = (p: DivProps) => <div {...p} className={cn("b-card__header", p.className)} />;
export const CardBody = (p: DivProps) => <div {...p} className={cn("b-card__body", p.className)} />;
export const CardFooter = (p: DivProps) => <div {...p} className={cn("b-card__footer", p.className)} />;
export const CardTitle = (p: DivProps) => <div {...p} className={cn("b-card__title", p.className)} />;
export const CardSubtitle = (p: DivProps) => <div {...p} className={cn("b-card__subtitle", p.className)} />;
export const CardEyebrow = (p: DivProps) => <div {...p} className={cn("b-card__eyebrow", p.className)} />;

/** App-Store "Today" story card. Provide media via style backgroundImage or children. */
export function StoryCard({
  media,
  eyebrow,
  title,
  subtitle,
  className,
  ...rest
}: {
  media?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
} & DivProps) {
  return (
    <div className={cn("b-card b-card--media-overlay", className)} {...rest}>
      <div className="b-card__media">{media}</div>
      <div className="b-card__overlay">
        {eyebrow && <div className="b-card__eyebrow">{eyebrow}</div>}
        <div className="b-card__title">{title}</div>
        {subtitle && <div className="b-card__subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}

/* ---- Badges / chips --------------------------------------------------------- */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "solid" | "count";
  dot?: boolean;
}

export function Badge({ variant = "default", dot, className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn("b-badge", variant !== "default" && `b-badge--${variant}`, dot && "b-badge--dot", className)}
      {...rest}
    />
  );
}

export function Tag(p: HTMLAttributes<HTMLSpanElement>) {
  return <span {...p} className={cn("b-tag", p.className)} />;
}

export interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onRemove?: () => void;
}

export function Chip({ selected, onRemove, className, children, ...rest }: ChipProps) {
  return (
    <button type="button" className={cn("b-chip", selected && "is-selected", className)} aria-pressed={selected} {...rest}>
      {children}
      {onRemove && (
        <span
          role="button"
          aria-label="Remove"
          className="b-chip__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          ✕
        </span>
      )}
    </button>
  );
}

/* ---- Avatar ------------------------------------------------------------------ */

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  src?: string;
  alt?: string;
  online?: boolean;
  square?: boolean;
  children?: ReactNode;
}

export function Avatar({ size = "md", src, alt, online, square, className, children, ...rest }: AvatarProps) {
  return (
    <span
      className={cn(
        "b-avatar",
        size !== "md" && `b-avatar--${size}`,
        online && "b-avatar--online",
        square && "b-avatar--square",
        className
      )}
      {...rest}
    >
      {src ? <img src={src} alt={alt ?? ""} /> : children}
    </span>
  );
}

export function AvatarGroup(p: HTMLAttributes<HTMLSpanElement>) {
  return <span {...p} className={cn("b-avatar-group", p.className)} />;
}

/* ---- Icon tile ---------------------------------------------------------------- */

export interface IconTileProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "accent" | "solid" | "green" | "orange" | "red" | "purple" | "teal" | "indigo" | "gray";
  small?: boolean;
}

export function IconTile({ color = "accent", small, className, ...rest }: IconTileProps) {
  return (
    <span
      className={cn(
        "b-icon-tile",
        small && "b-icon-tile--sm",
        color !== "accent" && `b-icon-tile--${color}`,
        className
      )}
      {...rest}
    />
  );
}

/* ---- List --------------------------------------------------------------------- */

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  plain?: boolean;
  insetDividers?: boolean;
}

export function List({ plain, insetDividers, className, ...rest }: ListProps) {
  return (
    <ul
      className={cn("b-list", plain && "b-list--plain", insetDividers && "b-list--inset-divider", className)}
      {...rest}
    />
  );
}

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  leading?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  chevron?: boolean;
  interactive?: boolean;
  selected?: boolean;
}

export function ListItem({
  leading,
  title,
  subtitle,
  trailing,
  chevron,
  interactive,
  selected,
  className,
  children,
  ...rest
}: ListItemProps) {
  return (
    <li
      className={cn("b-list-item", interactive && "b-list-item--interactive", selected && "is-selected", className)}
      {...rest}
    >
      {leading && <span className="b-list-item__leading">{leading}</span>}
      <span className="b-list-item__content">
        {title && <span className="b-list-item__title">{title}</span>}
        {subtitle && <span className="b-list-item__subtitle">{subtitle}</span>}
        {children}
      </span>
      {(trailing || chevron) && (
        <span className="b-list-item__trailing">
          {trailing}
          {chevron && <span className="b-list-item__chevron">›</span>}
        </span>
      )}
    </li>
  );
}

/* ---- Stat / Empty state --------------------------------------------------------- */

export function Stat({
  label,
  value,
  delta,
  direction,
  className,
  ...rest
}: {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  direction?: "up" | "down";
} & DivProps) {
  return (
    <div className={cn("b-stat", className)} {...rest}>
      <span className="b-stat__label">{label}</span>
      <span className="b-stat__value">{value}</span>
      {delta && (
        <span className={cn("b-stat__delta", direction === "up" && "is-up", direction === "down" && "is-down")}>
          {delta}
        </span>
      )}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
} & DivProps) {
  return (
    <div className={cn("b-empty", className)} {...rest}>
      {icon && <span className="b-empty__icon">{icon}</span>}
      <div className="b-empty__title">{title}</div>
      {description && <p className="b-empty__desc">{description}</p>}
      {action}
    </div>
  );
}

/* ---- GroupBox / LabeledContent (SwiftUI) ------------------------------------ */

export function GroupBox({
  label,
  icon,
  className,
  children,
  ...rest
}: { label?: ReactNode; icon?: ReactNode } & DivProps) {
  return (
    <div className={cn("b-groupbox", className)} {...rest}>
      {label && (
        <div className="b-groupbox__label">
          {icon}
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export function Labeled({
  label,
  sublabel,
  className,
  children,
  ...rest
}: { label: ReactNode; sublabel?: ReactNode } & DivProps) {
  return (
    <div className={cn("b-labeled", className)} {...rest}>
      <span className="b-labeled__label">
        {label}
        {sublabel && <small>{sublabel}</small>}
      </span>
      <span className="b-labeled__value">{children}</span>
    </div>
  );
}

export const ListHeader = (p: DivProps) => <div {...p} className={cn("b-list__header", p.className)} />;
export const ListFooter = (p: DivProps) => <div {...p} className={cn("b-list__footer", p.className)} />;
