import { desktopNavigation } from "@/data/navigation";
import { classNames } from "@/lib/classNames";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav aria-label="Primary navigation" className={className}>
      <ul className="flex items-center gap-1">
        {desktopNavigation.map((item) => (
          <li key={item.id}>
            <a
              aria-disabled={item.disabled}
              className={classNames(
                "rounded-control px-4 py-2 text-sm font-medium text-sb-muted transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                item.disabled ? "pointer-events-none opacity-50" : undefined,
              )}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
