"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { HelpArticle } from "@/types/support";

interface HelpArticleModalProps {
  article: HelpArticle | null;
  onOpenChange: (open: boolean) => void;
}

export function HelpArticleModal({
  article,
  onOpenChange,
}: HelpArticleModalProps) {
  return (
    <Modal
      description={article?.summary}
      footer={
        <Button onClick={() => onOpenChange(false)} variant="ghost">
          Close article
        </Button>
      }
      onOpenChange={onOpenChange}
      open={Boolean(article)}
      title={article?.title || "Help article"}
    >
      {article ? (
        <article className="space-y-4">
          <StatusBadge tone="premium">{article.category}</StatusBadge>
          <div className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016)),rgba(0,0,0,0.3)] p-4">
            <div className="space-y-3 text-sm leading-6 text-sb-muted">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[16px] border border-[var(--sb-gold)]/28 bg-black/24 p-3 text-[13px] leading-5 text-[var(--sb-gold-soft)]">
            Need more help? Send a support request and our hospitality team will
            follow up.
          </div>
        </article>
      ) : null}
    </Modal>
  );
}
