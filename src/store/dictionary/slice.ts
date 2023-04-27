import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDictionary, starredWordsFromLocal } from 'api';
import { getDragStarredWordState, transformServerResponse } from 'utils';

import { DictionaryState } from './types';

const initialState: DictionaryState = {
  words: [],
  starredWords: starredWordsFromLocal ? JSON.parse(starredWordsFromLocal) : [],
  loading: false,
};

export const searchDictionary = createAsyncThunk(
  'dictionary/search',
  async (query: string) => {
    return await fetchDictionary(query);
  }
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    toggleStarredWord: (state, action) => {
      const wordIndex = state.starredWords.findIndex(
        (word) => word.id === action.payload.id
      );
      if (wordIndex === -1) {
        const starredWord = {
          ...action.payload,
          starred: true,
          order: state.starredWords.length,
        };
        state.starredWords.push(starredWord);
        state.words = state.words.map((word) => {
          return word.id === action.payload.id
            ? { ...word, starred: true }
            : word;
        });
      } else {
        state.starredWords.splice(wordIndex, 1);
        state.words = state.words.map((word) => {
          return word.id === action.payload.id
            ? { ...word, starred: false }
            : word;
        });
      }
      localStorage.setItem('starredWords', JSON.stringify(state.starredWords));
    },
    setDragStarredWord: (state, action) => {
      state.starredWords = getDragStarredWordState(
        state.starredWords,
        action.payload.wordCard,
        action.payload.currentWord
      );
      localStorage.setItem('starredWords', JSON.stringify(state.starredWords));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDictionary.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDictionary.fulfilled, (state, action) => {
        state.words = transformServerResponse(state, action.payload);
        state.loading = false;
      })
      .addCase(searchDictionary.rejected, (state) => {
        state.loading = false;
        state.words = [];
      });
  },
});

export const { toggleStarredWord, setDragStarredWord } =
  dictionarySlice.actions;
export default dictionarySlice.reducer;
