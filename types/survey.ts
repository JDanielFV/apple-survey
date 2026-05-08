export type SurveyStep = 
  | 'splash' 
  | 'rating' 
  | 'honesty' 
  | 'helped' 
  | 'failed' 
  | 'would_improve' 
  | 'missing_product' 
  | 'has_provider' 
  | 'reason' 
  | 'acknowledgment' 
  | 'positive_contact_check'
  | 'contact_method' 
  | 'working' 
  | 'understood' 
  | 'positive_acknowledgment' 
  | 'catalog'
  | 'expired';

export interface SurveyAnswers {
  rating?: number;
  helped?: string[];
  would_improve?: string;
  missing_product?: string;
  has_provider?: boolean;
  reason?: string;
  failed?: string;
  failed_categories?: string[];
  wants_contact?: boolean;
  contact_method?: 'whatsapp' | 'llamada' | 'correo';
  contact_detail?: string;
  contact_schedule?: string;
}
