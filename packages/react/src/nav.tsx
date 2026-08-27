import { useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

/* ---- Segmented control -------------------------------------------------------- */

export interface SegmentedOption<T extends string> {
  label: ReactNode;
  value: T;
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  block,
  label,
  className,
  ...rest
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  block?: boolean;
  label?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("b-segmented", block && "b-segmented--block", className)}
      {...rest}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={cn("b-segmented__item", o.value === value && "is-active")}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---- Tabs ----------------------------------------------------------------------- */

export interface TabItem<T extends string> {
  id: T;
  label: ReactNode;
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  className,
  ...rest
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">) {
  const id = useId();
  return (
    <div role="tablist" className={cn("b-tabs", className)} {...rest}>
      {items.map((t, i) => (
        <button
          key={t.id}
          role="tab"
          id={`${id}-tab-${t.id}`}
          aria-selected={t.id === value}
          aria-controls={`${id}-panel-${t.id}`}
          tabIndex={t.id === value ? 0 : -1}
          className="b-tab"
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
            if (!dir) return;
            e.preventDefault();
            const next = items[(i + dir + items.length) % items.length];
            onChange(next.id);
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function TabPanel({
  active,
  className,
  ...rest
}: { active: boolean } & HTMLAttributes<HTMLDivElement>) {
  return <div role="tabpanel" hidden={!active} className={cn("b-tabpanel", className)} {...rest} />;
}

/* ---- Breadcrumbs ------------------------------------------------------------------ */

export interface Crumb {
  label: ReactNode;
  href?: string;
}

export function Breadcrumbs({
  items,
  className,
  ...rest
}: { items: Crumb[] } & HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Breadcrumb" {...rest}>
      <ol className={cn("b-breadcrumbs", className)}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {c.href && !last ? (
                <a href={c.href}>{c.label}</a>
              ) : (
                <span aria-current={last ? "page" : undefined}>{c.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
