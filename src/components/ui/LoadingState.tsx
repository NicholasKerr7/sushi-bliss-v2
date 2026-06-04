import { classNames } from "@/lib/classNames";

interface LoadingStateProps {
  className?: string;
  label?: string;
}

export function LoadingState({
  className,
  label = "Loading",
}: LoadingStateProps) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={classNames(
        "flex min-h-32 items-center justify-center rounded-card border border-sb-line bg-sb-panel/70 p-6",
        className,
      )}
      role="status"
    >
      <div className="flex items-center gap-3 text-sm font-medium text-sb-muted">
        <span className="h-3 w-3 rounded-full bg-sb-gold" />
        <span>{label}</span>
      </div>
    </div>
  );
}
