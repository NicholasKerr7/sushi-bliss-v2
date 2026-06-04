/** Joins conditional class names without introducing a styling dependency. */
export function classNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
