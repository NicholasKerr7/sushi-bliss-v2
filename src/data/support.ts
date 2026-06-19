import type {
  ContactMethod,
  HelpArticle,
  SocialLink,
  SupportState,
  SupportTopic,
} from "@/types/support";

export const supportTopics: SupportTopic[] = [
  {
    description:
      "Pickup timing, delivery tracking, receipts, and reorder help.",
    id: "orders",
    label: "Orders",
  },
  {
    description:
      "Booking changes, seating requests, occasions, and cancellations.",
    id: "reservations",
    label: "Reservations",
  },
  {
    description:
      "Dietary notes, allergies, omakase preferences, and chef pacing.",
    id: "dietary",
    label: "Dietary care",
  },
  {
    description:
      "Gift timing, recipient support, rewards, offers, and referrals.",
    id: "gifts-loyalty",
    label: "Gifts and loyalty",
  },
];

export const contactMethods: ContactMethod[] = [
  {
    description:
      "Fastest path for pickup, delivery, and same-day reservation help.",
    href: "tel:+15550100",
    id: "phone",
    label: "Phone",
    tone: "success",
    value: "+1 555 0100",
  },
  {
    description: "Best for gift, private dining, and accessibility details.",
    href: "mailto:concierge@sushibliss.example",
    id: "email",
    label: "Email",
    tone: "premium",
    value: "concierge@sushibliss.example",
  },
  {
    description: "Quiet escalation for allergies and special occasion pacing.",
    href: "#support-form",
    id: "form",
    label: "Support form",
    tone: "neutral",
    value: "Send a request",
  },
];

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com",
    icon: "/assets/icons/instagram-icon.png",
    id: "instagram",
    label: "Follow Sushi Bliss on Instagram",
    platform: "Instagram",
  },
  {
    href: "https://www.facebook.com",
    icon: "/assets/icons/facebook-icon.png",
    id: "facebook",
    label: "Follow Sushi Bliss on Facebook",
    platform: "Facebook",
  },
  {
    href: "https://x.com",
    icon: "/assets/icons/x-icon.png",
    id: "x",
    label: "Follow Sushi Bliss on X",
    platform: "X",
  },
  {
    href: "https://www.tripadvisor.com",
    icon: "/assets/icons/owl-icon.png",
    id: "tripadvisor",
    label: "Find Sushi Bliss on Tripadvisor",
    platform: "Tripadvisor",
  },
];

export const helpArticles: HelpArticle[] = [
  {
    body: [
      "Pickup windows are confirmed during checkout and stored with your order confirmation.",
      "For delivery, the order detail panel shows courier assignment, estimated arrival, and a map preview once an order is active.",
      "Use reorder from Orders to restore the original menu items, add-ons, and customizations.",
    ],
    category: "Orders",
    id: "order-tracking",
    summary: "How pickup, delivery, courier assignment, and reorder work.",
    title: "Track or reorder an order",
  },
  {
    body: [
      "Reservations require a future date and an available slot before confirmation.",
      "Upcoming reservations can be modified or cancelled from Reservations.",
      "Occasion and seating notes stay attached to the booking for concierge review.",
    ],
    category: "Reservations",
    id: "reservation-changes",
    summary: "Modify, cancel, and prepare for an upcoming booking.",
    title: "Change a reservation",
  },
  {
    body: [
      "Dietary preferences saved in profile inform checkout, reservations, and support conversations.",
      "Use the support form for allergy details that need human review before arrival.",
      "Omakase guests should include raw fish, shellfish, sodium, gluten, and alcohol preferences.",
    ],
    category: "Dining care",
    id: "allergy-preferences",
    summary: "How preferences and allergy notes flow through the app.",
    title: "Share allergies and dietary preferences",
  },
  {
    body: [
      "Gift confirmations are stored locally in the gift section and profile history.",
      "A scheduled gift delivery must be set for a future date.",
      "Concierge can help transfer a gift to a different recipient before redemption.",
    ],
    category: "Gifts",
    id: "gift-experiences",
    summary: "Send, schedule, and manage Sushi Bliss gift experiences.",
    title: "Send a gift experience",
  },
  {
    body: [
      "Points are awarded after checkout confirmation, not when items are added to cart.",
      "Rewards only subtract points after validation confirms availability and sufficient balance.",
      "Referral milestones unlock after invited guests complete eligible checkout orders.",
    ],
    category: "Loyalty",
    id: "rewards-referrals",
    summary: "Earn points, redeem rewards, and track referral progress.",
    title: "Use rewards and referrals",
  },
  {
    body: [
      "Profile details, saved addresses, payment methods, dietary notes, and notification preferences stay editable from Profile.",
      "Checkout, reservations, support, and loyalty reuse saved profile details so repeated tasks stay quick.",
      "Security controls are mocked locally for now and are ready for backend auth integration later.",
    ],
    category: "Account",
    id: "account-settings",
    summary:
      "Manage profile, preferences, saved addresses, and payment methods.",
    title: "Manage account settings",
  },
  {
    body: [
      "Delivery availability depends on the selected location, prep load, and courier capacity.",
      "Checkout shows delivery fees, service fees, tip, tax, and the selected arrival window before order placement.",
      "Restaurant-only drinks are blocked from online checkout and should be reserved for in-room service.",
    ],
    category: "Delivery",
    id: "delivery-timing",
    summary:
      "Understand delivery windows, fees, courier routing, and restrictions.",
    title: "Delivery timing and routing",
  },
  {
    body: [
      "Omakase reservations include package selection, party size, course preview, and optional sake pairing.",
      "Premium experiences can be booked for chef counter service, private dining, or gifted as a curated experience.",
      "Concierge reviews timing, dietary notes, and occasion details before service.",
    ],
    category: "Omakase",
    id: "omakase-experiences",
    summary:
      "Plan chef counter, private dining, pairings, and premium experiences.",
    title: "Book omakase experiences",
  },
];

export const defaultSupportState: SupportState = {
  messages: [],
};
