"use client";

import {
  forwardRef,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "./cn";

/* ---- Field scaffolding ---------------------------------------------------- */

export interface FieldProps {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** id passed to the control; generated when omitted. */
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, help, error, required, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("b-field", error ? "is-invalid" : undefined, className)}>
      {label && (
        <label className={cn("b-label", required && "b-label--required")} htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {help && !error && <p className="b-help">{help}</p>}
      {error && (
        <p className="b-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---- Controls -------------------------------------------------------------- */

type Density = "sm" | "md" | "lg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  filled?: boolean;
  density?: Density;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { filled, density, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "b-input",
        filled && "b-input--filled",
        density && density !== "md" && `b-input--${density}`,
        className
      )}
      {...rest}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cn("b-textarea", className)} {...rest} />;
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...rest }, ref) {
    return <select ref={ref} className={cn("b-select", className)} {...rest} />;
  }
);

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...rest },
  ref
) {
  return (
    <label className={cn("b-checkbox", className)}>
      <input ref={ref} type="checkbox" {...rest} />
      {label && <span>{label}</span>}
    </label>
  );
});

export const Radio = forwardRef<HTMLInputElement, CheckboxProps>(function Radio(
  { label, className, ...rest },
  ref
) {
  return (
    <label className={cn("b-radio", className)}>
      <input ref={ref} type="radio" {...rest} />
      {label && <span>{label}</span>}
    </label>
  );
});

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  small?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, small, className, ...rest },
  ref
) {
  return (
    <label className={cn("b-switch", small && "b-switch--sm", className)}>
      <input ref={ref} type="checkbox" role="switch" {...rest} />
      {label && <span>{label}</span>}
    </label>
  );
});

/** Range input with the accent fill synced to its value. */
export const Slider = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Slider({ className, onInput, ...rest }, ref) {
    return (
      <input
        ref={ref}
        type="range"
        className={cn("b-slider", className)}
        onInput={(e) => {
          const el = e.currentTarget;
          const min = Number(el.min) || 0;
          const max = Number(el.max) || 100;
          el.style.setProperty("--b-slider-fill", `${((Number(el.value) - min) / (max - min)) * 100}%`);
          onInput?.(e);
        }}
        {...rest}
      />
    );
  }
);

/* ---- OTP ------------------------------------------------------------------- */

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  invalid?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function OtpInput({
  length = 6,
  value = "",
  onChange,
  invalid,
  className,
  "aria-label": ariaLabel = "One-time code",
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const id = useId();

  const emit = (chars: string[]) => onChange?.(chars.join(""));

  const setChar = (i: number, ch: string) => {
    const chars = Array.from({ length }, (_, j) => value[j] ?? "");
    chars[i] = ch;
    emit(chars);
  };

  return (
    <div className={cn("b-otp", invalid && "is-invalid", className)} role="group" aria-label={ariaLabel}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          id={`${id}-${i}`}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          className={value[i] ? "is-filled" : undefined}
          value={value[i] ?? ""}
          onChange={(e) => {
            const ch = e.target.value.replace(/\D/g, "").slice(-1);
            setChar(i, ch);
            if (ch) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i]) refs.current[i - 1]?.focus();
          }}
          onPaste={(e) => {
            const digits = e.clipboardData.getData("text").replace(/\D/g, "");
            if (!digits) return;
            e.preventDefault();
            emit(Array.from({ length }, (_, j) => digits[j] ?? ""));
            refs.current[Math.min(digits.length, length - 1)]?.focus();
          }}
        />
      ))}
    </div>
  );
}
