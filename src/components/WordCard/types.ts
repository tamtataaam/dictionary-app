export interface Word {
  id: string;
  word: string;
  partOfSpeech: string;
  shortdef: string[];
  starred: boolean;
  order: number;
}

export interface WordProps {
  word: Word;
  sort?: true;
}
