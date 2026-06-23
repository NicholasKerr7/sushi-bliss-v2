"use client";

import type {
  AnchorHTMLAttributes,
  MouseEvent as ReactMouseEvent,
} from "react";

interface AdminHashLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
  scrollTargetId?: string;
}

/**
 * Drives the hash-based admin workbench even when the current hash is clicked again.
 * The dashboard keeps all admin domains on one route, so same-hash clicks need a
 * synthetic hashchange to feel like real controls instead of inert anchors.
 */
export function AdminHashLink({
  href,
  onClick,
  replace = false,
  scrollTargetId = "admin-control-deck",
  ...props
}: AdminHashLinkProps) {
  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      !href.startsWith("#")
    ) {
      return;
    }

    event.preventDefault();

    const oldUrl = window.location.href;

    if (window.location.hash === href) {
      window.history.replaceState(null, "", href);
    } else if (replace) {
      window.history.replaceState(null, "", href);
    } else {
      window.history.pushState(null, "", href);
    }

    window.dispatchEvent(
      new HashChangeEvent("hashchange", {
        newURL: window.location.href,
        oldURL: oldUrl,
      }),
    );
    window.requestAnimationFrame(() => {
      document
        .getElementById(scrollTargetId)
        ?.scrollIntoView({ block: "start" });
    });
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
