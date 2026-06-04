import type { SelectHTMLAttributes } from "react";

import { classNames } from "@/lib/classNames";
import type { SelectOption } from "@/types/common";

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className" | "id"
> {
  error?: string;
  hint?: string;
  id: string;
  label: string;
  options: SelectOption[];
  selectClassName?: string;
  wrapperClassName?: string;
}

export function Select({
  error,
  hint,
  id,
  label,
  options,
  selectClassName,
  wrapperClassName,
  ...props
}: SelectProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={classNames("space-y-2", wrapperClassName)}>
      <label className="block text-sm font-semibold text-sb-rice" htmlFor={id}>
        {label}
      </label>
      <select
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={classNames(
          "min-h-12 w-full rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-sb-red focus:border-sb-red" : undefined,
          selectClassName,
        )}
        id={id}
        {...props}
      >
        {options.map((option) => (
          <option
            disabled={option.disabled}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p className="text-xs leading-5 text-sb-dim" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-xs leading-5 text-sb-red" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
