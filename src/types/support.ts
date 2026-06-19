import type { ID, StatusTone } from "@/types/common";

export interface SupportTopic {
  description: string;
  id: ID;
  label: string;
}

export interface HelpArticle {
  body: string[];
  category: string;
  id: ID;
  summary: string;
  title: string;
}

export interface SupportMessageDraft {
  email: string;
  message: string;
  name: string;
  topicId: ID;
}

export interface SupportMessage {
  createdAt: string;
  email: string;
  id: ID;
  message: string;
  name: string;
  status: "received";
  topicId: ID;
}

export interface SupportState {
  messages: SupportMessage[];
}

export interface ContactMethod {
  description: string;
  href: string;
  id: ID;
  label: string;
  tone: StatusTone;
  value: string;
}

export interface SocialLink {
  href: string;
  icon: string;
  id: ID;
  label: string;
  platform: string;
}
