import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";

import { desktopProfileSidebarItems } from "./DesktopProfileSettingsData";

export function DesktopProfileSettingsSidebar({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <aside className="space-y-3">
      <nav
        className="overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035]"
        aria-label="Account settings sections"
      >
        {desktopProfileSidebarItems.map((item) => {
          const itemClassName = classNames(
            "grid min-h-[44px] w-full grid-cols-[28px_1fr] items-center gap-3 border-b border-white/10 px-6 text-left text-[13px] uppercase tracking-[0.04em] transition last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)]",
            item.id === "personal"
              ? "border-l-2 border-l-[var(--sb-red-bright)] text-[var(--sb-red-bright)]"
              : "text-white/72 hover:text-white",
          );
          const content = (
            <>
              <AssetIcon size={20} src={item.icon} />
              {item.label}
            </>
          );

          if ("href" in item) {
            return (
              <Link className={itemClassName} href={item.href} key={item.id}>
                {content}
              </Link>
            );
          }

          if ("target" in item) {
            return (
              <a
                className={itemClassName}
                href={`#${item.target}`}
                key={item.id}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              className={itemClassName}
              key={item.id}
              onClick={onBack}
              type="button"
            >
              {content}
            </button>
          );
        })}
      </nav>
      <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
        <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Need help?
        </h2>
        <p className="mt-2 text-[14px] text-white/58">
          Our team is here to assist you.
        </p>
        <Link
          className="mt-4 block text-[13px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]"
          href="/support"
        >
          Contact support <ChevronIcon direction="right" size={18} />
        </Link>
      </article>
    </aside>
  );
}
