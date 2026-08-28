"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

/** The page frame for a marketing surface — sets the rhythm every chapter follows. */
export const Landing = block("div", "b-landing", "Landing");
export const SpecStrip = block("div", "b-spec-strip", "SpecStrip");
export const CardRail = block("div", "b-card-rail", "CardRail");
export const SiteFooter = block("footer", "b-site-footer", "SiteFooter");
export const SiteFooterGroups = block("div", "b-site-footer__groups", "SiteFooterGroups");
export const SiteFooterGroup = block("div", "b-site-footer__group", "SiteFooterGroup");
export const SiteFooterHeading = block("div", "b-site-footer__heading", "SiteFooterHeading");
export const SiteFooterLegal = block("div", "b-site-footer__legal", "SiteFooterLegal");

export interface ChapterProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** One sentence under the title. Resist writing two. */
  lede?: ReactNode;
  actions?: ReactNode;
  /** Less vertical air, for chapters that run in a series. */
  tight?: boolean;
  /** Left-aligned instead of centred. */
  start?: boolean;
  /** Inverted band, for a break in the page's rhythm. */
  dark?: boolean;
  children?: ReactNode;
}

/**
 * A page is chapters. Each states one idea, in the same order every time:
 * eyebrow, title, lede, then the thing itself.
 */
export const Chapter = forwardRef<HTMLElement, ChapterProps>(function Chapter(
  { eyebrow, title, lede, actions, tight, start, dark, className, children, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn(
        "b-chapter",
        tight && "b-chapter--tight",
        start && "b-chapter--start",
        dark && "b-chapter--dark",
        className
      )}
      {...rest}
    >
      {eyebrow ? <p className="b-chapter__eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="b-chapter__title">{title}</h2> : null}
      {lede ? <p className="b-chapter__lede">{lede}</p> : null}
      {actions ? <div className="b-chapter__actions">{actions}</div> : null}
      {children}
    </section>
  );
});

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  /** Image or video that fills the frame. */
  media?: ReactNode;
  children?: ReactNode;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { title, media, className, children, ...rest },
  ref
) {
  return (
    <section ref={ref} className={cn("b-hero", className)} {...rest}>
      {title ? <h1 className="b-hero__title">{title}</h1> : null}
      {children}
      {media ? <div className="b-hero__media">{media}</div> : null}
    </section>
  );
});

export interface FigureProps extends HTMLAttributes<HTMLElement> {
  caption?: ReactNode;
  /** Break the measure and run to the page edges. */
  bleed?: boolean;
  children?: ReactNode;
}

/** Media in a frame that holds its aspect, so a row of them lines up. */
export const Figure = forwardRef<HTMLElement, FigureProps>(function Figure(
  { caption, bleed, className, children, ...rest },
  ref
) {
  return (
    <figure ref={ref} className={cn("b-figure", bleed && "b-figure--bleed", className)} {...rest}>
      <div className="b-figure__frame">{children}</div>
      {caption ? <figcaption className="b-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
});

export interface FeatureRowProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  body?: ReactNode;
  media?: ReactNode;
  /** Put the media on the other side — alternate down the page. */
  flip?: boolean;
  children?: ReactNode;
}

export const FeatureRow = forwardRef<HTMLElement, FeatureRowProps>(function FeatureRow(
  { title, body, media, flip, className, children, ...rest },
  ref
) {
  return (
    <section ref={ref} className={cn("b-feature-row", flip && "b-feature-row--flip", className)} {...rest}>
      <div>
        {title ? <h3 className="b-feature-row__title">{title}</h3> : null}
        {body ? <div className="b-feature-row__body">{body}</div> : null}
        {children}
      </div>
      {media}
    </section>
  );
});

export interface PromoBandProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
}

export const PromoBand = forwardRef<HTMLElement, PromoBandProps>(function PromoBand(
  { title, body, className, children, ...rest },
  ref
) {
  return (
    <section ref={ref} className={cn("b-promo-band", className)} {...rest}>
      {title ? <div className="b-promo-band__title">{title}</div> : null}
      {body ? <div className="b-promo-band__body">{body}</div> : null}
      {children}
    </section>
  );
});
