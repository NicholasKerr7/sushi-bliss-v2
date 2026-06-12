"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useProfile } from "@/hooks/useProfile";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { useSupport } from "@/hooks/useSupport";
import type { HelpArticle } from "@/types/support";

import { ContactMethodsPanel } from "./ContactMethodsPanel";
import { HelpArticleList } from "./HelpArticleList";
import { HelpArticleModal } from "./HelpArticleModal";
import { MobileSupportCenter } from "./MobileSupportCenter";
import { RecentSupportRequests } from "./RecentSupportRequests";
import { SupportRequestForm } from "./SupportRequestForm";

export function SupportCenter() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileSupportCenter />;
  }

  return <DesktopSupportCenter />;
}

function DesktopSupportCenter() {
  const { profile } = useProfile();
  const { messages, submitSupportMessage } = useSupport();
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="support"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge>Concierge</Badge>}
          subtitle="Contact support, send allergy notes, review help articles, and keep recent requests in profile-ready local history."
          title="Support and help center"
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <ContactMethodsPanel />
            <RecentSupportRequests messages={messages} />
          </div>

          <div className="space-y-5">
            <SupportRequestForm
              onSubmitSupportMessage={submitSupportMessage}
              profile={profile}
            />
            <HelpArticleList onSelectArticle={setSelectedArticle} />
          </div>
        </div>
      </PageContainer>

      <HelpArticleModal
        article={selectedArticle}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedArticle(null);
          }
        }}
      />
    </section>
  );
}
