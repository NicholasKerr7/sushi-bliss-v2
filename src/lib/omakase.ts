import { omakasePackages, sakePairingOptions } from "@/data/omakase";
import type {
  OmakasePackage,
  OmakaseReview,
  SakePairingOption,
} from "@/types/omakase";

export function getOmakasePackageById(
  packageId: string,
): OmakasePackage | undefined {
  return omakasePackages.find(
    (omakasePackage) => omakasePackage.id === packageId,
  );
}

export function getSakePairingById(
  pairingId: string,
): SakePairingOption | undefined {
  return sakePairingOptions.find((pairing) => pairing.id === pairingId);
}

/** Builds an omakase review total from package price, guest count, and pairing choice. */
export function createOmakaseReview(
  packageId: string,
  guestCount: number,
  sakePairingId: string,
): OmakaseReview {
  const selectedPackage =
    getOmakasePackageById(packageId) || omakasePackages[0];
  const boundedGuestCount = Math.min(
    Math.max(guestCount, selectedPackage.guestRange.min),
    selectedPackage.guestRange.max,
  );
  const sakePairing = sakePairingId
    ? getSakePairingById(sakePairingId)
    : undefined;
  const packageSubtotal = selectedPackage.priceCents * boundedGuestCount;
  const pairingSubtotal = sakePairing
    ? sakePairing.priceCents * boundedGuestCount
    : 0;

  return {
    guestCount: boundedGuestCount,
    package: selectedPackage,
    sakePairing,
    subtotalCents: packageSubtotal,
    totalCents: packageSubtotal + pairingSubtotal,
  };
}
