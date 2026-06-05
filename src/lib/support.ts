import { supportTopics } from "@/data/support";
import { slugify } from "@/lib/format";
import { isEmail, requireNonEmpty } from "@/lib/validation";
import type {
  SupportMessage,
  SupportMessageDraft,
  SupportTopic,
} from "@/types/support";
import type { UserProfile } from "@/types/user";

export type SupportValidationState = Partial<
  Record<keyof SupportMessageDraft, string>
>;

export interface SubmitSupportMessageResult {
  message?: SupportMessage;
  statusMessage: string;
  validation: SupportValidationState;
}

const minimumMessageLength = 18;

/** Creates a contact form draft from the current local profile. */
export function getDefaultSupportDraft(
  profile?: Pick<UserProfile, "email" | "name">,
): SupportMessageDraft {
  return {
    email: profile?.email || "",
    message: "",
    name: profile?.name || "",
    topicId: supportTopics[0]?.id || "",
  };
}

/** Finds the configured support topic behind a submitted topic id. */
export function getSupportTopic(topicId: string): SupportTopic | undefined {
  return supportTopics.find((topic) => topic.id === topicId);
}

/** Returns a readable support topic label while preserving a safe fallback. */
export function getSupportTopicLabel(topicId: string): string {
  return getSupportTopic(topicId)?.label || "Concierge";
}

/** Validates support contact requests before local persistence. */
export function validateSupportMessageDraft(
  draft: SupportMessageDraft,
): SupportValidationState {
  const name = requireNonEmpty(draft.name, "Name");
  const message = requireNonEmpty(draft.message, "Message");
  const validation: SupportValidationState = {};

  if (!name.valid) {
    validation.name = name.message;
  }

  if (!isEmail(draft.email)) {
    validation.email = "Enter a valid email address.";
  }

  if (!getSupportTopic(draft.topicId)) {
    validation.topicId = "Choose a support topic.";
  }

  if (!message.valid) {
    validation.message = message.message;
  } else if (draft.message.trim().length < minimumMessageLength) {
    validation.message = `Add at least ${minimumMessageLength} characters so concierge can help.`;
  }

  return validation;
}

/** Detects whether the support validation map contains active form errors. */
export function hasSupportValidationErrors(
  validation: SupportValidationState,
): boolean {
  return Object.values(validation).some(Boolean);
}

/** Converts a valid support draft into the stored mock support message model. */
export function createSupportMessage(
  draft: SupportMessageDraft,
  now: Date = new Date(),
): SupportMessage {
  const createdAt = now.toISOString();
  const topicSlug = slugify(draft.topicId || "concierge");

  return {
    createdAt,
    email: draft.email.trim(),
    id: `support-${topicSlug}-${now.getTime()}`,
    message: draft.message.trim(),
    name: draft.name.trim(),
    status: "received",
    topicId: draft.topicId,
  };
}
