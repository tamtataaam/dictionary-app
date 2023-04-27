import { DictionaryState, WordResponse } from 'store/dictionary';

export const transformServerResponse = (
  state: DictionaryState,
  wordsData: WordResponse[]
) => {
  return wordsData
    .map((item, index) => {
      const starredWord = state.starredWords.find(
        (word) => word.id === item.meta?.uuid
      );
      return {
        id: item.meta?.uuid,
        word: item.hwi?.hw,
        partOfSpeech: item.fl,
        shortdef: item.shortdef,
        starred: starredWord ? true : false,
        order: index,
      };
    })
    .filter((item) => item.id !== undefined)
    .sort((a, b) => (a.word.toLowerCase() > b.word.toLowerCase() ? 1 : -1));
};
