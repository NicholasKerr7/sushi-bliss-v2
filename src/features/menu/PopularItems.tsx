import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { ResponsiveGrid } from "@/components/responsive/ResponsiveGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { popularMenuItems } from "@/data/menu";
import { formatMoney } from "@/lib/money";

export function PopularItems() {
  return (
    <section className="border-b border-sb-line bg-sb-ink py-12 md:py-16">
      <PageContainer>
        <SectionHeader
          actions={<Button href="#menu">Browse full menu</Button>}
          eyebrow={<Badge tone="premium">Popular signatures</Badge>}
          subtitle="A quick scan of premium nigiri and chef-special items before the full menu explorer."
          title="Guest favorites"
        />

        <ResponsiveGrid className="mt-6 md:grid-cols-3 lg:grid-cols-6">
          {popularMenuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square bg-sb-panel-soft">
                <Image
                  alt={item.image.alt || item.name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1180px) 16vw, (min-width: 760px) 33vw, 50vw"
                  src={item.image.publicUrl}
                />
              </div>
              <div className="space-y-2 p-3">
                <h3 className="text-sm font-semibold leading-snug text-sb-rice">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-sb-muted">
                    {item.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-sb-gold-soft">
                    {formatMoney(item.priceCents)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </ResponsiveGrid>
      </PageContainer>
    </section>
  );
}
