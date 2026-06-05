"use client";

import { useCallback, useMemo, useState } from "react";

import { omakasePackages, sakePairingOptions } from "@/data/omakase";
import { createOmakaseReview } from "@/lib/omakase";

/** Manages omakase package selection, guest count bounds, and pairing totals. */
export function useOmakase() {
  const [selectedPackageId, setSelectedPackageId] = useState(
    omakasePackages[0]?.id || "",
  );
  const [guestCount, setGuestCount] = useState(
    omakasePackages[0]?.guestRange.min || 1,
  );
  const [sakePairingId, setSakePairingId] = useState("");

  const selectedPackage = useMemo(
    () =>
      omakasePackages.find(
        (omakasePackage) => omakasePackage.id === selectedPackageId,
      ) || omakasePackages[0],
    [selectedPackageId],
  );
  const review = useMemo(
    () => createOmakaseReview(selectedPackageId, guestCount, sakePairingId),
    [guestCount, sakePairingId, selectedPackageId],
  );

  const selectPackage = useCallback((packageId: string) => {
    const nextPackage =
      omakasePackages.find(
        (omakasePackage) => omakasePackage.id === packageId,
      ) || omakasePackages[0];

    setSelectedPackageId(nextPackage.id);
    setGuestCount(nextPackage.guestRange.min);
    setSakePairingId("");
  }, []);

  const updateGuestCount = useCallback(
    (nextGuestCount: number) => {
      if (!selectedPackage) {
        setGuestCount(nextGuestCount);
        return;
      }

      setGuestCount(
        Math.min(
          Math.max(nextGuestCount, selectedPackage.guestRange.min),
          selectedPackage.guestRange.max,
        ),
      );
    },
    [selectedPackage],
  );

  return {
    guestCount,
    omakasePackages,
    review,
    sakePairingId,
    sakePairingOptions,
    selectedPackage,
    selectPackage,
    setSakePairingId,
    updateGuestCount,
  };
}
