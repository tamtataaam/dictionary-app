import { Word } from 'store/dictionary';

export interface WordsContainerProps {
  words: Word[];
  sort?: boolean;
}
