export interface Publication {
  anons: string;
  content: string;
  created_at: string;
  id: number;
  image_preview_url: string;
  pdf_file_url: string | null
  readed: boolean;
  title: string;
}

export interface Instruction {
  anons: string;
  content: string;
  created_at: string;
  id: number;
  image_preview_url: string;
  pdf_file_url: string | null
  readed: boolean;
  title: string;
}

export interface NewsState {
  news: Publication[];
  instructions: Instruction[];
}
