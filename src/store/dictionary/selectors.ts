import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { StarredWordsFilters } from './types';

export const wordsSelector = createSelector(
  (state: RootState) => state.dictionary,
  (dictionary) => dictionary.words
);

export const starredWordsSelector = createSelector(
  (state: RootState) => state.dictionary,
  (dictionary) => dictionary.starredWords
);

export const filterStarredWordsSelector = (filters: StarredWordsFilters) =>
  createSelector(starredWordsSelector, (starredWords) => {
    if (!filters.noun && !filters.verb && !filters.adjective) {
      return starredWords;
    }
    return starredWords.filter((word) => {
      switch (word.partOfSpeech) {
        case 'noun':
          return filters.noun;
        case 'verb':
          return filters.verb;
        case 'adjective':
          return filters.adjective;
        default:
          return false;
      }
    });
  });

export const seatchStarredWordsSelector = (
  filters: StarredWordsFilters,
  search: string
) =>
  createSelector(filterStarredWordsSelector(filters), (starredWords) => {
    return starredWords.filter((word) => {
      return word.word.toLowerCase().includes(search.toLowerCase());
    });
  });
