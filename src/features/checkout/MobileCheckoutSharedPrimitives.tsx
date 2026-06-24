import type { ReactNode } from "react";

export function StepHeading({
  eyebrow,
  subtitle,
  title,
}: {
  eyebrow?: string;
  subtitle?: string;
  title: string;
}) {
  return (
    <header>
      {eyebrow ? (
        <p className="editorial-title text-[18px] text-[var(--sb-gold-soft)] min-[390px]:text-[21px]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="editorial-title mt-3 text-[28px] leading-none min-[390px]:mt-4 min-[390px]:text-[36px] min-[430px]:text-[38px]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-[13px] leading-5 text-[var(--sb-gold-soft)] min-[390px]:text-[15px] min-[390px]:leading-6">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function MobileBackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      className="mb-4 rounded-full border border-[var(--sb-border)] bg-white/[0.025] px-3.5 py-2 text-[11px] uppercase tracking-[0.08em] text-white/66 min-[390px]:px-4 min-[390px]:text-[12px] min-[390px]:tracking-[0.1em]"
      onClick={onBack}
      type="button"
    >
      Back
    </button>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="editorial-title text-[17px] text-[var(--sb-gold-soft)] min-[390px]:text-[19px]">
      {children}
    </h2>
  );
}

export function SecureInlineCopy({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-2.5 text-center text-[12px] leading-5 text-white/48 min-[390px]:gap-3 min-[390px]:text-[13px]">
      <LockGlyph />
      {children}
    </p>
  );
}

export function SecureCheckoutNote() {
  return (
    <p className="mt-5 flex items-center justify-center gap-2.5 text-center text-[12px] leading-5 text-white/48 min-[390px]:gap-3 min-[390px]:text-[13px]">
      <LockGlyph />
      Secure checkout · Your information is always protected.
    </p>
  );
}

export function MobileCheckoutActionDock({
  disabled = false,
  label,
  meta,
  onClick,
  value,
}: {
  disabled?: boolean;
  label: string;
  meta?: string;
  onClick: () => void;
  value?: string;
}) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sb-border)] bg-[linear-gradient(180deg,rgba(9,8,7,0.88),rgba(0,0,0,0.98))] px-3 pb-[calc(0.72rem+var(--sb-safe-bottom))] pt-3 shadow-[0_-22px_54px_rgba(0,0,0,0.66)] backdrop-blur-xl">
      <div className="mobile-frame">
        {meta || value ? (
          <div className="mb-2 flex min-w-0 items-center justify-between gap-3 px-1 text-[11px] uppercase tracking-[0.06em] text-white/50">
            <span className="min-w-0 truncate">{meta}</span>
            <span className="shrink-0 font-mono text-[13px] tracking-normal text-[var(--sb-gold-soft)]">
              {value}
            </span>
          </div>
        ) : null}
        <button
          aria-label={label}
          className="red-glow-button grid h-[52px] w-full place-items-center rounded-[13px] px-3 text-[12px] uppercase tracking-[0.06em] disabled:cursor-not-allowed disabled:opacity-60 min-[390px]:h-[56px] min-[390px]:text-[13px] min-[390px]:tracking-[0.07em]"
          disabled={disabled}
          onClick={onClick}
          type="button"
        >
          {label}
        </button>
      </div>
    </footer>
  );
}

function LockGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[var(--sb-gold-soft)]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M6.5 10h11A1.5 1.5 0 0 1 19 11.5v8A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}
