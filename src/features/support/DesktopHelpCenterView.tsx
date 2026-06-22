"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { contactMethods, helpArticles } from "@/data/support";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import type { HelpArticle } from "@/types/support";

import { desktopSupportHelpCategories } from "./DesktopSupportData";

export function DesktopHelpCenter({
  selectedArticle,
  onOpenArticle,
  onOpenContact,
}: {
  selectedArticle: HelpArticle | null;
  onOpenArticle: (article: HelpArticle | null) => void;
  onOpenContact: () => void;
}) {
  return (
    <main className="mx-auto max-w-[1672px] px-7 pb-4 pt-4">
      <section className="relative min-h-[220px] overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[#07090a] p-6">
        <Image
          alt=""
          className="object-cover object-[80%_44%] opacity-72"
          fill
          loading="eager"
          priority
          sizes="1672px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.98),rgba(7,9,10,0.82)_42%,rgba(7,9,10,0.22)_80%)]" />
        <div className="relative z-10">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            We&apos;re here to help
          </p>
          <h1 className="editorial-title mt-2 text-[52px] uppercase leading-none tracking-[0.08em]">
            How can{" "}
            <span className="text-[var(--sb-red-bright)]">we help?</span>
          </h1>
          <p className="mt-2 max-w-[620px] text-[17px] leading-7 text-[var(--sb-gold-soft)]">
            Find answers, get support, and discover everything you need for an
            exceptional Sushi Bliss experience.
          </p>
          <label className="relative mt-4 block w-[640px]">
            <span className="sr-only">Search help articles</span>
            <AssetIcon
              className="absolute left-5 top-1/2 -translate-y-1/2"
              size={22}
              src="/assets/icons/search-icon.png"
            />
            <input
              className="h-[48px] w-full rounded-[10px] border border-[var(--sb-gold)]/26 bg-black/36 pl-14 pr-4 text-[16px] text-white outline-none placeholder:text-white/42"
              placeholder="Search for help articles, topics, or questions..."
            />
          </label>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-6 gap-4">
        {desktopSupportHelpCategories.map((category) => {
          const article =
            helpArticles.find((item) => item.id === category.articleId) ||
            helpArticles[0] ||
            null;

          return (
            <button
              className="min-h-[146px] rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4 text-center"
              key={category.title}
              onClick={() => onOpenArticle(article)}
              type="button"
            >
              <AssetIcon className="mx-auto" size={46} src={category.icon} />
              <span className="editorial-title mt-3 block text-[17px] uppercase text-white">
                {category.title}
              </span>
              <span className="mt-2 block text-[13px] leading-5 text-white/62">
                {category.copy}
              </span>
              <span
                className="mt-3 block text-[var(--sb-gold-soft)]"
                aria-hidden="true"
              >
                <ChevronIcon direction="right" size={18} />
              </span>
            </button>
          );
        })}
      </section>

      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_500px] gap-4">
        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Popular help topics
            </h2>
            <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              {helpArticles.length} articles
            </span>
          </div>
          <div className="mt-3 overflow-hidden rounded-[10px] border border-white/10">
            {helpArticles.map((article) => (
              <button
                className="grid min-h-[45px] w-full grid-cols-[220px_1fr_24px] items-center gap-5 border-b border-white/10 px-4 text-left last:border-b-0"
                key={article.id}
                onClick={() => onOpenArticle(article)}
                type="button"
              >
                <span className="text-[15px] text-white">{article.title}</span>
                <span className="text-[14px] text-white/54">
                  {article.summary}
                </span>
                <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
                  <ChevronIcon direction="right" size={18} />
                </span>
              </button>
            ))}
          </div>
          {selectedArticle ? (
            <div className="mt-4 rounded-[12px] border border-[var(--sb-gold)]/20 bg-black/24 p-4">
              <h3 className="text-[16px] text-white">
                {selectedArticle.title}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-white/58">
                {selectedArticle.body[0]}
              </p>
            </div>
          ) : null}
        </article>

        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Need more help?
          </h2>
          <p className="mt-2 text-[15px] text-white/62">
            Our support team is here for you.
          </p>
          {contactMethods.map((method) => (
            <div
              className="mt-4 grid grid-cols-[50px_1fr] border-b border-white/10 pb-3 last:border-b-0"
              key={method.id}
            >
              <AssetIcon
                size={34}
                src={
                  method.id === "phone"
                    ? "/assets/icons/phone-icon.png"
                    : method.id === "email"
                      ? "/assets/icons/email-icon.png"
                      : "/assets/icons/headset-icon.png"
                }
              />
              <p>
                <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
                  {method.label} us
                </span>
                <span className="mt-1 block text-[16px] text-white">
                  {method.value}
                </span>
                <span className="mt-1 block text-[14px] text-white/54">
                  {method.description}
                </span>
              </p>
            </div>
          ))}
          <Button
            className="mt-4 h-[50px] w-full rounded-[10px] text-[15px] uppercase tracking-[0.08em]"
            onClick={onOpenContact}
          >
            Contact support
          </Button>
        </article>
      </section>

      <div className="mt-4">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
