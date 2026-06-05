"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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

interface SupportRequestFormProps {
  onSubmitSupportMessage: (
    draft: SupportMessageDraft,
  ) => SubmitSupportMessageResult;
  profile: UserProfile;
}

const topicOptions = supportTopics.map((topic) => ({
  label: topic.label,
  value: topic.id,
}));

export function SupportRequestForm({
  onSubmitSupportMessage,
  profile,
}: SupportRequestFormProps) {
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
    <Card className="p-5 md:p-6" id="support-form">
      <div>
        <h3 className="text-xl font-semibold text-sb-rice">
          Send a support request
        </h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          Use this for allergies, accessibility details, gift timing, order
          questions, and reservation changes.
        </p>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            error={validation.name}
            id="support-name"
            label="Name"
            onChange={(event) => updateDraft("name", event.target.value)}
            value={draft.name}
          />
          <Input
            error={validation.email}
            id="support-email"
            label="Email"
            onChange={(event) => updateDraft("email", event.target.value)}
            type="email"
            value={draft.email}
          />
        </div>

        <Select
          error={validation.topicId}
          id="support-topic"
          label="Topic"
          onChange={(event) => updateDraft("topicId", event.target.value)}
          options={topicOptions}
          value={draft.topicId}
        />

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-sb-rice"
            htmlFor="support-message"
          >
            Message
          </label>
          <textarea
            aria-describedby={
              validation.message ? "support-message-error" : undefined
            }
            aria-invalid={Boolean(validation.message)}
            className="min-h-32 w-full resize-y rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
            id="support-message"
            maxLength={500}
            onChange={(event) => updateDraft("message", event.target.value)}
            placeholder="Include order number, reservation date, allergy details, or the help you need."
            value={draft.message}
          />
          {validation.message ? (
            <p
              className="text-xs leading-5 text-sb-red"
              id="support-message-error"
            >
              {validation.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">Send request</Button>
          {statusMessage ? (
            <p className="text-sm font-semibold text-sb-wasabi">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
