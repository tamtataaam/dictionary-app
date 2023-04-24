import { Word } from 'components/WordCard/types';

export interface DictionaryState {
  words: Word[] | [];
  starredWords: Word[];
  loading: boolean;
}

export interface WordResponse {
  meta: { uuid: string };
  hwi: { hw: string };
  fl: string;
  shortdef: string[];
}

export interface StarredWordsFilters {
  noun: boolean;
  verb: boolean;
  adjective: boolean;
}
