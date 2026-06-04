/** Converts display text into a stable lowercase id segment. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Converts slug or sentence fragments into human-readable title case. */
export function titleCase(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

/** Chooses singular or plural copy based on a count. */
export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural;
}
