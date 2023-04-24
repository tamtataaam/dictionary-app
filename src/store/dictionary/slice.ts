import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Word } from 'components/WordCard/types';

import { DictionaryState, WordResponse } from './types';

const API = 'https://dictionaryapi.com/api/v3/references/collegiate/json/';
const API_KEY = '1d2cee71-7df2-47c2-b497-1de2712f05c4';

const starredWordsFromLocal = localStorage.getItem('starredWords');

const initialState: DictionaryState = {
  words: [],
  starredWords: starredWordsFromLocal ? JSON.parse(starredWordsFromLocal) : [],
  loading: false,
};

export const searchDictionary = createAsyncThunk(
  'dictionary/search',
  async (query: string) => {
    const response = await fetch(`${API}${query}?key=${API_KEY}`);
    return await response.json();
  }
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
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
      state.starredWords = state.starredWords.map((word) => {
        if (word.id === action.payload.wordCard.id) {
          return { ...word, order: action.payload.currentWord.order };
        }
        if (word.id === action.payload.currentWord.id) {
          return { ...word, order: action.payload.wordCard.order };
        }
        return word;
      });
      localStorage.setItem('starredWords', JSON.stringify(state.starredWords));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDictionary.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDictionary.fulfilled, (state, action) => {
        state.words = action.payload
          .map((item: WordResponse, index: number) => {
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
          .filter((el: Word) => el.id !== undefined);
        state.loading = false;
      })
      .addCase(searchDictionary.rejected, (state) => {
        state.loading = false;
        state.words = [];
      });
  },
});

export const { toggleFavorite, setDragStarredWord } = dictionarySlice.actions;
export default dictionarySlice.reducer;
