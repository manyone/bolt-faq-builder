export interface Question {
  id: number;
  text: string;
  paragraphs: string[];
}

export interface Subject {
  id: number;
  title: string;
  questions: Question[];
}