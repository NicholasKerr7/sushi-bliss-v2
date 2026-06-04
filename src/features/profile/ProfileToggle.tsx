"use client";

interface ProfileToggleProps {
  checked: boolean;
  description?: string;
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}

export function ProfileToggle({
  checked,
  description,
  id,
  label,
  onCheckedChange,
}: ProfileToggleProps) {
  return (
    <label
      className="flex items-start justify-between gap-4 rounded-card border border-sb-line bg-sb-ink/45 p-4"
      htmlFor={id}
    >
      <span>
        <span className="block text-sm font-semibold text-sb-rice">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block text-xs leading-5 text-sb-muted">
            {description}
          </span>
        ) : null}
      </span>
      <input
        checked={checked}
        className="mt-1 h-5 w-5 shrink-0 accent-sb-gold"
        id={id}
        onChange={(event) => onCheckedChange(event.target.checked)}
        type="checkbox"
      />
    </label>
  );
}
