export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function requireNonEmpty(
  value: string,
  label: string,
): ValidationResult {
  return value.trim().length > 0
    ? { valid: true }
    : { valid: false, message: `${label} is required.` };
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPostalCode(value: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(value.trim());
}
