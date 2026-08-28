"use client";

import { useEffect, useRef, type DialogHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

/* ---- Modal ------------------------------------------------------------------ */

interface DialogBaseProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "title"> {
  open: boolean;
  onClose?: () => void;
  /** Close when the backdrop is clicked (default true). */
  dismissable?: boolean;
}

function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);
  return ref;
}

function backdropClose(onClose?: () => void, dismissable = true) {
  return (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!dismissable || !onClose) return;
    if (e.target === e.currentTarget) onClose();
  };
}

export interface ModalProps extends DialogBaseProps {
  title?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  glass?: boolean;
  children: ReactNode;
}

export function Modal({
  open,
  onClose,
  dismissable = true,
  title,
  footer,
  size = "md",
  glass,
  className,
  children,
  ...rest
}: ModalProps) {
  const ref = useDialog(open);
  return (
    <dialog
      ref={ref}
      onClose={() => onClose?.()}
      onClick={backdropClose(onClose, dismissable)}
      className={cn("b-modal", size !== "md" && `b-modal--${size}`, glass && "b-modal--glass", className)}
      {...rest}
    >
      {title != null && (
        <header className="b-modal__header">
          <h2 className="b-modal__title">{title}</h2>
          <button className="b-modal__close" aria-label="Close" onClick={() => onClose?.()}>
            ✕
          </button>
        </header>
      )}
      <div className="b-modal__body">{children}</div>
      {footer && <footer className="b-modal__footer">{footer}</footer>}
    </dialog>
  );
}

/* ---- Alert dialog ------------------------------------------------------------ */

export interface AlertDialogAction {
  label: ReactNode;
  onClick: () => void;
  destructive?: boolean;
  primary?: boolean;
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  actions,
  row,
  className,
  ...rest
}: DialogBaseProps & {
  title: ReactNode;
  description?: ReactNode;
  actions: AlertDialogAction[];
  /** Lay actions side by side (two-action Apple style). */
  row?: boolean;
}) {
  const ref = useDialog(open);
  return (
    <dialog
      ref={ref}
      onClose={() => onClose?.()}
      className={cn("b-modal b-alert-dialog", className)}
      {...rest}
    >
      <div className="b-modal__body">
        <div className="b-alert-dialog__title">{title}</div>
        {description && <p className="b-alert-dialog__desc">{description}</p>}
      </div>
      <div className={cn("b-alert-dialog__actions", row && "b-alert-dialog__actions--row")}>
        {actions.map((a, i) => (
          <button
            key={i}
            className={cn(a.destructive && "is-destructive", a.primary && "is-primary")}
            onClick={a.onClick}
          >
            {a.label}
          </button>
        ))}
      </div>
    </dialog>
  );
}

/* ---- Sheets ------------------------------------------------------------------- */

export function Sheet({
  open,
  onClose,
  dismissable = true,
  title,
  className,
  children,
  ...rest
}: DialogBaseProps & { title?: ReactNode; children: ReactNode }) {
  const ref = useDialog(open);
  return (
    <dialog
      ref={ref}
      onClose={() => onClose?.()}
      onClick={backdropClose(onClose, dismissable)}
      className={cn("b-sheet", className)}
      {...rest}
    >
      {title != null && (
        <header className="b-sheet__header">
          <h2 className="b-modal__title">{title}</h2>
          <button className="b-modal__close" aria-label="Close" onClick={() => onClose?.()}>
            ✕
          </button>
        </header>
      )}
      <div className="b-sheet__body">{children}</div>
    </dialog>
  );
}

export function BottomSheet({
  open,
  onClose,
  dismissable = true,
  detent,
  className,
  children,
  ...rest
}: DialogBaseProps & { detent?: "medium" | "large"; children: ReactNode }) {
  const ref = useDialog(open);
  return (
    <dialog
      ref={ref}
      onClose={() => onClose?.()}
      onClick={backdropClose(onClose, dismissable)}
      className={cn("b-bottom-sheet", detent && `b-bottom-sheet--${detent}`, className)}
      {...rest}
    >
      <div className="b-bottom-sheet__grabber" aria-hidden="true" />
      <div className="b-bottom-sheet__body">{children}</div>
    </dialog>
  );
}

/* ---- Popover / Tooltip --------------------------------------------------------- */

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  /** Apple-style caret pointing at the anchor. */
  arrow?: "top" | "bottom" | "start" | "end";
  /** Structured header/body/footer card. */
  card?: boolean;
  anchored?: boolean;
  children: ReactNode;
}

/** Presentation-only popover panel — pair with the native Popover API or
 *  render inside a relatively positioned wrapper. */
export function Popover({ title, arrow, card, anchored, className, children, ...rest }: PopoverProps) {
  return (
    <div
      className={cn(
        "b-popover",
        arrow && `b-popover--arrow-${arrow}`,
        card && "b-popover--card",
        anchored && "b-popover--anchored",
        className
      )}
      {...rest}
    >
      {title && !card && <div className="b-popover__title">{title}</div>}
      {children}
    </div>
  );
}

export function Tooltip({
  label,
  below,
  className,
  children,
  ...rest
}: { label: string; below?: boolean } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-tooltip={label}
      className={cn("b-tooltip-host", below && "b-tooltip-host--bottom", className)}
      {...rest}
    >
      {children}
    </span>
  );
}

/* ---- Action sheet (SwiftUI confirmationDialog) -------------------------------- */

export interface ActionSheetAction {
  label: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

export function ActionSheet({
  open,
  onClose,
  title,
  actions,
  cancelLabel = "Cancel",
  className,
  ...rest
}: DialogBaseProps & {
  title?: ReactNode;
  actions: ActionSheetAction[];
  cancelLabel?: ReactNode;
}) {
  const ref = useDialog(open);
  return (
    <dialog ref={ref} onClose={() => onClose?.()} className={cn("b-action-sheet", className)} {...rest}>
      <div className="b-action-sheet__group">
        {title && <p className="b-action-sheet__title">{title}</p>}
        {actions.map((a, i) => (
          <button key={i} className={cn(a.destructive && "is-destructive")} onClick={a.onClick}>
            {a.label}
          </button>
        ))}
      </div>
      <div className="b-action-sheet__group b-action-sheet__cancel">
        <button onClick={() => onClose?.()}>{cancelLabel}</button>
      </div>
    </dialog>
  );
}
