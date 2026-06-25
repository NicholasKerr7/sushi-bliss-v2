"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";

const checkoutSteps = ["Delivery", "Address", "Payment", "Review"] as const;

export function MobileCheckoutHeader({
  itemCount,
  onBackToCart,
  onClose,
}: {
  itemCount: number;
  onBackToCart?: () => void;
  onClose: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-2 min-[480px]:gap-4">
      <button
        aria-label="Back to cart"
        className="flex min-w-0 items-center gap-2 rounded-[14px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[480px]:gap-3"
        onClick={onBackToCart || onClose}
        type="button"
      >
        <AssetIcon
          alt=""
          className="h-10 w-10 rounded-full min-[480px]:h-[52px] min-[480px]:w-[52px]"
          loading="eager"
          size={52}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[12px] leading-[0.96] tracking-[0.18em] min-[390px]:text-[13px] min-[390px]:tracking-[0.26em] min-[480px]:text-[16px] min-[480px]:tracking-[0.38em]">
          Sushi
          <br />
          Bliss
        </span>
      </button>

      <div className="flex items-center gap-1.5 min-[480px]:gap-3">
        <div className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34 min-[480px]:h-[48px] min-[480px]:w-[48px]">
          <AssetIcon loading="eager" size={24} src={icons.cart} />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {itemCount}
            </span>
          ) : null}
        </div>
        <button
          aria-label="Close checkout"
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34 min-[480px]:h-[48px] min-[480px]:w-[48px]"
          onClick={onClose}
          type="button"
        >
          <ChevronIcon direction="x" size={20} />
        </button>
      </div>
    </header>
  );
}

export function MobileCheckoutProgress({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <nav aria-label="Checkout progress" className="mt-5 min-[480px]:mt-9">
      <ol className="relative isolate grid grid-cols-4 items-start gap-1 min-[480px]:gap-2">
        {checkoutSteps.map((label, index) => {
          const current = index === activeIndex;
          const complete = index < activeIndex;
          const connected = complete || current;

          return (
            <li
              aria-current={current ? "step" : undefined}
              className="relative text-center"
              key={label}
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={classNames(
                    "absolute left-[-50%] top-[18px] h-[5px] w-full overflow-hidden rounded-full border border-white/[0.045] bg-black/52 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)] min-[480px]:top-[23px] min-[480px]:h-[6px]",
                    connected
                      ? "before:absolute before:inset-y-[1px] before:left-0 before:right-0 before:rounded-full before:bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))] before:shadow-[0_0_18px_rgba(238,43,36,0.68)] before:content-[''] after:absolute after:inset-y-[2px] after:left-2 after:right-2 after:rounded-full after:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.42)_0_8px,transparent_8px_16px)] after:opacity-45 after:content-['']"
                      : "before:absolute before:inset-y-[2px] before:left-2 before:right-2 before:rounded-full before:bg-white/10 before:content-['']",
                  )}
                />
              ) : null}
              <span
                className={classNames(
                  "relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border text-[14px] transition min-[480px]:h-12 min-[480px]:w-12 min-[480px]:text-[18px]",
                  current
                    ? "border-[var(--sb-red-bright)] bg-[radial-gradient(circle_at_50%_35%,rgba(255,111,91,0.32),rgba(238,43,36,0.18)_45%,rgba(0,0,0,0.72)_78%)] text-white shadow-[0_0_28px_var(--sb-red-glow),inset_0_0_18px_rgba(238,43,36,0.28)]"
                    : complete
                      ? "border-[var(--sb-gold)]/70 bg-[radial-gradient(circle_at_50%_35%,rgba(215,168,79,0.22),rgba(0,0,0,0.72)_72%)] text-[var(--sb-gold-soft)] shadow-[0_0_18px_rgba(215,168,79,0.22)]"
                      : "border-white/16 bg-black/44 text-white/44 shadow-[inset_0_0_14px_rgba(0,0,0,0.62)]",
                )}
              >
                {index + 1}
                {current ? (
                  <span className="absolute -bottom-1 h-1.5 w-7 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.78)] min-[480px]:w-8" />
                ) : null}
              </span>
              <span
                className={classNames(
                  "mt-2 block text-[9px] uppercase leading-4 tracking-[0.02em] min-[390px]:text-[10px] min-[390px]:tracking-[0.04em] min-[480px]:mt-3 min-[480px]:text-[12px] min-[480px]:tracking-[0.08em]",
                  current
                    ? "text-[var(--sb-red-bright)]"
                    : complete
                      ? "text-[var(--sb-gold-soft)]"
                      : "text-white/54",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
