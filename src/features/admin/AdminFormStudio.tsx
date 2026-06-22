"use client";

import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import {
  adminFormConfigs,
  defaultAdminFormId,
  getAdminFormConfig,
  type AdminFormConfig,
  type AdminFormField,
  type AdminFormId,
} from "./adminFormData";

type FormValuesById = Record<AdminFormId, Record<string, string>>;

interface AdminFormStudioProps {
  initialFormId?: AdminFormId;
}

function buildInitialValues(): FormValuesById {
  return Object.fromEntries(
    adminFormConfigs.map((config) => [config.id, config.initialValues]),
  ) as FormValuesById;
}

function valuesChanged(
  draftValues: Record<string, string>,
  savedValues: Record<string, string>,
) {
  return JSON.stringify(draftValues) !== JSON.stringify(savedValues);
}

function AdminFormControl({
  field,
  onChange,
  value,
}: {
  field: AdminFormField;
  onChange: (value: string) => void;
  value: string;
}) {
  if (field.type === "textarea") {
    return (
      <label className="block md:col-span-2">
        <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
          {field.label}
        </span>
        <textarea
          className="min-h-28 w-full resize-none rounded-[12px] border border-white/12 bg-black/24 px-3 py-2 text-sm leading-6 text-white outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
        {field.helper ? (
          <span className="mt-1 block text-[12px] leading-5 text-white/42">
            {field.helper}
          </span>
        ) : null}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block min-w-0">
        <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
          {field.label}
        </span>
        <select
          className="h-11 w-full rounded-[12px] border border-white/12 bg-black/24 px-3 text-sm text-white outline-none focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {field.options?.map((option) => (
            <option className="bg-[#050607] text-white" key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
        {field.label}
      </span>
      <input
        className="h-11 w-full rounded-[12px] border border-white/12 bg-black/24 px-3 text-sm text-white outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function AdminFormTabs({
  activeId,
  onChange,
}: {
  activeId: AdminFormId;
  onChange: (id: AdminFormId) => void;
}) {
  return (
    <nav
      aria-label="Admin mock form domains"
      className="smooth-scroll-area mt-5 flex gap-2 overflow-x-auto"
    >
      {adminFormConfigs.map((config) => {
        const active = config.id === activeId;

        return (
          <button
            aria-label={`Open ${config.title}`}
            aria-pressed={active}
            className={classNames(
              "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold uppercase tracking-[0.06em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold md:px-4",
              active
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-white shadow-[0_0_26px_rgba(239,47,37,0.24)]"
                : "border-white/10 bg-black/24 text-white/62 hover:border-[var(--sb-gold)]/32 hover:text-[var(--sb-gold-soft)]",
            )}
            key={config.id}
            onClick={() => onChange(config.id)}
            type="button"
          >
            <AssetIcon loading="eager" size={17} src={config.iconUrl} />
            {config.title.replace(" Form", "")}
          </button>
        );
      })}
    </nav>
  );
}

function AdminFormReview({
  config,
  isDirty,
  isQueued,
  isSaved,
  values,
}: {
  config: AdminFormConfig;
  isDirty: boolean;
  isQueued: boolean;
  isSaved: boolean;
  values: Record<string, string>;
}) {
  const visibleFields = config.fields.slice(0, 4);

  return (
    <aside className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Review card
          </p>
          <h3 className="editorial-title mt-2 line-clamp-2 text-[23px] leading-tight text-white">
            {config.title}
          </h3>
        </div>
        <span
          className={classNames(
            "rounded-full border px-2 py-1 text-[10px] font-semibold uppercase",
            isQueued
              ? "border-[var(--sb-red-bright)]/34 bg-[var(--sb-red)]/12 text-[var(--sb-red-bright)]"
              : isSaved
                ? "border-emerald-400/30 bg-emerald-400/12 text-emerald-300"
                : isDirty
                  ? "border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/10 text-[var(--sb-gold-soft)]"
                  : "border-white/10 bg-white/[0.03] text-white/46",
          )}
        >
          {isQueued
            ? "Queued"
            : isSaved
              ? "Saved"
              : isDirty
                ? "Draft"
                : "Clean"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 border-t border-white/10 pt-4">
        {visibleFields.map((field) => (
          <div key={field.id}>
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
              {field.label}
            </p>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/72">
              {values[field.id] || "Not set"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[16px] border border-[var(--sb-gold)]/18 bg-[var(--sb-gold)]/[0.045] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Backend note
        </p>
        <p className="mt-2 text-sm leading-6 text-white/64">
          This form saves locally in the admin mock layer. Supabase and Stripe
          values still belong in environment variables when backend wiring
          begins.
        </p>
      </div>
    </aside>
  );
}

export function AdminFormStudio({
  initialFormId = defaultAdminFormId,
}: AdminFormStudioProps) {
  const [activeId, setActiveId] = useState<AdminFormId>(initialFormId);
  const [draftValues, setDraftValues] =
    useState<FormValuesById>(buildInitialValues);
  const [savedValues, setSavedValues] =
    useState<FormValuesById>(buildInitialValues);
  const [queuedIds, setQueuedIds] = useState<Set<AdminFormId>>(() => new Set());
  const [savedIds, setSavedIds] = useState<Set<AdminFormId>>(() => new Set());
  const config = getAdminFormConfig(activeId);
  const activeDraft = draftValues[activeId];
  const activeSaved = savedValues[activeId];
  const isDirty = useMemo(
    () => valuesChanged(activeDraft, activeSaved),
    [activeDraft, activeSaved],
  );
  const savedCount = adminFormConfigs.filter((item) =>
    savedIds.has(item.id),
  ).length;
  const queuedCount = adminFormConfigs.filter((item) =>
    queuedIds.has(item.id),
  ).length;

  const handleFieldChange = (fieldId: string, value: string) => {
    setDraftValues((current) => ({
      ...current,
      [activeId]: {
        ...current[activeId],
        [fieldId]: value,
      },
    }));
    setSavedIds((current) => {
      const next = new Set(current);

      next.delete(activeId);

      return next;
    });
  };

  const handleSave = () => {
    if (!isDirty) {
      return;
    }

    setSavedValues((current) => ({
      ...current,
      [activeId]: draftValues[activeId],
    }));
    setSavedIds((current) => new Set(current).add(activeId));
    setQueuedIds((current) => {
      const next = new Set(current);

      next.delete(activeId);

      return next;
    });
  };

  const handleReset = () => {
    setDraftValues((current) => ({
      ...current,
      [activeId]: savedValues[activeId],
    }));
    setSavedIds((current) => {
      const next = new Set(current);

      next.delete(activeId);

      return next;
    });
  };

  const handleQueueReview = () => {
    setQueuedIds((current) => {
      const next = new Set(current);

      if (next.has(activeId)) {
        next.delete(activeId);
      } else {
        next.add(activeId);
      }

      return next;
    });
  };

  return (
    <section
      aria-labelledby="admin-form-studio-title"
      className="mt-6 overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.046),rgba(255,255,255,0.012)),rgba(5,8,9,0.94)] shadow-[0_30px_92px_rgba(0,0,0,0.44)]"
    >
      <div className="border-b border-white/10 p-4 md:p-5 2xl:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Mock edit forms
            </p>
            <h2
              className="editorial-title mt-2 text-[26px] leading-none text-white md:text-[32px]"
              id="admin-form-studio-title"
            >
              {config.title}
            </h2>
            <p className="mt-2 max-w-[780px] text-sm leading-6 text-white/62 md:text-[15px]">
              {config.description}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:min-w-[410px]">
            <div className="rounded-[14px] border border-white/10 bg-black/28 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Domain
              </p>
              <p className="mt-1 truncate font-mono text-[16px] text-[var(--sb-gold-soft)]">
                {config.accent}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/10 bg-black/28 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Saved
              </p>
              <p className="mt-1 font-mono text-[18px] text-[var(--sb-gold-soft)]">
                {savedCount}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/10 bg-black/28 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Review
              </p>
              <p className="mt-1 font-mono text-[18px] text-[var(--sb-red-bright)]">
                {queuedCount}
              </p>
            </div>
          </div>
        </div>

        <AdminFormTabs activeId={activeId} onChange={setActiveId} />
      </div>

      <div className="grid gap-4 p-4 md:p-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:p-6">
        <form
          className="min-w-0 rounded-[18px] border border-white/10 bg-black/20 p-3 md:p-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {config.fields.map((field) => (
              <AdminFormControl
                field={field}
                key={field.id}
                onChange={(value) => handleFieldChange(field.id, value)}
                value={activeDraft[field.id] ?? ""}
              />
            ))}
          </div>

          <div className="mt-4 grid gap-2 min-[480px]:grid-cols-3">
            <button
              className={classNames(
                "h-11 rounded-[12px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45",
                isDirty
                  ? "red-glow-button border-[#ef3326]/70 text-[#e2dcda]"
                  : "border-white/12 bg-white/[0.03] text-white/44",
              )}
              disabled={!isDirty}
              type="submit"
            >
              Save mock
            </button>
            <button
              className="h-11 rounded-[12px] border border-[var(--sb-gold)]/32 bg-black/20 px-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!isDirty && !savedIds.has(activeId)}
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
            <button
              className={classNames(
                "h-11 rounded-[12px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                queuedIds.has(activeId)
                  ? "border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/16 text-[var(--sb-red-bright)]"
                  : "border-white/12 bg-black/22 text-white/72 hover:border-[var(--sb-red-bright)]/46 hover:text-white",
              )}
              onClick={handleQueueReview}
              type="button"
            >
              {queuedIds.has(activeId) ? "Queued" : "Queue review"}
            </button>
          </div>
        </form>

        <AdminFormReview
          config={config}
          isDirty={isDirty}
          isQueued={queuedIds.has(activeId)}
          isSaved={savedIds.has(activeId)}
          values={activeDraft}
        />
      </div>
    </section>
  );
}
