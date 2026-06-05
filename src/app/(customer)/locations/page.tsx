import type { Metadata } from "next";

import { LocationsDirectory } from "@/features/locations/LocationsDirectory";

export const metadata: Metadata = {
  title: "Locations",
};

export default function LocationsPage() {
  return <LocationsDirectory />;
}
