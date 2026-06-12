import type { MenuItem } from "@/types/menu";

export type DesktopMenuView =
  | "menu"
  | "detail"
  | "customize"
  | "checkout"
  | "review"
  | "confirmation";

export type DesktopMenuAddHandler = (
  item: MenuItem,
  nextView?: DesktopMenuView,
) => void;

export type DesktopMenuViewHandler = (
  item: MenuItem,
  nextView?: DesktopMenuView,
) => void;
