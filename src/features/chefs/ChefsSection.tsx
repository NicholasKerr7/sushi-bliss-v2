"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { chefs } from "@/data/chefs";
import type { Chef } from "@/types/chef";

import { ChefCard } from "./ChefCard";
import { ChefDetailModal } from "./ChefDetailModal";

export function ChefsSection() {
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="chefs"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge tone="premium">Chefs</Badge>}
          subtitle="Meet the masters behind nigiri, sashimi, plated appetizers, and dessert-led tasting moments."
          title="Master chefs"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {chefs.map((chef) => (
            <ChefCard chef={chef} key={chef.id} onViewChef={setSelectedChef} />
          ))}
        </div>
      </PageContainer>

      <ChefDetailModal
        chef={selectedChef}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedChef(null);
          }
        }}
      />
    </section>
  );
}
