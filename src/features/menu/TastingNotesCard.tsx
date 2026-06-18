import { useId } from "react";

import { classNames } from "@/lib/classNames";

interface TastingNotesCardProps {
  className?: string;
}

/** Responsive tasting-notes radar adapted from the reference card artwork. */
export function TastingNotesCard({ className }: TastingNotesCardProps) {
  const idPrefix = useId().replace(/:/g, "");
  const cardGlowAId = `${idPrefix}-tasting-card-glow-a`;
  const cardGlowBId = `${idPrefix}-tasting-card-glow-b`;
  const cardGlowCId = `${idPrefix}-tasting-card-glow-c`;
  const cardBaseId = `${idPrefix}-tasting-card-base`;
  const bottomLineId = `${idPrefix}-tasting-bottom-line`;
  const redGlowId = `${idPrefix}-tasting-red-glow`;
  const labelShadowId = `${idPrefix}-tasting-label-shadow`;

  return (
    <article
      aria-label="Tasting notes radar chart"
      className={classNames(
        "relative aspect-[364/178] w-full overflow-hidden rounded-[14px] border border-white/10 bg-[#07090a] [font-family:Georgia,'Times_New_Roman',serif]",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        fill="none"
        viewBox="0 0 364 178"
      >
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="translate(218 85) rotate(90) scale(100 210)"
            gradientUnits="userSpaceOnUse"
            id={cardGlowAId}
            r="1"
          >
            <stop stopColor="#141413" stopOpacity=".42" />
            <stop offset=".72" stopColor="#141413" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="translate(25 26) rotate(90) scale(120 160)"
            gradientUnits="userSpaceOnUse"
            id={cardGlowBId}
            r="1"
          >
            <stop stopColor="#141918" stopOpacity=".22" />
            <stop offset=".7" stopColor="#141918" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="translate(298 23) rotate(90) scale(70 160)"
            gradientUnits="userSpaceOnUse"
            id={cardGlowCId}
            r="1"
          >
            <stop stopColor="#2a130f" stopOpacity=".13" />
            <stop offset=".7" stopColor="#2a130f" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={cardBaseId}
            x1="182"
            x2="182"
            y1="0"
            y2="171"
          >
            <stop stopColor="#101314" />
            <stop offset=".56" stopColor="#0b0e0f" />
            <stop offset="1" stopColor="#0c0e0f" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={bottomLineId}
            x1="0"
            x2="364"
            y1="170"
            y2="170"
          >
            <stop stopColor="#fff" stopOpacity=".04" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".13" />
            <stop offset="1" stopColor="#fff" stopOpacity=".05" />
          </linearGradient>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="objectBoundingBox"
            height="220%"
            id={redGlowId}
            width="220%"
            x="-60%"
            y="-60%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="1.45"
            />
            <feColorMatrix
              in="blur"
              result="glow"
              type="matrix"
              values="1 0 0 0 .7  0 1 0 0 .04  0 0 1 0 .02  0 0 0 .55 0"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            colorInterpolationFilters="sRGB"
            height="160%"
            id={labelShadowId}
            width="160%"
            x="-30%"
            y="-30%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              floodColor="#000"
              floodOpacity=".96"
              stdDeviation=".7"
            />
          </filter>
        </defs>

        <rect fill="#07090a" height="178" width="364" />
        <path d="M0 0h364v171H0z" fill={`url(#${cardBaseId})`} opacity=".98" />
        <path d="M0 0h364v171H0z" fill={`url(#${cardGlowAId})`} />
        <path d="M0 0h364v171H0z" fill={`url(#${cardGlowBId})`} />
        <path d="M0 0h364v171H0z" fill={`url(#${cardGlowCId})`} />
        <path d="M0 169h364v2H0z" fill={`url(#${bottomLineId})`} opacity=".6" />

        <g
          stroke="#c88934"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.65"
          transform="translate(14 10)"
        >
          <ellipse cx="14" cy="6.7" rx="3.65" ry="5.35" />
          <ellipse cx="14" cy="21.3" rx="3.65" ry="5.35" />
          <ellipse
            cx="7.7"
            cy="10.3"
            rx="3.65"
            ry="5.35"
            transform="rotate(-60 7.7 10.3)"
          />
          <ellipse
            cx="20.3"
            cy="10.3"
            rx="3.65"
            ry="5.35"
            transform="rotate(60 20.3 10.3)"
          />
          <ellipse
            cx="7.7"
            cy="17.7"
            rx="3.65"
            ry="5.35"
            transform="rotate(60 7.7 17.7)"
          />
          <ellipse
            cx="20.3"
            cy="17.7"
            rx="3.65"
            ry="5.35"
            transform="rotate(-60 20.3 17.7)"
          />
          <circle cx="14" cy="14" opacity=".7" r="2.6" />
        </g>

        <text
          fill="#cac7c5"
          filter={`url(#${labelShadowId})`}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="18"
          fontWeight="500"
          letterSpacing=".36"
          x="48"
          y="27"
        >
          Tasting Notes
        </text>

        <g
          fill="none"
          opacity=".72"
          stroke="#4a312a"
          strokeWidth="1.1"
          transform="translate(218 96)"
        >
          <circle opacity=".45" r="13.4" />
          <circle opacity=".52" r="26.4" />
          <circle opacity=".54" r="39.5" />
          <circle opacity=".67" r="53" />
          <line opacity=".65" x1="0" x2="0" y1="0" y2="-57" />
          <line opacity=".58" x1="0" x2="53.3" y1="0" y2="-17.3" />
          <line opacity=".58" x1="0" x2="37" y1="0" y2="50.9" />
          <line opacity=".58" x1="0" x2="-37" y1="0" y2="50.9" />
          <line opacity=".58" x1="0" x2="-53.3" y1="0" y2="-17.3" />
        </g>

        <polygon
          fill="rgba(117,24,17,.34)"
          filter={`url(#${redGlowId})`}
          points="218,43 268,78 248,130 186,130 169,78"
          stroke="#b91710"
          strokeLinejoin="round"
          strokeWidth="2.05"
        />
        <polyline
          fill="none"
          opacity=".42"
          points="218,43 268,78 248,130 186,130 169,78 218,43"
          stroke="#ff261b"
          strokeLinejoin="round"
          strokeWidth=".7"
        />

        <g
          fill="none"
          opacity=".36"
          stroke="#52352d"
          strokeWidth=".9"
          transform="translate(218 96)"
        >
          <circle r="13.4" />
          <circle r="26.4" />
          <circle r="39.5" />
          <circle opacity=".7" r="53" />
          <line x1="0" x2="0" y1="0" y2="-57" />
          <line x1="0" x2="53.3" y1="0" y2="-17.3" />
          <line x1="0" x2="37" y1="0" y2="50.9" />
          <line x1="0" x2="-37" y1="0" y2="50.9" />
          <line x1="0" x2="-53.3" y1="0" y2="-17.3" />
        </g>

        <g filter={`url(#${redGlowId})`} fill="#ff2117">
          <circle cx="218" cy="43" r="3.7" />
          <circle cx="268" cy="78" r="3.7" />
          <circle cx="248" cy="130" r="3.7" />
          <circle cx="186" cy="130" r="3.7" />
          <circle cx="169" cy="78" r="3.7" />
        </g>

        <g
          fill="#aaa5a3"
          filter={`url(#${labelShadowId})`}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="14"
          fontWeight="600"
        >
          <text textAnchor="middle" x="218" y="30">
            Richness
          </text>
          <text textAnchor="middle" x="120" y="84">
            Sweetness
          </text>
          <text x="286" y="84">
            Umami
          </text>
          <text textAnchor="middle" x="134" y="155">
            Tenderness
          </text>
          <text textAnchor="middle" x="292" y="158">
            Buttery
          </text>
        </g>
      </svg>
    </article>
  );
}
