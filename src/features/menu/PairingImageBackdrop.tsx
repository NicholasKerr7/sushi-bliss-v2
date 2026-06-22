import Image from "next/image";

import { isSakePairingImage } from "@/lib/assets";

interface PairingImageBackdropProps {
  imageUrl: string;
  sizes: string;
}

/** Adds ambient fill behind portrait pairing photos without cropping the foreground. */
export function PairingImageBackdrop({
  imageUrl,
  sizes,
}: PairingImageBackdropProps) {
  if (!isSakePairingImage(imageUrl)) {
    return null;
  }

  return (
    <Image
      alt=""
      aria-hidden="true"
      className="scale-110 object-cover opacity-28 blur-md"
      fill
      sizes={sizes}
      src={imageUrl}
    />
  );
}
