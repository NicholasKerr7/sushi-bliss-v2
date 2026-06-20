import type { AdminNavigationItem } from "@/types/admin";

export const adminNavigation: AdminNavigationItem[] = [
  {
    group: "main",
    href: "#overview",
    iconUrl: "/assets/icons/home-icon.png",
    id: "overview",
    label: "Dashboard",
  },
  {
    group: "main",
    href: "#menu-admin",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
    id: "menu",
    label: "Menu Management",
  },
  {
    badge: "8",
    group: "main",
    href: "#orders-admin",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "orders",
    label: "Orders",
  },
  {
    badge: "3",
    group: "main",
    href: "#reservations-admin",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations",
    label: "Reservations",
  },
  {
    group: "main",
    href: "#offers-admin",
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "offers",
    label: "Offers",
  },
  {
    group: "main",
    href: "#locations-admin",
    iconUrl: "/assets/icons/map-pin-icon.png",
    id: "locations",
    label: "Locations",
  },
  {
    group: "main",
    href: "#customers-admin",
    iconUrl: "/assets/icons/group-icon.png",
    id: "customers",
    label: "Customers",
  },
  {
    group: "main",
    href: "#analytics-admin",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "analytics",
    label: "Analytics",
  },
];

export const adminSystemNavigation: AdminNavigationItem[] = [
  {
    group: "system",
    href: "#customers-admin",
    iconUrl: "/assets/icons/user-icon.png",
    id: "users",
    label: "Users & Roles",
  },
  {
    group: "system",
    href: "#overview",
    iconUrl: "/assets/icons/user-settings-icon.png",
    id: "settings",
    label: "Settings",
  },
  {
    group: "system",
    href: "#analytics-admin",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "activity",
    label: "Activity Logs",
  },
];

export const adminKpis = [
  {
    delta: "+12.4%",
    detail: "vs last 7 days",
    iconUrl: "/assets/icons/credit-card-icon.png",
    id: "revenue",
    label: "Total Revenue",
    sparkline: [12, 14, 13, 16, 22, 28, 24, 21, 31, 29, 27, 20, 24, 32, 39, 43],
    value: "$126,430.50",
  },
  {
    delta: "+8.7%",
    detail: "vs last 7 days",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "orders",
    label: "Total Orders",
    sparkline: [18, 21, 19, 20, 25, 31, 28, 26, 35, 36, 34, 27, 31, 36, 44, 46],
    value: "1,248",
  },
  {
    delta: "+15.1%",
    detail: "vs last 7 days",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations",
    label: "Reservations",
    sparkline: [20, 20, 21, 27, 30, 26, 24, 34, 23, 25, 27, 24, 29, 28, 38, 40],
    value: "312",
  },
  {
    delta: "+10.3%",
    detail: "vs last 7 days",
    iconUrl: "/assets/icons/user-icon.png",
    id: "customers",
    label: "New Customers",
    sparkline: [9, 12, 10, 11, 18, 24, 21, 18, 22, 17, 18, 16, 23, 18, 26, 31],
    value: "186",
  },
  {
    delta: "+3.6%",
    detail: "vs last 7 days",
    iconUrl: "/assets/icons/qr-code-icon.png",
    id: "aov",
    label: "Average Order Value",
    sparkline: [11, 14, 12, 13, 21, 30, 25, 21, 34, 26, 28, 24, 29, 25, 35, 42],
    value: "$101.32",
  },
] as const;

export const adminTabletMetrics = [
  {
    delta: "+12.5% vs yesterday",
    iconUrl: "/assets/icons/credit-card-icon.png",
    id: "sales-today",
    label: "Sales Today",
    value: "$12,450",
  },
  {
    delta: "3 New",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "active-orders",
    label: "Active Orders",
    value: "18",
  },
  {
    delta: "2 Upcoming",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations-today",
    label: "Reservations Today",
    value: "24",
  },
  {
    delta: "2 Ending Soon",
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "active-offers",
    label: "Active Offers",
    value: "5",
  },
] as const;

