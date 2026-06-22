"use client";

import { useState } from "react";

import { supportTopics } from "@/data/support";
import { DesktopMenuHeader } from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useProfile } from "@/hooks/useProfile";
import { useSupport } from "@/hooks/useSupport";
import type { HelpArticle, SupportMessageDraft } from "@/types/support";

import { DesktopContactView } from "./DesktopContactView";
import { DesktopHelpArticleDetail } from "./DesktopHelpArticleDetail";
import { DesktopHelpCenter } from "./DesktopHelpCenterView";

type SupportView = "contact" | "help";

export function DesktopSupportExperience() {
  const { itemCount } = useCart();
  const { profile } = useProfile();
  const { messages, submitSupportMessage } = useSupport();
  const [view, setView] = useState<SupportView>("contact");
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState<SupportMessageDraft>({
    email: profile.email,
    message: "",
    name: profile.name,
    topicId: supportTopics[0]?.id || "orders",
  });
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );

  const handleSubmit = () => {
    const result = submitSupportMessage(draft);

    if (Object.keys(result.validation).length > 0) {
      setStatus(result.statusMessage);
      return;
    }

    setStatus(result.statusMessage);
    setDraft((current) => ({ ...current, message: "" }));
  };

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="support"
    >
      <DesktopMenuHeader
        activeId={view === "help" ? "help" : "contact"}
        cartCount={itemCount}
      />
      {view === "help" && selectedArticle ? (
        <DesktopHelpArticleDetail
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onContactSupport={() => {
            setSelectedArticle(null);
            setView("contact");
          }}
          onOpenArticle={setSelectedArticle}
        />
      ) : view === "help" ? (
        <DesktopHelpCenter
          selectedArticle={selectedArticle}
          onOpenArticle={setSelectedArticle}
          onOpenContact={() => {
            setSelectedArticle(null);
            setView("contact");
          }}
        />
      ) : (
        <DesktopContactView
          draft={draft}
          messagesCount={messages.length}
          status={status}
          onDraftChange={setDraft}
          onOpenHelp={() => setView("help")}
          onOpenArticle={(article) => {
            setSelectedArticle(article);
            setView("help");
          }}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}
