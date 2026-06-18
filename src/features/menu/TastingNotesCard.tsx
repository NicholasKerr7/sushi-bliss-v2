import { useId } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";
import { ASSET_FALLBACKS } from "@/lib/constants";
import type { MenuTastingProfile } from "@/types/menu";

interface TastingNotesCardProps {
  className?: string;
  profile?: MenuTastingProfile;
}

const DEFAULT_TASTING_PROFILE: MenuTastingProfile = {
  buttery: 72,
  richness: 82,
  sweetness: 64,
  tenderness: 78,
  umami: 86,
};

const TASTING_AXES = [
  { angle: -90, key: "richness", label: "Richness" },
  { angle: -18, key: "umami", label: "Umami" },
  { angle: 54, key: "buttery", label: "Buttery" },
  { angle: 126, key: "tenderness", label: "Tenderness" },
  { angle: 198, key: "sweetness", label: "Sweetness" },
] as const satisfies ReadonlyArray<{
  angle: number;
  key: keyof MenuTastingProfile;
  label: string;
}>;

const RADAR_CENTER = { x: 64, y: 64 };
const RADAR_RADIUS = 42;

function normalizeTastingValue(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function getRadarCoordinate(value: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  const radius = (normalizeTastingValue(value) / 100) * RADAR_RADIUS;

  return {
    x: Number((RADAR_CENTER.x + Math.cos(radians) * radius).toFixed(1)),
    y: Number((RADAR_CENTER.y + Math.sin(radians) * radius).toFixed(1)),
  };
}

function getProfileSummary(profile: MenuTastingProfile): string {
  return `Tasting notes radar chart: richness ${profile.richness}, umami ${profile.umami}, buttery ${profile.buttery}, tenderness ${profile.tenderness}, sweetness ${profile.sweetness}`;
}

function getPrimaryNotes(profile: MenuTastingProfile) {
  return [...TASTING_AXES]
    .sort((a, b) => profile[b.key] - profile[a.key])
    .slice(0, 3);
}

/** Renders the menu item's dynamic flavor profile using app-native typography. */
export function TastingNotesCard({
  className,
  profile = DEFAULT_TASTING_PROFILE,
}: TastingNotesCardProps) {
  const idPrefix = useId().replace(/:/g, "");
  const redGlowId = `${idPrefix}-tasting-red-glow`;
  const radarFillId = `${idPrefix}-tasting-radar-fill`;
  const radarCoordinates = TASTING_AXES.map((axis) =>
    getRadarCoordinate(profile[axis.key], axis.angle),
  );
  const radarPoints = radarCoordinates
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const primaryNotes = getPrimaryNotes(profile);

  return (
    <article
      aria-label={getProfileSummary(profile)}
      className={classNames(
        "relative flex h-full min-h-[150px] w-full overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018)_42%,rgba(7,9,10,0.96))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_45px_rgba(0,0,0,0.26)]",
        className,
      )}
    >
      <span className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.18),transparent_68%)]" />
      <span className="pointer-events-none absolute -bottom-10 left-4 h-20 w-32 rounded-full bg-[radial-gradient(ellipse,rgba(239,47,37,0.16),transparent_68%)] blur-md" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.36),transparent)]" />

      <div className="relative z-10 flex min-h-0 w-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5 pr-5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/42 shadow-[0_0_22px_rgba(215,168,79,0.16)]">
              <AssetIcon
                loading="eager"
                size={24}
                src={ASSET_FALLBACKS.brandIcon}
              />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
                Tasting Notes
              </h2>
              <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]/82">
                Item profile
              </p>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_14px_rgba(239,47,37,0.82)]"
          />
          <span className="sr-only">
            Dynamic tasting profile based on the selected menu item.
          </span>
        </div>

        <div className="mt-2 grid min-h-0 flex-1 grid-cols-[minmax(90px,0.82fr)_minmax(0,1fr)] items-center gap-3">
          <div className="relative mx-auto aspect-square h-full max-h-[112px] min-h-[86px] w-full max-w-[112px]">
            <svg
              aria-hidden="true"
              className="h-full w-full overflow-visible"
              fill="none"
              viewBox="0 0 128 128"
            >
              <defs>
                <radialGradient
                  cx="0"
                  cy="0"
                  gradientTransform="translate(64 64) rotate(90) scale(56)"
                  gradientUnits="userSpaceOnUse"
                  id={radarFillId}
                  r="1"
                >
                  <stop stopColor="#ef2f25" stopOpacity=".42" />
                  <stop offset=".62" stopColor="#8f140f" stopOpacity=".3" />
                  <stop offset="1" stopColor="#45100d" stopOpacity=".12" />
                </radialGradient>
                <filter
                  colorInterpolationFilters="sRGB"
                  height="180%"
                  id={redGlowId}
                  width="180%"
                  x="-40%"
                  y="-40%"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation="1.4"
                  />
                  <feColorMatrix
                    in="blur"
                    result="glow"
                    type="matrix"
                    values="1 0 0 0 .85  0 1 0 0 .05  0 0 1 0 .03  0 0 0 .55 0"
                  />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {[14, 28, 42].map((radius) => (
                <circle
                  cx={RADAR_CENTER.x}
                  cy={RADAR_CENTER.y}
                  key={radius}
                  opacity={radius === 42 ? 0.65 : 0.38}
                  r={radius}
                  stroke="#d7a84f"
                  strokeWidth="1"
                />
              ))}

              {TASTING_AXES.map((axis) => {
                const point = getRadarCoordinate(100, axis.angle);

                return (
                  <line
                    key={axis.key}
                    opacity=".28"
                    stroke="#f1d28a"
                    strokeWidth="1"
                    x1={RADAR_CENTER.x}
                    x2={point.x}
                    y1={RADAR_CENTER.y}
                    y2={point.y}
                  />
                );
              })}

              <polygon
                fill={`url(#${radarFillId})`}
                filter={`url(#${redGlowId})`}
                points={radarPoints}
                stroke="#ef2f25"
                strokeLinejoin="round"
                strokeWidth="2"
              />

              {radarCoordinates.map((point, index) => (
                <circle
                  cx={point.x}
                  cy={point.y}
                  fill="#ff3a2f"
                  key={TASTING_AXES[index].key}
                  r="3.3"
                  stroke="#ffb1a8"
                  strokeWidth=".8"
                />
              ))}

              <circle
                cx={RADAR_CENTER.x}
                cy={RADAR_CENTER.y}
                fill="#d7a84f"
                opacity=".82"
                r="2"
              />
            </svg>
          </div>

          <div className="grid min-w-0 gap-1.5">
            {primaryNotes.map((note) => (
              <div className="min-w-0" key={note.key}>
                <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.08em]">
                  <span className="truncate text-white/66">{note.label}</span>
                  <span className="font-mono text-[var(--sb-gold-soft)]">
                    {profile[note.key]}
                  </span>
                </div>
                <svg
                  aria-hidden="true"
                  className="mt-1 h-1.5 w-full overflow-visible rounded-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 6"
                >
                  <rect
                    fill="rgba(255,255,255,0.1)"
                    height="6"
                    rx="3"
                    width="100"
                  />
                  <rect
                    fill="#ef2f25"
                    height="6"
                    rx="3"
                    width={normalizeTastingValue(profile[note.key])}
                  />
                  <rect
                    fill="rgba(241,210,138,0.72)"
                    height="6"
                    opacity=".7"
                    rx="3"
                    width={normalizeTastingValue(profile[note.key]) * 0.42}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
