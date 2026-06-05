import { isAnalyticsEnabled } from "@/lib/analytics";

export function AnalyticsPlaceholder() {
  if (!isAnalyticsEnabled()) {
    return null;
  }

  return null;
}
