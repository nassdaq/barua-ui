"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export const Auth = block("div", "b-auth", "Auth");
export const Onboarding = block("div", "b-onboarding", "Onboarding");
export const OnboardingHero = block("div", "b-onboarding__hero", "OnboardingHero");
export const AppGrid = block("div", "b-app-grid", "AppGrid");
export const AppTile = block("a", "b-app-tile", "AppTile");
export const Callout = block("p", "b-callout", "Callout");
export const Notification = block("div", "b-notification", "Notification");
export const Wall = block("div", "b-wall", "Wall");
export const GlassContainer = block("div", "b-glass-container", "GlassContainer");

export interface AuthCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  logo?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

/** The sign-in surface: one card, one job, nothing else on the screen. */
export const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(function AuthCard(
  { logo, title, subtitle, footer, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-auth-card", className)} {...rest}>
      {logo ? <div className="b-auth-card__logo" aria-hidden="true">{logo}</div> : null}
      {title ? <div className="b-auth-card__title">{title}</div> : null}
      {subtitle ? <div className="b-auth-card__subtitle">{subtitle}</div> : null}
      {children}
      {footer ? <div className="b-auth-card__footer">{footer}</div> : null}
    </div>
  );
});

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: "success" | "warning" | "error" | "confirm";
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

/** The end of a flow — what happened, and the one thing to do next. */
export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  { tone, icon, title, description, actions, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-result", tone && `b-result--${tone}`, className)} {...rest}>
      {icon ? <div className="b-result__icon" aria-hidden="true">{icon}</div> : null}
      {title ? <div className="b-result__title">{title}</div> : null}
      {description ? <p className="b-result__desc">{description}</p> : null}
      {children}
      {actions ? <div className="b-result__actions">{actions}</div> : null}
    </div>
  );
});

export interface SysPageProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** The status — 404, 500, offline. */
  code?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export const SysPage = forwardRef<HTMLDivElement, SysPageProps>(function SysPage(
  { code, title, description, actions, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-syspage", className)} {...rest}>
      {code ? <div className="b-syspage__code">{code}</div> : null}
      {title ? <div className="b-syspage__title">{title}</div> : null}
      {description ? <p className="b-syspage__desc">{description}</p> : null}
      {children}
      {actions ? <div className="b-syspage__actions">{actions}</div> : null}
    </div>
  );
});

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Quieter treatment for anything that is not news. */
  neutral?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  children?: ReactNode;
}

/** Page-width announcement. One at a time, and always dismissible. */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { neutral, onDismiss, dismissLabel = "Dismiss", className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-banner", neutral && "b-banner--neutral", className)} role="status" {...rest}>
      <span>{children}</span>
      {onDismiss ? (
        <button type="button" className="b-banner__close" onClick={onDismiss} aria-label={dismissLabel}>
          <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
            <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
});
