type SurveyUserType = 'answer' | 'later' | 'not';

export interface SurveyUserQuestion {
  id: number;
  user_comment: string | null;
  checked: number[] | number; // IDs if multiple question, ID if single question, 0 if user_comment
}

export interface SurveyUserPayload {
  profile_id: number | null;
  survey_id: number;
  type: SurveyUserType;
  questions: {[key: number]: SurveyUserQuestion},
}

export interface SurveyAnswer {
  id: number;
  title: string;
  position: number;
}

export interface SurveyQuestion {
  id: number;
  title: string;
  multiple: boolean | number;
  custom: boolean | number;
  custom_comment: string | null;
  position: number;
  answers: SurveyAnswer[];
}

export interface Survey {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  url: string | null;
  frequency_hours: number | null;
  bonuses: number | null;
  date_start: string;
  date_end: string;
  created_at: string;
  questions: SurveyQuestion[];
}

export interface SurveyProfile {
  id: number;
  survey_id: number;
  survey_title: string;
  survey_content: string;
  created_at: string;
  bonuses: number | null;
  bonuses_paid_at: number | null;
  completed: boolean | number;
  declined: boolean | number;
}

export interface SurveysResponse {
  surveys: Survey[];
  completed: SurveyProfile[];
}

export interface SurveysState {
  surveys: Survey[];
  survey_profile: SurveyProfile[];
}
