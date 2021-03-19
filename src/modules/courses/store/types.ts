export interface Course {
  id: number;
  position: number | null;
  title: string;
  description: string | null;
  file_url: string | null;
  file_preview_url: string;
  document_url: string | null;
  html: string | null;
  frame_url: string | null;
  frame_width: number | null;
  frame_height: number | null;
  video_1_title: string | null;
  video_1_frame: string | null;
  video_2_title: string | null;
  video_2_frame: string | null;
  video_3_title: string | null;
  video_3_frame: string | null;
  group: CourseGroup | null;
  bonuses: null | number;
  tests: CourseTest[];
}

export interface CourseTest {
  id: number;
}

export interface CourseGroup {
  id: number;
  title: string;
  description: string | null;
  file_preview_url: string | null;
  position: number | null;
}

export interface CourseTry {
  id: number;
  bonuses: null | number;
  extra_bonuses: null | number;
  correct_answers: number;
  wrong_answers: number;
  created_at: string;
  finished: boolean;
  finished_at: string | null;
  paid: boolean;
  paid_at: string | null;
  position: number;
  step: number;
  test_title: string;
  results: CourseResult[];
}

export interface CourseResult {
  id: number;
  question_id: number;
  created_at: string;
  is_correct: boolean;
}

export interface CourseTest {
  id: number;
  title: string | null;
  image_preview_url: string | null;
  courseBonuses: CourseBonus[];
  questions: CourseQuestion[];
}

export interface CourseQuestion {
  id: number;
  isSingleAnswer: boolean;
  title: string;
  answers: CourseAnswer[];
}

export interface CourseAnswer {
  id: number;
  title: string;
}

export interface CourseBonus {
  id: number;
  bonuses: number;
  percent_max: number;
  percent_min: number;
  test_id: number;
}

export interface CoursesState {
  courses: Course[];
}
