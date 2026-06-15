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
      "An elevated dining experience in our elegant main dining room.",
    durationMinutes: 105,
    id: "dining-room",
    imageUrl: "/assets/gallery/intimate-upscale-dining-room-setting.webp",
    priceLabel: "A la carte",
    title: "Main Dining Room",
  },
  {
    description:
      "Sit at the sushi bar and watch our chefs craft each piece with precision.",
    durationMinutes: 90,
    id: "sushi-counter",
    imageUrl: "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
    priceLabel: "$95 per guest",
    title: "Sushi Bar Seating",
  },
  {
    description: "An intimate multi-course journey curated by our head chef.",
    durationMinutes: 120,
    id: "chef-omakase",
    imageUrl: "/assets/chefs/hiroshi-tanaka-head-chef-plating.webp",
    premium: true,
    priceLabel: "$185 per guest",
    title: "Chef's Counter Omakase",
  },
  {
    description:
      "Enjoy a private and exclusive dining experience for you and your guests.",
    durationMinutes: 150,
    id: "private-dining",
    imageUrl: "/assets/gallery/intimate-dining-in-warm-moody-tones.webp",
    premium: true,
    priceLabel: "$240 per guest",
    title: "Private Dining",
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
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 5);

  return {
    date: defaultDate.toISOString().slice(0, 10),
    experienceId: reservationExperiences[0]?.id || "",
    guestName: profile.name,
    guestPhone: profile.phone,
    locationId: locations[0]?.id || "",
    notes: "",
    occasion: reservationOccasions[0],
    partySize: 2,
    seatingPreference: seatingPreferences[0],
    time: "19:00",
  };
}

export function getMockReservations(): Reservation[] {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);
  futureDate.setHours(19, 30, 0, 0);

  const pastDate = new Date(2026, 5, 3, 18, 0, 0, 0);

  const secondPastDate = new Date();
  secondPastDate.setDate(secondPastDate.getDate() - 24);
  secondPastDate.setHours(18, 30, 0, 0);

  const thirdPastDate = new Date();
  thirdPastDate.setDate(thirdPastDate.getDate() - 47);
  thirdPastDate.setHours(20, 0, 0, 0);

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
    {
      confirmationCode: "RSV-PAST-1842",
      experienceId: "sushi-counter",
      guestName: mockUser.name,
      guestPhone: mockUser.phone,
      id: "mock-past-counter-reservation",
      locationId: "sushi-bar",
      occasion: "Date night",
      partySize: 2,
      seatingPreference: "Sushi bar",
      startsAt: secondPastDate.toISOString(),
      status: "confirmed",
    },
    {
      confirmationCode: "RSV-PAST-0322",
      experienceId: "private-dining",
      guestName: mockUser.name,
      guestPhone: mockUser.phone,
      id: "mock-past-private-reservation",
      locationId: "tokyo-rooftop",
      occasion: "Birthday",
      partySize: 3,
      seatingPreference: "Private booth",
      startsAt: thirdPastDate.toISOString(),
      status: "confirmed",
    },
  ];
}
