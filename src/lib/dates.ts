/** Formats an ISO date or Date object for compact restaurant UI labels. */
export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/** Formats an ISO date or Date object with year for receipt and order screens. */
export function formatFullDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/** Formats only the clock portion for compact ETA and timeline labels. */
export function formatTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/** Validates that a date is in the future relative to the supplied clock. */
export function isFutureDate(value: string | Date, now = new Date()): boolean {
  const date = typeof value === "string" ? new Date(value) : value;

  return date.getTime() > now.getTime();
}

/** Returns a new Date shifted by a whole number of calendar days. */
export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);

  return next;
}
