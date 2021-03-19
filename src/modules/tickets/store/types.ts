import { FormSelectOption } from '@pmk-team/common';

export interface Message {
  id: number;
  ticket_id: number;
  ticket_title: string;
  ticket_topic: string | null;
  profile_id: number | null;
  admin_id: number | null;
  message: string;
  readed: number | boolean;
  removed: number | boolean;
  checked: number | boolean;
  file_url: string | null;
  created_at: string;
  created: string;
  userFromName: string;
  userFromAvatar: string | null;
}

export type TicketStatus = 'new' | 'closed_by' | 'closed_auto';
export type ContactOption = 'chat' | 'email' | 'phone';

export interface TicketsResponse {
  tickets: Ticket[];
  counter_profile: number;
  success_message: string;
  topic_options: {id: number, name: string}[];
  contact_options: {[key: string]: string}
}

export interface Ticket {
  id: number;
  title: string;
  counter_profile: number;
  counter_admin: number;
  profile_id: number;
  topic_id: number;
  topic_name: string;
  lastMessage: Message | null;
  messages: Message[];
  status: TicketStatus;
  contact: ContactOption | null;
}

export interface TicketsState {
  counter_profile: number;
  tickets: Ticket[];
  topic_options: FormSelectOption[];
  contact_options: FormSelectOption[];
  success_message: string;
}
