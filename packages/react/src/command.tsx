"use client";

import { forwardRef, type DialogHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export const CommandList = block("ul", "b-cmdk__list", "CommandList");
export const CommandGroupLabel = block("li", "b-cmdk__group-label", "CommandGroupLabel");
export const CommandFooter = block("footer", "b-cmdk__footer", "CommandFooter");
export const HoverCard = block("div", "b-hover-card", "HoverCard");

export interface CommandPaletteProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children?: ReactNode;
}

/**
 * ⌘K, on the platform dialog: the browser handles the top layer, the backdrop
 * and Escape, so none of that has to be re-implemented.
 */
export const CommandPalette = forwardRef<HTMLDialogElement, CommandPaletteProps>(
  function CommandPalette({ className, children, ...rest }, ref) {
    return (
      <dialog ref={ref} className={cn("b-modal b-cmdk", className)} {...rest}>
        {children}
      </dialog>
    );
  }
);

export const CommandInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function CommandInput({ className, ...rest }, ref) {
    return <input ref={ref} type="search" className={cn("b-cmdk__input", className)} {...rest} />;
  }
);

export interface CommandItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Keyboard-highlighted row. Follows the arrow keys, not the mouse. */
  active?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const CommandItem = forwardRef<HTMLButtonElement, CommandItemProps>(function CommandItem(
  { active, icon, className, children, ...rest },
  ref
) {
  return (
    <li>
      <button
        ref={ref}
        type="button"
        className={cn("b-cmdk__item", active && "is-active", className)}
        aria-selected={active}
        {...rest}
      >
        {icon}
        {children}
      </button>
    </li>
  );
});
