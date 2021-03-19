export interface Faq {
  id: number;
  question: string;
  answer: string;
  is_published: boolean;
  order: number;
  created_at: string;
}

export interface AdminUser {
  id: number;
  name: string;
}

export interface FeedbackReply {
  id: number;
  reply: string;
  created_at: string;
  adminUser: AdminUser;
}

export interface FeedbackDocument {
  id: number;
  name: string;
  url: string;
}

export interface FeedbackMessage {
  id: number;
  name: string;
  email: string;
  phone_mobile: string;
  content: string;
  is_processed: boolean;
  last_reply_sent_at: string;
  created_at: string;
  documents: FeedbackDocument[];
  replies: FeedbackReply[];
}

export interface FeedbackState {
  faqs: Faq[];
  messages: FeedbackMessage[];
}
