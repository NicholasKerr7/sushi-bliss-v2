"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { supportTopics } from "@/data/support";
import {
  getDefaultSupportDraft,
  type SubmitSupportMessageResult,
  type SupportValidationState,
} from "@/lib/support";
import type { SupportMessageDraft } from "@/types/support";
import type { UserProfile } from "@/types/user";

interface TabletSupportContactFormProps {
  profile: UserProfile;
  onOpenHelp: () => void;
  onSubmitSupportMessage: (
    draft: SupportMessageDraft,
  ) => SubmitSupportMessageResult;
}

export function TabletSupportContactForm({
  profile,
  onOpenHelp,
  onSubmitSupportMessage,
}: TabletSupportContactFormProps) {
  const [draft, setDraft] = useState<SupportMessageDraft>(() =>
    getDefaultSupportDraft(profile),
  );
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
    <form
      className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5"
      id="tablet-support-form"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3">
        <AssetIcon size={28} src="/assets/icons/email-icon.png" />
        <h2 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Send us a message
        </h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <TabletSupportInput
          error={validation.name}
          id="tablet-support-name"
          label="Full name"
          onChange={(value) => updateDraft("name", value)}
          value={draft.name}
        />
        <TabletSupportInput
          error={validation.email}
          id="tablet-support-email"
          label="Email address"
          onChange={(value) => updateDraft("email", value)}
          type="email"
          value={draft.email}
        />
        <div className="relative col-span-2">
          <label className="sr-only" htmlFor="tablet-support-topic">
            Support topic
          </label>
          <select
            aria-invalid={Boolean(validation.topicId)}
            className="h-12 w-full appearance-none rounded-[10px] border border-[var(--sb-border)] bg-black/32 px-4 pr-11 text-[14px] font-semibold text-white outline-none transition focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
            id="tablet-support-topic"
            onChange={(event) => updateDraft("topicId", event.target.value)}
            value={draft.topicId}
          >
            {supportTopics.map((topic) => (
              <option
                className="bg-[#050607] text-white"
                key={topic.id}
                value={topic.id}
              >
                {topic.label}
              </option>
            ))}
          </select>
          <ChevronIcon
            className="pointer-events-none absolute right-4 top-6 -translate-y-1/2 text-[var(--sb-gold)]"
            direction="down"
            size={18}
          />
          {validation.topicId ? (
            <p className="mt-1 text-[12px] text-[var(--sb-red-bright)]">
              {validation.topicId}
            </p>
          ) : null}
        </div>
        <div className="col-span-2">
          <label className="sr-only" htmlFor="tablet-support-message">
            Your message
          </label>
          <textarea
            aria-invalid={Boolean(validation.message)}
            className="min-h-[116px] w-full resize-none rounded-[10px] border border-[var(--sb-border)] bg-black/32 px-4 py-3 text-[14px] leading-6 text-white outline-none transition placeholder:text-white/32 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
            id="tablet-support-message"
            maxLength={500}
            onChange={(event) => updateDraft("message", event.target.value)}
            placeholder="Your message"
            value={draft.message}
          />
          {validation.message ? (
            <p className="mt-1 text-[12px] text-[var(--sb-red-bright)]">
              {validation.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
        <button
          className="red-glow-button h-[52px] rounded-[11px] text-[13px] uppercase tracking-[0.08em]"
          type="submit"
        >
          Send message
        </button>
        <button
          className="h-[52px] rounded-[11px] border border-[var(--sb-border)] px-5 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onOpenHelp}
          type="button"
        >
          Help articles
        </button>
      </div>
      {statusMessage ? (
        <p className="mt-3 text-[13px] font-semibold text-[var(--sb-wasabi)]">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}

function TabletSupportInput({
  error,
  id,
  label,
  onChange,
  type = "text",
  value,
}: {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  type?: "email" | "text";
  value: string;
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        aria-invalid={Boolean(error)}
        className="h-12 w-full rounded-[10px] border border-[var(--sb-border)] bg-black/32 px-4 text-[14px] text-white outline-none transition placeholder:text-white/32 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        type={type}
        value={value}
      />
      {error ? (
        <p className="mt-1 text-[12px] text-[var(--sb-red-bright)]">{error}</p>
      ) : null}
    </div>
  );
}
