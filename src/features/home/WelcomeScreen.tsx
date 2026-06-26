import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { getSushiIconAssets } from "@/data/iconAssets";
import { getBrandContent, getFeaturedAssets } from "@/lib/data";

const brand = getBrandContent();
const featuredAssets = getFeaturedAssets();
const icons = getSushiIconAssets();

/** Renders the first-run mobile welcome experience. */
export function WelcomeScreen() {
  return (
    <section
      aria-label="Sushi Bliss welcome"
      className="sushi-stage relative min-h-[100svh] overflow-hidden bg-black px-5 pb-7 pt-8 text-center text-white md:hidden"
      id="welcome"
    >
      <Image
        alt=""
        className="object-cover object-[29%_50%] opacity-70"
        fill
        fetchPriority="high"
        loading="eager"
        priority
        sizes="(max-width: 767px) 100vw, 1px"
        src="/assets/textures/red-moon-sakura-background.webp"
      />
      <div className="absolute inset-x-[-12%] top-[22%] h-[31%]">
        <Image
          alt=""
          className="object-contain opacity-95 [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]"
          fill
          fetchPriority="high"
          loading="eager"
          priority
          sizes="(max-width: 767px) 130vw, 1px"
          src={featuredAssets.heroSushi.publicUrl}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.12)_28%,rgba(0,0,0,0.88)_61%,rgba(0,0,0,0.99)_100%)]" />
      <div className="sb-wave-pattern absolute bottom-[28%] left-0 h-44 w-64 opacity-20" />
      <div className="sb-wave-pattern absolute bottom-20 right-0 h-36 w-56 rotate-180 opacity-18" />

      <div className="mobile-frame relative z-10 flex min-h-[calc(100svh-3.75rem)] flex-col justify-end">
        <div className="mb-auto mt-4 flex flex-col items-center">
          <AssetIcon
            alt={brand.name}
            className="drop-shadow-[0_0_30px_rgba(202,164,93,0.24)]"
            size={78}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <p className="editorial-title mt-3 text-[28px] uppercase leading-[1.16] tracking-[0.32em] text-white">
            Sushi
            <span className="block">Bliss</span>
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <h1 className="editorial-title text-[40px] uppercase leading-[0.9] text-white">
              Sushi
              <span className="block text-[var(--sb-red-bright)]">Bliss</span>
            </h1>
            <div className="mx-auto mt-5 flex max-w-[170px] items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[var(--sb-gold)]" />
              <AssetIcon src={icons.flower} size={28} />
              <span className="h-px flex-1 bg-[var(--sb-gold)]" />
            </div>
            <p className="mx-auto mt-5 max-w-[340px] text-[18px] leading-[1.38] text-[var(--sb-gold)] min-[390px]:text-[20px]">
              Timeless Japanese artistry. Authentic. Refined. Unforgettable.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              className="red-glow-button flex h-[58px] w-full items-center rounded-[16px] border border-[var(--sb-red-bright)] px-6 text-[14px] font-semibold uppercase tracking-[0.14em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:h-[64px] min-[390px]:rounded-[18px] min-[390px]:px-8 min-[390px]:text-[16px] min-[390px]:tracking-[0.16em]"
              href="/menu"
            >
              <AssetIcon
                className="mr-3 min-[390px]:mr-4"
                size={24}
                src={icons.flower}
              />
              <span className="flex-1">Explore Menu</span>
              <span className="text-[var(--sb-gold)]" aria-hidden="true">
                <ChevronIcon direction="right" size={18} />
              </span>
            </Link>
            <Link
              className="flex h-[56px] w-full items-center rounded-[15px] border border-[var(--sb-border-strong)] bg-black/34 px-6 text-[14px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold)] backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:h-[62px] min-[390px]:rounded-[16px] min-[390px]:px-8 min-[390px]:text-[16px] min-[390px]:tracking-[0.22em]"
              href="/profile"
            >
              <AssetIcon
                className="mr-3 min-[390px]:mr-4"
                size={24}
                src={icons.profile}
              />
              <span className="flex-1">Sign In</span>
              <ChevronIcon direction="right" size={18} />
            </Link>
            <Link
              className="mx-auto flex h-12 items-center justify-center gap-4 px-4 text-[15px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
              href="/home"
            >
              Continue As Guest
              <ChevronIcon direction="right" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
