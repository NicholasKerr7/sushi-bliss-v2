import type { InputHTMLAttributes } from "react";

import { classNames } from "@/lib/classNames";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id"
> {
  error?: string;
  hint?: string;
  id: string;
  inputClassName?: string;
  label: string;
  wrapperClassName?: string;
}

export function Input({
  error,
  hint,
  id,
  inputClassName,
  label,
  wrapperClassName,
  ...props
}: InputProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={classNames("space-y-2", wrapperClassName)}>
      <label className="block text-sm font-semibold text-sb-rice" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={classNames(
          "min-h-12 w-full rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-sb-red focus:border-sb-red" : undefined,
          inputClassName,
        )}
        id={id}
        {...props}
      />
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
