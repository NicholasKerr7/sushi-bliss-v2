export type ExploreNavigationTone = "gold" | "red";

export interface ExploreNavigationItem {
  description: string;
  href: string;
  iconUrl: string;
  id: string;
  label: string;
  tone?: ExploreNavigationTone;
}

export interface ExploreNavigationSection {
  id: string;
  items: ExploreNavigationItem[];
  label: string;
}

export const customerExploreSections: ExploreNavigationSection[] = [
  {
    id: "brand",
    label: "Brand",
    items: [
      {
        description: "Our story, craft, sourcing, and service philosophy.",
        href: "/about",
        iconUrl: "/assets/icons/lotus-icon.png",
        id: "about",
        label: "About",
      },
      {
        description: "Meet the four chefs guiding every omakase counter.",
        href: "/chefs",
        iconUrl: "/assets/icons/chef-hat-icon.png",
        id: "chefs",
        label: "Master Chefs",
        tone: "red",
      },
      {
        description: "Find Ginza, Shibuya, and downtown dining rooms.",
        href: "/locations",
        iconUrl: "/assets/icons/map-pin-icon.png",
        id: "locations",
        label: "Locations",
      },
    ],
  },
  {
    id: "experiences",
    label: "Experiences",
    items: [
      {
        description: "Reserve a chef-led tasting with sake pairings.",
        href: "/omakase",
        iconUrl: "/assets/icons/dining-setting-icon.png",
        id: "omakase",
        label: "Omakase",
        tone: "red",
      },
      {
        description: "Send curated dining experiences and gift cards.",
        href: "/gifts",
        iconUrl: "/assets/icons/gift-icon.png",
        id: "gifts",
        label: "Gifts",
      },
      {
        description: "View member drops, seasonal offers, and referrals.",
        href: "/offers",
        iconUrl: "/assets/icons/golden-ticket-icon.png",
        id: "offers",
        label: "Offers",
      },
    ],
  },
  {
    id: "member",
    label: "Member",
    items: [
      {
        description: "Track points, tiers, rewards, and referral progress.",
        href: "/loyalty",
        iconUrl: "/assets/icons/floral-emblem-icon.png",
        id: "loyalty",
        label: "Loyalty",
      },
      {
        description: "Return to saved dishes and private experiences.",
        href: "/favorites",
        iconUrl: "/assets/icons/heart-icon.png",
        id: "favorites",
        label: "Favorites",
      },
      {
        description: "Pick up dishes and experiences you viewed earlier.",
        href: "/recently-viewed",
        iconUrl: "/assets/icons/clock-icon.png",
        id: "recently-viewed",
        label: "Recently Viewed",
      },
      {
        description: "See order, booking, reward, and offer alerts.",
        href: "/notifications",
        iconUrl: "/assets/icons/notification-bell-icon.png",
        id: "notifications",
        label: "Notifications",
      },
      {
        description: "Contact concierge support and browse help articles.",
        href: "/support",
        iconUrl: "/assets/icons/headset-icon.png",
        id: "support",
        label: "Support",
      },
    ],
  },
];

/** Flattens grouped customer discovery links for compact route hubs. */
export function getCustomerExploreItems() {
  return customerExploreSections.flatMap((section) => section.items);
}
