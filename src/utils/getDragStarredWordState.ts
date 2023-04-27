import { Word } from 'store/dictionary';

export const getDragStarredWordState = (
  starredWords: Word[],
  wordCard: Word,
  currentWord: Word
) => {
  return starredWords.map((word) => {
    if (word.id === wordCard.id) {
      return { ...word, order: currentWord.order };
    }
    if (word.id === currentWord.id) {
      return { ...word, order: wordCard.order };
    }
    return word;
  });
};
