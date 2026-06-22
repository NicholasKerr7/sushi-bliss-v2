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
        <p className="editorial-title text-[25px] text-[var(--sb-gold-soft)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="editorial-title mt-5 text-[36px] leading-none min-[390px]:text-[42px]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function MobileBackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      className="mb-5 rounded-full border border-[var(--sb-border)] bg-white/[0.025] px-4 py-2 text-[12px] uppercase tracking-[0.1em] text-white/66"
      onClick={onBack}
      type="button"
    >
      Back
    </button>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="editorial-title text-[20px] text-[var(--sb-gold-soft)]">
      {children}
    </h2>
  );
}

export function SecureInlineCopy({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-3 text-center text-[14px] text-white/48">
      <LockGlyph />
      {children}
    </p>
  );
}

export function SecureCheckoutNote() {
  return (
    <p className="mt-5 flex items-center justify-center gap-3 text-center text-[14px] text-white/48">
      <LockGlyph />
      Secure checkout · Your information is always protected.
    </p>
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
