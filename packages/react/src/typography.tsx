"use client";

import { Fragment, forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export type TextRole =
  | "large-title" | "title1" | "title2" | "title3"
  | "headline" | "subheadline" | "body" | "callout"
  | "caption" | "caption2" | "overline";

/** Each role carries its own size, weight, line-height and tracking. */
const ROLE_TAG: Record<TextRole, ElementType> = {
  "large-title": "h1", title1: "h1", title2: "h2", title3: "h3",
  headline: "h4", subheadline: "p", body: "p", callout: "p",
  caption: "span", caption2: "span", overline: "span",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  role?: TextRole;
  as?: ElementType;
  tone?: "secondary" | "tertiary" | "quaternary" | "accent" | "danger" | "success" | "warning";
  align?: "start" | "center" | "end";
  truncate?: boolean;
  /** Clamp to a fixed number of lines. */
  clamp?: 2 | 3;
  /** Line up digits in columns — use for money and any table of numbers. */
  tabularNums?: boolean;
  children?: ReactNode;
}

/**
 * Type is a role, not a size. Pick the role that describes the job and the
 * metrics follow — never restate a font-size in a product.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { role = "body", as, tone, align, truncate, clamp, tabularNums, className, children, ...rest },
  ref
) {
  const Component = (as ?? ROLE_TAG[role]) as ElementType;
  return (
    <Component
      ref={ref}
      className={cn(
        `b-${role}`,
        tone && `b-text-${tone}`,
        align && `b-text-${align}`,
        truncate && "b-truncate",
        clamp && `b-line-clamp-${clamp}`,
        tabularNums && "b-tabular-nums",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

export const Link = block("a", "b-link", "Link");
export const LinkGroup = block("div", "b-link-group", "LinkGroup");
export const Kbd = block("span", "b-kbd", "Kbd");
export const Overline = block("span", "b-overline", "Overline");
export const Footnote = block("p", "b-footnote", "Footnote");
export const Footnotes = block("div", "b-footnotes", "Footnotes");

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  /** Attribution — rendered as the <cite>. */
  cite?: ReactNode;
  children?: ReactNode;
}

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(function Quote(
  { cite, className, children, ...rest },
  ref
) {
  return (
    <blockquote ref={ref} className={cn("b-quote", className)} {...rest}>
      <p>{children}</p>
      {cite ? <cite>{cite}</cite> : null}
    </blockquote>
  );
});

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Caption in the header strip. */
  title?: ReactNode;
  /** Renders a copy button that lifts the code out of the block. */
  copy?: boolean;
  copyLabel?: string;
  children?: ReactNode;
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  { title, copy, copyLabel = "Copy", className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-code", className)} {...rest}>
      {title || copy ? (
        <div className="b-code__header">
          <span>{title}</span>
          {copy ? (
            <button
              type="button"
              className="b-code__copy"
              onClick={(event) => {
                const pre = event.currentTarget.closest(".b-code")?.querySelector("code");
                if (pre?.textContent) void navigator.clipboard.writeText(pre.textContent);
              }}
            >
              {copyLabel}
            </button>
          ) : null}
        </div>
      ) : null}
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
});

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  /** Label above value instead of beside it — better in narrow columns. */
  stacked?: boolean;
  items?: Array<{ term: ReactNode; description: ReactNode }>;
  children?: ReactNode;
}

/** Term-and-value pairs: the shape of every detail panel and receipt. */
export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList({ stacked, items, className, children, ...rest }, ref) {
    return (
      <dl ref={ref} className={cn("b-dl", stacked && "b-dl--stacked", className)} {...rest}>
        {items
          ? items.map((item, i) => (
              <Fragment key={i}>
                <dt>{item.term}</dt>
                <dd>{item.description}</dd>
              </Fragment>
            ))
          : children}
      </dl>
    );
  }
);
