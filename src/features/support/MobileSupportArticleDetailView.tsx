"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { HelpArticle } from "@/types/support";

import {
  MobileSupportBackButton,
  MobileSupportPanel,
} from "./MobileSupportPrimitives";

interface MobileSupportArticleDetailViewProps {
  article: HelpArticle;
  onBack: () => void;
  onOpenRequest: () => void;
}

export function MobileSupportArticleDetailView({
  article,
  onBack,
  onOpenRequest,
}: MobileSupportArticleDetailViewProps) {
  return (
    <>
      <div className="mt-6 flex items-center justify-between gap-4">
        <MobileSupportBackButton
          label="Back to help articles"
          onClick={onBack}
        />
        <StatusBadge tone="premium">{article.category}</StatusBadge>
      </div>

      <MobileSupportPanel className="mt-5 p-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Help article
        </p>
        <h1 className="mt-4 text-[30px] font-semibold leading-[1.05] text-white">
          {article.title}
        </h1>
        <p className="mt-4 text-[15px] leading-6 text-white/58">
          {article.summary}
        </p>
      </MobileSupportPanel>

      <MobileSupportPanel className="mt-4 p-5">
        <div className="grid gap-4 text-[15px] leading-7 text-white/62">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </MobileSupportPanel>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          className="min-h-[54px] rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onBack}
          type="button"
        >
          Done
        </button>
        <button
          className="red-glow-button min-h-[54px] rounded-[13px] border text-[12px]"
          onClick={onOpenRequest}
          type="button"
        >
          Ask concierge
        </button>
      </div>
    </>
  );
}
