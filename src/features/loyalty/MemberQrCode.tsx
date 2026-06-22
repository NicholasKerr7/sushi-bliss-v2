import Image from "next/image";

import { classNames } from "@/lib/classNames";

const memberQrCodeIcon = "/assets/icons/qr-code-icon.png";

export function MemberQrCode({
  className,
  imageClassName,
  memberCode,
  priority = false,
  sizes = "152px",
}: {
  className?: string;
  imageClassName?: string;
  memberCode: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      aria-label={`QR code for ${memberCode}`}
      className={classNames(
        "relative shrink-0 overflow-hidden rounded-[14px] border border-[var(--sb-gold)]/34 bg-black/42",
        className,
      )}
      role="img"
    >
      <Image
        alt=""
        className={classNames("object-contain", imageClassName)}
        fill
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        src={memberQrCodeIcon}
      />
    </div>
  );
}
