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
        <div className="space-y-5">
          <StatusBadge tone="premium">{article.category}</StatusBadge>
          <div className="space-y-3 text-sm leading-6 text-sb-muted">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