export const adminManagementSections = [
  {
    action: "Manage",
    description: "Manage menu items, categories and pricing",
    footerLabel: "Total Items",
    footerValue: "60",
    href: "#menu-admin",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
    id: "menu-admin",
    rows: [
      {
        label: "Nigiri",
        meta: "24 items",
        thumbnail: "/assets/menu/sushi/otoro-nigiri.webp",
      },
      {
        label: "Rolls",
        meta: "18 items",
        thumbnail: "/assets/menu/sushi/spicy-tuna-roll.webp",
      },
      {
        label: "Sashimi",
        meta: "12 items",
        thumbnail: "/assets/menu/sashimi/salmon-sashimi.webp",
      },
      {
        label: "Specials",
        meta: "6 items",
        status: "New",
        thumbnail: "/assets/menu/sushi/truffle-wagyu-nigiri.webp",
      },
    ],
    title: "Menu Management",
  },
  {
    action: "Open",
    description: "Monitor and manage customer orders",
    footerLabel: "Total Orders Today",
    footerValue: "156",
    href: "#orders-admin",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "orders-admin",
    rows: [
      { label: "New Orders", meta: "8" },
      { label: "Preparing", meta: "12" },
      { label: "Out for Delivery", meta: "5" },
      { label: "Completed", meta: "131" },
    ],
    title: "Order Management",
  },
  {
    action: "Open",
    description: "View and manage table reservations",
    footerLabel: "Total Reservations",
    footerValue: "170",
    href: "#reservations-admin",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations-admin",
    rows: [
      { label: "Today's Reservations", meta: "42" },
      { label: "Upcoming Next 7 Days", meta: "128" },
      { label: "Seated", meta: "26" },
      { label: "Cancelled", meta: "5" },
    ],
    title: "Reservation Management",
  },
  {
    action: "Manage",
    description: "Create and manage promotions and offers",
    footerLabel: "Total Offers",
    footerValue: "12",
    href: "#offers-admin",
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "offers-admin",
    rows: [
      { label: "Active Offers", meta: "3" },
      { label: "Scheduled", meta: "2" },
      { label: "Expired", meta: "7" },
    ],
    title: "Offers Management",
  },
  {
    action: "Manage",
    description: "Manage restaurant locations and details",
    footerLabel: "Total Locations",
    footerValue: "4",
    href: "#locations-admin",
    iconUrl: "/assets/icons/map-pin-icon.png",
    id: "locations-admin",
    rows: [
      { label: "Downtown Tokyo", meta: "Active" },
      { label: "Shibuya", meta: "Active" },
      { label: "Ginza", meta: "Active" },
      { label: "Osaka", meta: "Maintenance" },
    ],
    title: "Locations Management",
  },
  {
    action: "Open",
    description: "View customer insights and loyalty data",
    footerLabel: "Member Conversion Rate",
    footerValue: "32.6%",
    href: "#customers-admin",
    iconUrl: "/assets/icons/user-icon.png",
    id: "customers-admin",
    rows: [
      { label: "Total Customers", meta: "2,847" },
      { label: "Returning Customers", meta: "1,298" },
      { label: "New Customers This Month", meta: "342" },
      { label: "Loyalty Members", meta: "928" },
    ],
    title: "Customer Overview",
  },
] as const;

export const adminRecentOrders = [
  ["#SB-2481", "Alex Johnson", "Dine In", "$85.00", "Completed", "10:24 AM"],
  ["#SB-2480", "Emma Williams", "Delivery", "$62.40", "Completed", "10:15 AM"],
  ["#SB-2479", "Michael Chen", "Takeaway", "$45.30", "Preparing", "10:10 AM"],
  [
    "#SB-2478",
    "Sophia Martinez",
    "Dine In",
    "$120.00",
    "Completed",
    "10:02 AM",
  ],
  [
    "#SB-2477",
    "Daniel Kim",
    "Delivery",
    "$78.60",
    "Out for Delivery",
    "09:58 AM",
  ],
] as const;

