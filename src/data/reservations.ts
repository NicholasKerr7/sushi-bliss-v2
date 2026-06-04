import { locations } from "@/data/locations";
import { mockUser } from "@/data/mockUser";
import type {
  Reservation,
  ReservationDraft,
  ReservationExperience,
} from "@/types/reservation";
import type { UserProfile } from "@/types/user";

export const reservationExperiences: ReservationExperience[] = [
  {
    description:
      "Chef-led seasonal tasting with nigiri, sashimi, and a closing dessert.",
    durationMinutes: 120,
    id: "chef-omakase",
    imageUrl: "/assets/editorial/premium-sushi-preparation-still-life.webp",
    premium: true,
    priceLabel: "$185 per guest",
    title: "Chef Omakase",
  },
  {
    description:
      "A focused counter experience built around premium nigiri and sake pairings.",
    durationMinutes: 90,
    id: "sushi-counter",
    imageUrl: "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
    priceLabel: "$95 per guest",
    title: "Sushi Counter",
  },
  {
    description:
      "A relaxed table reservation for a la carte dining and shared plates.",
    durationMinutes: 105,
    id: "dining-room",
    imageUrl:
      "/assets/gallery/serene-illuminated-courtyard-with-red-blossoms.webp",
    priceLabel: "A la carte",
    title: "Dining Room",
  },
];

export const seatingPreferences = [
  "Chef counter",
  "Dining table",
  "Private booth",
  "Garden room",
];

export const reservationOccasions = [
  "Date night",
  "Birthday",
  "Anniversary",
  "Business dinner",
  "No occasion",
];

export function getDefaultReservationDraft(
  profile: Pick<UserProfile, "name" | "phone"> = mockUser,
): ReservationDraft {
  return {
    date: "",
    experienceId: reservationExperiences[0]?.id || "",
    guestName: profile.name,
    guestPhone: profile.phone,
    locationId: locations[0]?.id || "",
    notes: "",
    occasion: reservationOccasions[0],
    partySize: 2,
    seatingPreference: seatingPreferences[0],
    time: "",
  };
}

export function getMockReservations(): Reservation[] {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);
  futureDate.setHours(19, 30, 0, 0);

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 10);
  pastDate.setHours(18, 0, 0, 0);

  return [
    {
      confirmationCode: "RSV-LIVE-8421",
      experienceId: "chef-omakase",
      guestName: mockUser.name,
      guestPhone: mockUser.phone,
      id: "mock-upcoming-reservation",
      locationId: "tokyo-rooftop",
      occasion: "Anniversary",
      partySize: 2,
      seatingPreference: "Chef counter",
      startsAt: futureDate.toISOString(),
      status: "confirmed",
    },
    {
      confirmationCode: "RSV-PAST-2108",
      experienceId: "dining-room",
      guestName: mockUser.name,
      guestPhone: mockUser.phone,
      id: "mock-past-reservation",
      locationId: "sushi-bar",
      occasion: "Business dinner",
      partySize: 4,
      seatingPreference: "Dining table",
      startsAt: pastDate.toISOString(),
      status: "modified",
    },
  ];
}
