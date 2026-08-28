"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

type DivProps = HTMLAttributes<HTMLDivElement>;

export interface AlertProps extends Omit<DivProps, "title"> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
}

export function Alert({ variant = "info", title, icon, onClose, className, children, ...rest }: AlertProps) {
  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      className={cn("b-alert", variant !== "info" && `b-alert--${variant}`, className)}
      {...rest}
    >
      {icon && <span className="b-alert__icon">{icon}</span>}
      <div className="b-alert__content">
        {title && <div className="b-alert__title">{title}</div>}
        {children && <div className="b-alert__desc">{children}</div>}
      </div>
      {onClose && (
        <button className="b-alert__close" aria-label="Dismiss" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
}

export interface ProgressProps extends DivProps {
  /** 0–100. Omit for indeterminate. */
  value?: number;
  size?: "sm" | "md" | "lg";
  variant?: "accent" | "success" | "warning" | "danger";
  label?: string;
}

export function Progress({ value, size = "md", variant = "accent", label, className, ...rest }: ProgressProps) {
  const indeterminate = value == null;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={indeterminate ? undefined : Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "b-progress",
        size !== "md" && `b-progress--${size}`,
        variant !== "accent" && `b-progress--${variant}`,
        indeterminate && "b-progress--indeterminate",
        className
      )}
      {...rest}
    >
      <div className="b-progress__fill" style={indeterminate ? undefined : { width: `${value}%` }} />
    </div>
  );
}

export function Spinner({ size = "md", className, ...rest }: { size?: "sm" | "md" | "lg" } & DivProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("b-spinner", size !== "md" && `b-spinner--${size}`, className)}
      {...rest}
    />
  );
}

export function Skeleton({
  kind = "text",
  className,
  ...rest
}: { kind?: "text" | "title" | "circle" | "card" } & DivProps) {
  return <div aria-hidden="true" className={cn("b-skeleton", `b-skeleton--${kind}`, className)} {...rest} />;
}

export function StatusDot({
  state = "neutral",
  pulse,
  className,
  children,
  ...rest
}: { state?: "neutral" | "online" | "busy" | "away"; pulse?: boolean } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("b-status", state !== "neutral" && `b-status--${state}`, pulse && "b-status--pulse", className)}
      {...rest}
    >
      {children}
    </span>
  );
}

/* ---- Tip (TipKit-style callout) ---------------------------------------------- */

export function Tip({
  icon,
  title,
  description,
  actions,
  onClose,
  className,
  ...rest
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
} & Omit<DivProps, "title">) {
  return (
    <div className={cn("b-tip", className)} {...rest}>
      {icon && <span className="b-tip__icon">{icon}</span>}
      <span className="b-tip__content">
        <span className="b-tip__title">{title}</span>
        {description && <span className="b-tip__desc">{description}</span>}
        {actions && <span className="b-tip__actions">{actions}</span>}
      </span>
      {onClose && (
        <button className="b-tip__close" aria-label="Dismiss tip" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
}

/* ---- Linear gauge (SwiftUI Gauge, linear) ------------------------------------ */

export function LinearGauge({
  value,
  minLabel,
  maxLabel,
  plain,
  label,
  className,
  ...rest
}: {
  /** 0–100 position of the marker. */
  value: number;
  minLabel?: ReactNode;
  maxLabel?: ReactNode;
  plain?: boolean;
  label?: string;
} & DivProps) {
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("b-gauge-linear", className)}
      {...rest}
    >
      <div className={cn("b-gauge-linear__track", plain && "b-gauge-linear__track--plain")}>
        <span className="b-gauge-linear__marker" style={{ "--v": `${value}%` } as CSSProperties} />
      </div>
      {(minLabel != null || maxLabel != null) && (
        <div className="b-gauge-linear__labels">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
