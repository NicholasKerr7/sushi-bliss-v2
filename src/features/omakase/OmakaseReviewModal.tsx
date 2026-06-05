"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/money";
import type { OmakaseReview, SakePairingOption } from "@/types/omakase";

interface OmakaseReviewModalProps {
  onGuestCountChange: (guestCount: number) => void;
  onOpenChange: (open: boolean) => void;
  onSakePairingChange: (pairingId: string) => void;
  open: boolean;
  review: OmakaseReview;
  sakePairingId: string;
  sakePairingOptions: SakePairingOption[];
}

export function OmakaseReviewModal({
  onGuestCountChange,
  onOpenChange,
  onSakePairingChange,
  open,
  review,
  sakePairingId,
  sakePairingOptions,
}: OmakaseReviewModalProps) {
  const packageSubtotal = review.package.priceCents * review.guestCount;
  const pairingSubtotal = review.sakePairing
    ? review.sakePairing.priceCents * review.guestCount
    : 0;

  return (
    <Modal
      description="Review guests, pairing, courses, and reservation next step."
      footer={
        <div className="grid gap-3 sm:grid-cols-2">
          <Button href="/reservations" onClick={() => onOpenChange(false)}>
            Reserve package
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Keep browsing
          </Button>
        </div>
      }
      onOpenChange={onOpenChange}
      open={open}
      title={review.package.title}
    >
      <div className="space-y-5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sb-panel-soft">
          <Image
            alt={review.package.image.alt || review.package.title}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 32rem, 100vw"
            src={review.package.image.publicUrl}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <StatusBadge tone={review.package.accent}>
              {review.package.subtitle}
            </StatusBadge>
            <p className="mt-2 text-sm text-sb-muted">
              {review.package.durationMinutes} minutes
            </p>
          </div>
          <QuantityControl
            max={review.package.guestRange.max}
            min={review.package.guestRange.min}
            onChange={onGuestCountChange}
            value={review.guestCount}
          />
        </div>

        <Select
          id="omakase-sake-pairing"
          label="Sake pairing"
          onChange={(event) => onSakePairingChange(event.target.value)}
          options={[
            { label: "No pairing", value: "" },
            ...sakePairingOptions.map((pairing) => ({
              label: `${pairing.label} - ${formatMoney(pairing.priceCents)} per guest`,
              value: pairing.id,
            })),
          ]}
          value={sakePairingId}
        />

        <div className="grid gap-3">
          {review.package.courses.map((course) => (
            <div
              className="grid grid-cols-[5rem_1fr] gap-3 rounded-card border border-sb-line bg-sb-ink/45 p-3"
              key={course.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
                <Image
                  alt={course.image.alt || course.title}
                  className="object-cover"
                  fill
                  sizes="5rem"
                  src={course.image.publicUrl}
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-sb-dim">
                  {course.label}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-sb-rice">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-sb-muted">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-4">
          <div className="flex justify-between gap-3 text-sm text-sb-muted">
            <span>Package subtotal</span>
            <span className="font-mono text-sb-rice">
              {formatMoney(packageSubtotal)}
            </span>
          </div>
          <div className="mt-2 flex justify-between gap-3 text-sm text-sb-muted">
            <span>Sake pairing</span>
            <span className="font-mono text-sb-rice">
              {formatMoney(pairingSubtotal)}
            </span>
          </div>
          <div className="mt-3 flex justify-between gap-3 border-t border-sb-gold/25 pt-3 text-base font-semibold text-sb-rice">
            <span>Review total</span>
            <span className="font-mono">{formatMoney(review.totalCents)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
