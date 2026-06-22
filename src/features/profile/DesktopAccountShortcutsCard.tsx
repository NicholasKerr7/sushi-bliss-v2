import Link from "next/link";

import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { SettingsCard } from "./DesktopProfileSettingsPrimitives";

const shortcuts = [
  { label: "View order history", href: "/orders" },
  { label: "Manage payment methods", target: "desktop-profile-payments" },
  { label: "Download receipts", href: "/orders" },
] as const;

export function DesktopAccountShortcutsCard() {
  return (
    <SettingsCard
      title="Account shortcuts"
      icon="/assets/icons/chef-crest-icon.png"
      id="desktop-profile-shortcuts"
    >
      {shortcuts.map((shortcut) => {
        const shortcutClassName =
          "flex min-h-[38px] w-full items-center justify-between border-b border-white/10 text-left text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] transition last:border-b-0 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)]";

        if ("href" in shortcut) {
          return (
            <Link
              className={shortcutClassName}
              href={shortcut.href}
              key={shortcut.label}
            >
              {shortcut.label}
              <ChevronIcon direction="right" size={18} />
            </Link>
          );
        }

        return (
          <a
            className={shortcutClassName}
            href={`#${shortcut.target}`}
            key={shortcut.label}
          >
            {shortcut.label}
            <ChevronIcon direction="right" size={18} />
          </a>
        );
      })}
    </SettingsCard>
  );
}
