import './MainPage.css';

import { SearchForm, WordsContainer } from 'components';
import { useAppDispatch, useAppSelector, useDebounce } from 'hooks';
import { useEffect, useState } from 'react';
import { searchDictionary, wordsSelector } from 'store/dictionary';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const words = useAppSelector(wordsSelector);

  const debouncedSearchValue = useDebounce(searchValue, 600);

  useEffect(() => {
    dispatch(searchDictionary(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <main className="main-page">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
      <WordsContainer words={words} />
    </main>
  );
};
