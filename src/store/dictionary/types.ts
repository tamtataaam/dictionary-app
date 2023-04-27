export interface Word {
  id: string;
  word: string;
  partOfSpeech: string;
  shortdef: string[];
  starred: boolean;
  order: number;
}

export interface DictionaryState {
  words: Word[];
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
