import type { ID, ImageReference } from "@/types/common";

export interface Chef {
  about: string;
  appetizer: string;
  dessert: string;
  id: ID;
  name: string;
  platingImage: ImageReference;
  position: string;
  profileImage: ImageReference;
  sashimi: string;
  specialty: string;
  standingImage: ImageReference;
  sushi: string;
}

export interface OmakaseCourseItem {
  image: ImageReference;
  title: string;
}

export interface OmakaseCourse {
  appetizer: OmakaseCourseItem;
  chefId: ID;
  dessert: OmakaseCourseItem;
  sequence: number;
  specialty: OmakaseCourseItem;
}

export interface OmakaseExperience {
  courses: OmakaseCourse[];
  description: string;
  id: ID;
  title: string;
}
