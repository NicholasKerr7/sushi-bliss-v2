export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/** Validates required text fields with a reusable form error message. */
export function requireNonEmpty(
  value: string,
  label: string,
): ValidationResult {
  return value.trim().length > 0
    ? { valid: true }
    : { valid: false, message: `${label} is required.` };
}

/** Performs lightweight email shape validation for mock forms. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Validates US postal code formats used by the mock checkout address flow. */
export function isPostalCode(value: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(value.trim());
}
