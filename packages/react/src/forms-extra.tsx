"use client";

import {
  forwardRef, useId, type FormHTMLAttributes, type HTMLAttributes,
  type InputHTMLAttributes, type ReactNode,
} from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export const Form = block("form", "b-form", "Form");
/** Two fields side by side above 768px, stacked below. */
export const FormRow = block("div", "b-form-row", "FormRow");
export const FormActions = block("div", "b-form-actions", "FormActions");
export const Fieldset = block("fieldset", "b-fieldset", "Fieldset");
export const Help = block("p", "b-help", "Help");
export const ErrorText = block("p", "b-error", "ErrorText");
export const Optional = block("span", "b-optional", "Optional");

export interface FormSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** A titled group of fields — the unit long forms are built from. */
export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(function FormSection(
  { title, description, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-form-section", className)} {...rest}>
      {title || description ? (
        <div className="b-form-section__header">
          {title ? <div className="b-form-section__title">{title}</div> : null}
          {description ? <p className="b-form-section__desc">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
});

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  htmlFor?: string;
  children?: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...rest },
  ref
) {
  return (
    <label ref={ref} className={cn("b-label", required && "b-label--required", className)} {...rest}>
      {children}
    </label>
  );
});

export interface InputGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "prefix" | "suffix"> {
  /** Glyph or text before the field — a currency, a search icon. */
  prefix?: ReactNode;
  /** After the field — a unit, a clear button. */
  suffix?: ReactNode;
  children?: ReactNode;
}

/** Affixes sit inside the field's border, so the group reads as one control. */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { prefix, suffix, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-input-group", className)} {...rest}>
      {prefix ? <span className="b-input-affix b-input-affix--start">{prefix}</span> : null}
      {children}
      {suffix ? <span className="b-input-affix b-input-affix--end">{suffix}</span> : null}
    </div>
  );
});

export interface StepperInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  decrementLabel?: string;
  incrementLabel?: string;
  onStep?: (delta: number) => void;
}

/** For small counts, where typing a number is slower than pressing a button. */
export const StepperInput = forwardRef<HTMLInputElement, StepperInputProps>(function StepperInput(
  { decrementLabel = "Decrease", incrementLabel = "Increase", onStep, className, ...rest },
  ref
) {
  return (
    <div className={cn("b-stepper-input", className)}>
      <button type="button" aria-label={decrementLabel} onClick={() => onStep?.(-1)}>
        −
      </button>
      <input ref={ref} type="number" {...rest} />
      <button type="button" aria-label={incrementLabel} onClick={() => onStep?.(1)}>
        +
      </button>
    </div>
  );
});

export interface RangeProps extends Omit<HTMLAttributes<HTMLDivElement>, "label" | "value"> {
  min?: number;
  max?: number;
  step?: number;
  /** [low, high] — a two-thumb range. */
  value: [number, number];
  onRangeChange?: (value: [number, number]) => void;
  label?: string;
}

/** Two thumbs on one track, with the selected span filled in. */
export const Range = forwardRef<HTMLDivElement, RangeProps>(function Range(
  { min = 0, max = 100, step = 1, value, onRangeChange, label, className, ...rest },
  ref
) {
  const id = useId();
  const span = max - min || 1;
  const start = ((Math.min(...value) - min) / span) * 100;
  const width = ((Math.max(...value) - Math.min(...value)) / span) * 100;
  return (
    <div ref={ref} className={cn("b-range", className)} role="group" aria-label={label} {...rest}>
      <div className="b-range__fill" style={{ insetInlineStart: `${start}%`, width: `${width}%` }} />
      <input
        type="range" min={min} max={max} step={step} value={value[0]}
        aria-label={label ? `${label}, minimum` : "Minimum"}
        id={`${id}-min`}
        onChange={(e) => onRangeChange?.([Number(e.target.value), value[1]])}
      />
      <input
        type="range" min={min} max={max} step={step} value={value[1]}
        aria-label={label ? `${label}, maximum` : "Maximum"}
        id={`${id}-max`}
        onChange={(e) => onRangeChange?.([value[0], Number(e.target.value)])}
      />
    </div>
  );
});

export interface DropzoneProps extends HTMLAttributes<HTMLDivElement> {
  /** Highlights the target while a file is over it. */
  active?: boolean;
  children?: ReactNode;
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(function Dropzone(
  { active, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("b-dropzone", active && "is-active", className)} {...rest}>
      {children}
    </div>
  );
});

export interface UploadItemProps extends HTMLAttributes<HTMLLIElement> {
  name: ReactNode;
  size?: ReactNode;
  thumb?: ReactNode;
  children?: ReactNode;
}

export const UploadItem = forwardRef<HTMLLIElement, UploadItemProps>(function UploadItem(
  { name, size, thumb, className, children, ...rest },
  ref
) {
  return (
    <li ref={ref} className={cn("b-upload-item", className)} {...rest}>
      {thumb ? <span className="b-upload-item__thumb">{thumb}</span> : null}
      <span className="b-upload-item__meta">
        <span className="b-upload-item__name">{name}</span>
        {size ? <span className="b-upload-item__size">{size}</span> : null}
      </span>
      {children}
    </li>
  );
});

export const Upload = block("div", "b-upload", "Upload");
export const FilterBar = block("div", "b-filter-bar", "FilterBar");
export const Swatches = block("div", "b-swatches", "Swatches");
export const Swatch = block("button", "b-swatch", "Swatch");
export const SearchField = block("div", "b-search", "SearchField");

export interface FilterChipProps extends Omit<HTMLAttributes<HTMLButtonElement>, "value"> {
  /** The chosen value, shown after the label. */
  value?: ReactNode;
  children?: ReactNode;
}

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(function FilterChip(
  { value, className, children, ...rest },
  ref
) {
  return (
    <button ref={ref} type="button" className={cn("b-filter-chip", className)} {...rest}>
      {children}
      {value ? <span className="b-filter-chip__value">{value}</span> : null}
    </button>
  );
});
