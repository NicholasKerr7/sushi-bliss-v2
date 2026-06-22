"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { Chef } from "@/types/chef";
import type { MenuItem } from "@/types/menu";

import {
  getChefDishPreview,
  getChefOmakaseCoursePreviews,
  type ChefOmakaseCoursePreview,
} from "./chefProfileContent";

interface ChefDetailModalProps {
  chef: Chef | null;
  onOpenChange: (open: boolean) => void;
}

export function ChefDetailModal({ chef, onOpenChange }: ChefDetailModalProps) {
  const omakaseCourses = chef ? getChefOmakaseCoursePreviews(chef) : [];
  const menuPreviewDishes = chef ? getChefDishPreview(chef) : [];

  return (
    <Modal
      className="!max-h-[calc(100dvh-2rem)] !max-w-[1120px]"
      description={chef?.position}
      onOpenChange={onOpenChange}
      open={Boolean(chef)}
      title={chef?.name || "Chef profile"}
    >
      {chef ? (
        <div className="space-y-5">
          <section className="grid overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_28px_90px_rgba(0,0,0,0.48)] md:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]">
            <div className="relative min-h-[420px] bg-black/50 sm:min-h-[500px]">
              <Image
                alt={chef.standingImage.alt || chef.name}
                className="object-cover object-top"
                fill
                sizes="(min-width: 1024px) 430px, 100vw"
                src={chef.standingImage.publicUrl}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.42)_62%,rgba(0,0,0,0.9)_100%)]" />
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--sb-gold)]/46 bg-black/54 shadow-[0_0_26px_rgba(215,168,79,0.18)]">
                  <AssetIcon
                    loading="eager"
                    size={30}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                </span>
                <StatusBadge tone="premium">Master chef</StatusBadge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                  {chef.position}
                </p>
                <h3 className="editorial-title mt-3 text-[42px] uppercase leading-[0.94] tracking-[0.05em] text-white">
                  {chef.name}
                </h3>
                <p className="mt-3 max-w-[360px] text-[15px] leading-6 text-white/66">
                  {chef.specialty}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-col p-5 sm:p-6 lg:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge tone="premium">Counter profile</StatusBadge>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/54">
                  Seasonal service
                </span>
              </div>

              <p className="mt-5 text-[15px] leading-7 text-white/66">
                {chef.about}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ChefSignalCard
                  icon="/assets/icons/sushi-menu-icon.png"
                  label="Signature lane"
                  value={chef.sushi}
                />
                <ChefSignalCard
                  icon="/assets/icons/sashimi-icon.png"
                  label="Knife work"
                  value={chef.sashimi}
                />
              </div>

              <div className="mt-5 grid overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/28 sm:grid-cols-[168px_minmax(0,1fr)]">
                <div className="relative min-h-[154px]">
                  <Image
                    alt={chef.platingImage.alt || `${chef.name} plating sushi`}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 168px, 100vw"
                    src={chef.platingImage.publicUrl}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.38))]" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-red-bright)]">
                    Counter approach
                  </p>
                  <h4 className="mt-2 text-[20px] font-semibold leading-tight text-white">
                    Built around timing, temperature, and restraint.
                  </h4>
                  <p className="mt-3 text-[13px] leading-6 text-white/58">
                    Each plate preview below reflects the chef&apos;s core
                    service language and links back to the live menu surface.
                  </p>
                </div>
              </div>

              <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-2">
                <Button
                  className="h-[52px] rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  href="/reservations"
                  onClick={() => onOpenChange(false)}
                >
                  Reserve counter
                </Button>
                <Button
                  className="h-[52px] rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  href="/omakase"
                  onClick={() => onOpenChange(false)}
                  variant="secondary"
                >
                  View omakase
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-[20px] border border-[var(--sb-border)] bg-white/[0.035] p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                  Chef omakase
                </p>
                <h3 className="editorial-title mt-2 text-[24px] uppercase tracking-[0.06em] text-white">
                  Course preview
                </h3>
              </div>
              <span className="rounded-full border border-[var(--sb-gold)]/30 bg-black/24 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Chef-led tasting
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {omakaseCourses.map((course) => (
                <ChefOmakaseCourseCard
                  course={course}
                  key={`${course.label}-${course.name}`}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-[var(--sb-border)] bg-black/24 p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                  Related menu
                </p>
                <h3 className="editorial-title mt-2 text-[22px] uppercase tracking-[0.06em] text-white">
                  Orderable picks
                </h3>
              </div>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[var(--sb-gold)]/30 bg-black/24 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href="/menu"
                onClick={() => onOpenChange(false)}
              >
                Full menu
                <ChevronIcon direction="right" size={15} />
              </Link>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {menuPreviewDishes.map((dish, index) => (
                <ChefDishPreviewCard
                  dish={dish}
                  index={index}
                  key={dish.id}
                  onNavigate={() => onOpenChange(false)}
                />
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </Modal>
  );
}

function ChefSignalCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border border-[var(--sb-border)] bg-black/28 p-3">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-black/46">
        <AssetIcon size={26} src={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
          {label}
        </p>
        <p className="mt-1 line-clamp-2 text-[12px] font-semibold leading-4 text-[var(--sb-gold-soft)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ChefOmakaseCourseCard({
  course,
}: {
  course: ChefOmakaseCoursePreview;
}) {
  return (
    <article
      className={classNames(
        "flex min-h-[318px] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_58px_rgba(0,0,0,0.34)]",
        course.sequence === 1 && "shadow-[0_0_34px_rgba(239,47,37,0.13)]",
      )}
    >
      <div className="relative min-h-[190px] overflow-hidden bg-black/34">
        <Image
          alt={course.image.alt || course.name}
          className="object-cover object-[50%_56%]"
          fill
          loading="eager"
          sizes="(min-width: 1024px) 340px, 50vw"
          src={course.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.66))]" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/12 bg-black/62 px-2.5 py-1 font-mono text-[10px] text-[var(--sb-gold-soft)]">
            0{course.sequence}
          </span>
          <span className="truncate rounded-full border border-[var(--sb-gold)]/26 bg-black/52 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Omakase
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
          {course.label}
        </p>
        <h4 className="editorial-title mt-3 line-clamp-3 text-[18px] leading-tight text-white">
          {course.name}
        </h4>
        <p className="mt-auto pt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-red-bright)]">
          Chef course
        </p>
      </div>
    </article>
  );
}

function ChefDishPreviewCard({
  dish,
  index,
  onNavigate,
}: {
  dish: MenuItem;
  index: number;
  onNavigate: () => void;
}) {
  return (
    <Link
      aria-label={`Browse ${dish.name} in the menu`}
      className={classNames(
        "group overflow-hidden rounded-[18px] border border-white/10 bg-black/34 transition hover:-translate-y-0.5 hover:border-[var(--sb-gold)]/38 hover:bg-black/46 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
        index === 0 && "md:shadow-[0_0_34px_rgba(239,47,37,0.14)]",
      )}
      href={`/menu?category=${dish.category}`}
      onClick={onNavigate}
    >
      <div className="relative min-h-[164px] overflow-hidden">
        <Image
          alt={dish.image.alt || dish.name}
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          src={dish.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/12 bg-black/58 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/72">
            {dish.categoryLabel}
          </span>
          <span className="font-mono text-[15px] text-[var(--sb-gold-soft)]">
            {formatMoney(dish.priceCents)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="editorial-title line-clamp-2 text-[18px] leading-tight text-white">
          {dish.name}
        </h4>
        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-white/56">
          {dish.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-red-bright)]">
            Preview dish
          </span>
          <ChevronIcon
            className="text-[var(--sb-gold-soft)] transition group-hover:translate-x-0.5"
            direction="right"
            size={16}
          />
        </div>
      </div>
    </Link>
  );
}