export const adminReservationQueue = [
  ["7:00 PM", "James Anderson", "2", "A7", "Confirmed"],
  ["7:30 PM", "Olivia Thompson", "4", "B3", "Confirmed"],
  ["8:00 PM", "Liam Wilson", "3", "C2", "Pending"],
  ["8:30 PM", "Ava Brown", "2", "A9", "Confirmed"],
  ["9:00 PM", "Noah Davis", "6", "VIP1", "Pending"],
] as const;

export const adminTopMenuItems = [
  {
    imageUrl: "/assets/menu/sushi/otoro-nigiri.webp",
    item: "Otoro Nigiri",
    revenue: "$3,888.00",
    sold: "324",
  },
  {
    imageUrl: "/assets/menu/sushi/spicy-tuna-roll.webp",
    item: "Spicy Tuna Roll",
    revenue: "$2,574.00",
    sold: "286",
  },
  {
    imageUrl: "/assets/menu/sashimi/salmon-sashimi.webp",
    item: "Salmon Sashimi",
    revenue: "$3,720.00",
    sold: "248",
  },
  {
    imageUrl: "/assets/menu/sushi/dragon-roll.webp",
    item: "Dragon Roll",
    revenue: "$3,424.00",
    sold: "214",
  },
  {
    imageUrl: "/assets/menu/sushi/truffle-wagyu-nigiri.webp",
    item: "Wagyu Tataki",
    revenue: "$2,016.00",
    sold: "168",
  },
] as const;

export const adminMenuRows = [
  ["Otoro Nigiri", "Nigiri", "$12.00", "Active"],
  ["Spicy Tuna Roll", "Rolls", "$14.00", "Active"],
  ["Salmon Sashimi", "Sashimi", "$15.00", "Active"],
  ["Miso Black Cod", "Hot Dishes", "$22.00", "Active"],
  ["Wagyu Tataki", "Appetizers", "$18.00", "Inactive"],
] as const;

export const adminOfferRows = [
  ["Lunch Special", "Percentage", "20%", "Active", "May 31, 2024"],
  ["Weekend Vibes", "Percentage", "15%", "Active", "May 26, 2024"],
  ["Loyalty Reward", "Fixed", "$10.00", "Active", "Jun 30, 2024"],
  ["Sashimi Night", "Percentage", "25%", "Scheduled", "May 25, 2024"],
  ["New Customer", "Fixed", "$15.00", "Expired", "May 10, 2024"],
] as const;

export const adminLocationRows = [
  ["Sushi Bliss Downtown", "Hiroshi Tanaka", "Active", "423"],
  ["Sushi Bliss Midtown", "Aiko Nakamura", "Active", "312"],
  ["Sushi Bliss Uptown", "Kenji Sato", "Active", "276"],
  ["Sushi Bliss Westside", "Yuki Tanaka", "Active", "237"],
] as const;

export const adminAnalyticsSummary = [
  {
    delta: "+9.3% vs yesterday",
    label: "Average Order Value",
    value: "$120.13",
  },
  {
    delta: "Busiest time today",
    label: "Peak Order Time",
    value: "7:00 PM - 8:00 PM",
  },
  { delta: "42 orders", label: "Popular Item", value: "Spicy Tuna Roll" },
  {
    delta: "Based on 328 reviews",
    label: "Customer Satisfaction",
    value: "4.8 / 5",
  },
] as const;

export const adminRevenueSeries = [38, 48, 58, 78, 70, 84, 72, 65];

export const adminCustomerSegments = [
  { label: "New Customers", percent: "23.8%", value: "1,248" },
  { label: "Returning Customers", percent: "54.3%", value: "2,846" },
  { label: "Inactive Customers", percent: "21.9%", value: "1,154" },
] as const;
