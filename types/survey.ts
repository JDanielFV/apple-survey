export type SurveyStep =
  | "splash"
  | "rating"
  | "honesty"
  // Path A
  | "helped"
  | "would_improve"
  | "missing_product"
  | "has_provider"
  | "reason"
  | "positive_acknowledgment"
  | "catalog"
  // Path B
  | "failed"
  | "acknowledgment"
  | "contact_method"
  | "working"
  | "understood";

export interface SurveyAnswers {
  rating?: number;
  // Path A
  helped?: string[];
  would_improve?: string;
  missing_product?: string;
  has_provider?: boolean;
  reason?: string;
  // Path B
  failed_categories?: string[];
  failed?: string;
  wants_contact?: boolean;
  contact_method?: "whatsapp" | "llamada" | "correo";
  contact_detail?: string;
  contact_schedule?: string;
}
