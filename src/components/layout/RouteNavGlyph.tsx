import { classNames } from "@/lib/classNames";

interface RouteNavGlyphProps {
  className?: string;
  id: string;
}

/** Renders the shared stroke glyphs used by customer bottom navigation. */
export function RouteNavGlyph({ className, id }: RouteNavGlyphProps) {
  const glyphClassName = classNames(
    "shrink-0 fill-none stroke-current stroke-[1.7]",
    className,
  );

  switch (id) {
    case "home":
      return (
        <svg
          aria-hidden="true"
          className={glyphClassName}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M3.5 11.2 12 4l8.5 7.2" />
          <path d="M5.8 10.5v9h12.4v-9" />
          <path d="M9.6 19.5v-6h4.8v6" />
        </svg>
      );
    case "menu":
      return (
        <svg
          aria-hidden="true"
          className={glyphClassName}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="7.8" />
          <path d="M8 8.8h8" />
          <path d="M7.4 12h9.2" />
          <path d="M8 15.2h8" />
        </svg>
      );
    case "reservations":
      return (
        <svg
          aria-hidden="true"
          className={glyphClassName}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M6.2 4.6v3" />
          <path d="M17.8 4.6v3" />
          <path d="M4.3 8h15.4" />
          <rect height="15.1" rx="2.2" width="15.4" x="4.3" y="5.7" />
          <path d="M8 12h.1M12 12h.1M16 12h.1M8 16h.1M12 16h.1M16 16h.1" />
        </svg>
      );
    case "orders":
      return (
        <svg
          aria-hidden="true"
          className={glyphClassName}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M6.3 9.2h11.4l1 10.8H5.3z" />
          <path d="M9 9.2V7a3 3 0 0 1 6 0v2.2" />
        </svg>
      );
    case "profile":
      return (
        <svg
          aria-hidden="true"
          className={glyphClassName}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8.2" r="3.5" />
          <path d="M5 20.2c.8-4 3.1-6.1 7-6.1s6.2 2.1 7 6.1" />
        </svg>
      );
    default:
      return null;
  }
}
