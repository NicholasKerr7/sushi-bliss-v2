"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { supportTopics } from "@/data/support";
import {
  getDefaultSupportDraft,
  type SubmitSupportMessageResult,
  type SupportValidationState,
} from "@/lib/support";
import type { SupportMessageDraft } from "@/types/support";
import type { UserProfile } from "@/types/user";

import {
  MobileSupportBackButton,
  MobileSupportPanel,
} from "./MobileSupportPrimitives";

interface MobileSupportRequestViewProps {
  initialTopicId?: string;
  profile: UserProfile;
  onBack: () => void;
  onSubmitSupportMessage: (
    draft: SupportMessageDraft,
  ) => SubmitSupportMessageResult;
}

const topicOptions = supportTopics.map((topic) => ({
  label: topic.label,
  value: topic.id,
}));

export function MobileSupportRequestView({
  initialTopicId,
  profile,
  onBack,
  onSubmitSupportMessage,
}: MobileSupportRequestViewProps) {
  const [draft, setDraft] = useState<SupportMessageDraft>(() => {
    const defaultDraft = getDefaultSupportDraft(profile);

    return {
      ...defaultDraft,
      topicId: initialTopicId || defaultDraft.topicId,
    };
  });
  const [validation, setValidation] = useState<SupportValidationState>({});
  const [statusMessage, setStatusMessage] = useState("");

  const updateDraft = <TField extends keyof SupportMessageDraft>(
    field: TField,
    value: SupportMessageDraft[TField],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidation((current) => ({ ...current, [field]: undefined }));
    setStatusMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = onSubmitSupportMessage(draft);
    setValidation(result.validation);
    setStatusMessage(result.statusMessage);

    if (result.message) {
      setDraft({
        ...getDefaultSupportDraft(profile),
        topicId: draft.topicId,
      });
    }
  };

  return (
    <>
      <div className="mt-6 flex items-center justify-between gap-4">
        <MobileSupportBackButton label="Back to support" onClick={onBack} />
        <p className="rounded-full border border-[var(--sb-border)] bg-black/36 px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Concierge
        </p>
      </div>

      <section className="mt-7">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Support request
        </p>
        <h1 className="editorial-title mt-3 text-[35px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
          Send
          <span className="block text-[var(--sb-red-bright)]">A Note</span>
        </h1>
        <p className="mt-4 text-[15px] leading-6 text-white/60">
          Include order numbers, booking dates, allergy details, or timing notes
          so concierge can respond clearly.
        </p>
      </section>

      <MobileSupportPanel className="mt-5 p-5" id="mobile-support-form">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            error={validation.name}
            id="mobile-support-name"
            label="Name"
            onChange={(event) => updateDraft("name", event.target.value)}
            value={draft.name}
          />
          <Input
            error={validation.email}
            id="mobile-support-email"
            label="Email"
            onChange={(event) => updateDraft("email", event.target.value)}
            type="email"
            value={draft.email}
          />
          <Select
            error={validation.topicId}
            id="mobile-support-topic"
            label="Topic"
            onChange={(event) => updateDraft("topicId", event.target.value)}
            options={topicOptions}
            value={draft.topicId}
          />

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-sb-rice"
              htmlFor="mobile-support-message"
            >
              Message
            </label>
            <textarea
              aria-describedby={
                validation.message ? "mobile-support-message-error" : undefined
              }
              aria-invalid={Boolean(validation.message)}
              className="min-h-36 w-full resize-y rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
              id="mobile-support-message"
              maxLength={500}
              onChange={(event) => updateDraft("message", event.target.value)}
              placeholder="Tell us what you need help with."
              value={draft.message}
            />
            {validation.message ? (
              <p
                className="text-xs leading-5 text-sb-red"
                id="mobile-support-message-error"
              >
                {validation.message}
              </p>
            ) : null}
          </div>

          <button
            className="red-glow-button min-h-[58px] rounded-[13px] border text-[13px]"
            type="submit"
          >
            Send request
          </button>

          {statusMessage ? (
            <p className="rounded-[14px] border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/10 p-3 text-[13px] font-semibold text-[var(--sb-gold-soft)]">
              {statusMessage}
            </p>
          ) : null}
        </form>
      </MobileSupportPanel>
    </>
  );
}
