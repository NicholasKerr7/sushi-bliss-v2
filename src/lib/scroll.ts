/** Resets the document scroll position without inheriting global smooth-scroll CSS. */
export function scrollWindowToTopInstantly() {
  if (typeof window === "undefined") {
    return;
  }

  window.scrollTo({
    behavior: "instant" as ScrollBehavior,
    left: 0,
    top: 0,
  });
}
