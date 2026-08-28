"use client";

import { forwardRef, type HTMLAttributes, type TableHTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hover?: boolean;
  compact?: boolean;
  /** Wrap in the scroll container that keeps a wide table from breaking the page. */
  wrap?: boolean;
  children?: ReactNode;
}

/**
 * Tables are the one place horizontal scrolling is allowed, and only inside
 * the wrapper — never the page itself.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped, hover, compact, wrap = true, className, children, ...rest },
  ref
) {
  const table = (
    <table
      ref={ref}
      className={cn(
        "b-table",
        striped && "b-table--striped",
        hover && "b-table--hover",
        compact && "b-table--compact",
        className
      )}
      {...rest}
    >
      {children}
    </table>
  );
  return wrap ? <div className="b-table-wrap">{table}</div> : table;
});

export const TableWrap = block("div", "b-table-wrap", "TableWrap");

/** Right-aligned, tabular figures. Every number column wants this. */
export const TableNum = block("td", "b-table__num", "TableNum");

export interface SortHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  direction?: "asc" | "desc" | null;
  children?: ReactNode;
}

export const TableSortHeader = forwardRef<HTMLTableCellElement, SortHeaderProps>(
  function TableSortHeader({ direction = null, className, children, ...rest }, ref) {
    return (
      <th
        ref={ref}
        className={cn("b-table__sort", direction && `is-${direction}`, className)}
        aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
        {...rest}
      >
        {children}
      </th>
    );
  }
);

export interface GaugeProps extends Omit<HTMLAttributes<HTMLDivElement>, "label" | "value"> {
  /** 0–100. */
  value: number;
  label?: ReactNode;
  /** Text in the middle; defaults to the value as a percentage. */
  display?: ReactNode;
}

export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(function Gauge(
  { value, label, display, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("b-gauge", className)}
      style={{ ["--b-progress" as string]: value, ...style }}
      role="img"
      aria-label={typeof label === "string" ? `${label}: ${value}%` : `${value}%`}
      {...rest}
    >
      <div className="b-gauge__value">{display ?? `${value}%`}</div>
      {label ? <div className="b-gauge__label">{label}</div> : null}
    </div>
  );
});

export interface DonutSlice {
  /** Chart token index 1–8, or any CSS colour. */
  color: string;
  /** Share of the whole, 0–100. */
  value: number;
  label?: string;
}

export interface DonutProps extends Omit<HTMLAttributes<HTMLDivElement>, "label" | "value"> {
  slices: DonutSlice[];
  /** Big figure in the hole. */
  value?: ReactNode;
  label?: ReactNode;
  /** States the takeaway for assistive tech. */
  description?: string;
}

/** Composition over parts: a donut is a pie with a labelled hole. */
export const Donut = forwardRef<HTMLDivElement, DonutProps>(function Donut(
  { slices, value, label, description, className, ...rest },
  ref
) {
  let at = 0;
  const stops = slices
    .map((s) => {
      const from = at;
      at += s.value;
      const color = /^\d$/.test(s.color) ? `var(--b-chart-${s.color})` : s.color;
      return `${color} ${from}% ${at}%`;
    })
    .join(", ");
  return (
    <div ref={ref} className={cn("b-donut", className)} {...rest}>
      <div
        className="b-pie"
        style={{ ["--b-pie" as string]: stops }}
        role="img"
        aria-label={description ?? slices.map((s) => `${s.label}: ${s.value}%`).join(", ")}
      />
      <div className="b-donut__center">
        {value ? <div className="b-stat__value">{value}</div> : null}
        {label ? <div className="b-stat__label">{label}</div> : null}
      </div>
    </div>
  );
});

export interface SparklineProps extends HTMLAttributes<SVGSVGElement> {
  /** Raw numbers — scaled to the box for you. */
  points: number[];
}

/** A word-sized trend, for stat cards and table rows. */
export const Sparkline = forwardRef<SVGSVGElement, SparklineProps>(function Sparkline(
  { points, className, ...rest },
  ref
) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / Math.max(points.length - 1, 1)) * 100;
      const y = 22 - ((p - min) / span) * 20;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      ref={ref}
      className={cn("b-sparkline", className)}
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
});

export interface LegendItem {
  label: ReactNode;
  /** Chart token index 1–8, or any CSS colour. */
  color?: string;
}

export interface LegendProps extends HTMLAttributes<HTMLUListElement> {
  items: LegendItem[];
}

export const Legend = forwardRef<HTMLUListElement, LegendProps>(function Legend(
  { items, className, ...rest },
  ref
) {
  return (
    <ul ref={ref} className={cn("b-legend", className)} {...rest}>
      {items.map((item, i) => (
        <li key={i}>
          <span
            className="b-legend__swatch"
            style={
              item.color
                ? { background: /^\d$/.test(item.color) ? `var(--b-chart-${item.color})` : item.color }
                : undefined
            }
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
});

export interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  data: Array<{ label: string; value: number }>;
  /** Top of the scale; defaults to the largest value. */
  max?: number;
  rounded?: boolean;
  /** Height ceiling, so a tall column never drags the card with it. */
  height?: string;
  description?: string;
}

/** CSS column chart — no runtime, no canvas, and it prints correctly. */
export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(function Columns(
  { data, max, rounded, height, className, style, description, ...rest },
  ref
) {
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div
      ref={ref}
      className={cn("b-columns", rounded && "b-columns--rounded", className)}
      style={{ ...(height ? { ["--b-chart-h" as string]: height } : null), ...style }}
      role="img"
      aria-label={description ?? data.map((d) => `${d.label}: ${d.value}`).join(", ")}
      {...rest}
    >
      {data.map((d, i) => (
        <div
          key={i}
          className="b-columns__bar"
          data-label={d.label}
          style={{ ["--v" as string]: `${Math.round((d.value / top) * 100)}%` }}
        />
      ))}
    </div>
  );
});

export interface BarsProps extends HTMLAttributes<HTMLDivElement> {
  data: Array<{ label: ReactNode; value: number; display?: ReactNode }>;
  max?: number;
  description?: string;
}

/** Horizontal bars — the right shape when the labels are words, not dates. */
export const Bars = forwardRef<HTMLDivElement, BarsProps>(function Bars(
  { data, max, description, className, ...rest },
  ref
) {
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div
      ref={ref}
      className={cn("b-bars", className)}
      role="img"
      aria-label={description ?? data.map((d) => `${d.label}: ${d.value}`).join(", ")}
      {...rest}
    >
      {data.map((d, i) => (
        <div key={i} className="b-bars__row">
          <span className="b-bars__label">{d.label}</span>
          <div className="b-bars__track">
            <i style={{ ["--v" as string]: `${Math.round((d.value / top) * 100)}%` }} />
          </div>
          <span className="b-bars__value">{d.display ?? d.value}</span>
        </div>
      ))}
    </div>
  );
});

export const Chart = block("figure", "b-chart", "Chart");
export const ChartTip = block("div", "b-chart-tip", "ChartTip");
export const Heatmap = block("div", "b-heatmap", "Heatmap");
