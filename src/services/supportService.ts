import { helpArticles, supportTopics } from "@/data/support";
import { serviceSuccess, type ServiceResponse } from "@/services/contracts";
import type { HelpArticle, SupportTopic } from "@/types/support";

/** Lists help center content through the future support service boundary. */
export async function listHelpArticles(): Promise<
  ServiceResponse<HelpArticle[]>
> {
  return serviceSuccess(helpArticles);
}

/** Lists support topics used by the concierge contact form. */
export async function listSupportTopics(): Promise<
  ServiceResponse<SupportTopic[]>
> {
  return serviceSuccess(supportTopics);
}
