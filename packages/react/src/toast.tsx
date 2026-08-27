import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";

export type ToastVariant = "info" | "success" | "warning" | "danger";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  /** ms before auto-dismiss; 0 disables */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastItem extends ToastOptions {
  id: number;
  leaving?: boolean;
}

const ToastContext = createContext<((opts: ToastOptions) => void) | null>(null);

const ICONS: Record<ToastVariant, ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" /><path d="m6.5 10.3 2.3 2.3 4.7-5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  danger: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v5m0 3v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 3.5 18 17H2L10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 8.5v3.5m0 2.2v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" /><path d="M10 9v5m0-8v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
};

/** Imperative toast API. Must be used inside <BaruaProvider> (or <ToastProvider>). */
export function useToast() {
  const push = useContext(ToastContext);
  if (!push) throw new Error("useToast must be used within <BaruaProvider>");
  return push;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 260);
  }, []);

  const push = useCallback(
    (opts: ToastOptions) => {
      const id = nextId.current++;
      setItems((list) => [...list, { id, variant: "info", duration: 4000, ...opts }]);
      const duration = opts.duration ?? 4000;
      if (duration > 0) setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const region = useMemo(
    () =>
      typeof document === "undefined"
        ? null
        : createPortal(
            <div className="b-toast-region" aria-live="polite">
              {items.map((t) => (
                <div
                  key={t.id}
                  role="status"
                  className={cn("b-toast", `b-toast--${t.variant}`, t.leaving && "is-leaving")}
                >
                  <span className="b-toast__icon">{ICONS[t.variant ?? "info"]}</span>
                  <div className="b-toast__content">
                    {t.title && <div className="b-toast__title">{t.title}</div>}
                    {t.description && <div className="b-toast__desc">{t.description}</div>}
                  </div>
                  {t.action && (
                    <button
                      className="b-toast__action"
                      onClick={() => {
                        t.action?.onClick();
                        dismiss(t.id);
                      }}
                    >
                      {t.action.label}
                    </button>
                  )}
                </div>
              ))}
            </div>,
            document.body
          ),
    [items, dismiss]
  );

  return (
    <ToastContext.Provider value={push}>
      {children}
      {region}
    </ToastContext.Provider>
  );
}
