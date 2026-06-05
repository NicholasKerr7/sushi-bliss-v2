"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { helpArticles } from "@/data/support";
import type { HelpArticle } from "@/types/support";

interface HelpArticleListProps {
  onSelectArticle: (article: HelpArticle) => void;
}

export function HelpArticleList({ onSelectArticle }: HelpArticleListProps) {
  return (
    <Card className="p-5 md:p-6">
      <h3 className="text-xl font-semibold text-sb-rice">Help articles</h3>
      <div className="mt-4 grid gap-3">
        {helpArticles.map((article) => (
          <div
            className="rounded-card border border-sb-line bg-sb-ink/50 p-4"
            key={article.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <StatusBadge tone="neutral">{article.category}</StatusBadge>
                <h4 className="mt-3 text-sm font-semibold text-sb-rice">
                  {article.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-sb-muted">
                  {article.summary}
                </p>
              </div>
              <Button
                aria-label={`Read ${article.title}`}
                onClick={() => onSelectArticle(article)}
                size="sm"
                variant="ghost"
              >
                Read
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
