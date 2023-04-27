import './StarredWordsPage.css';

import { SearchForm, WordsContainer } from 'components';
import { useAppSelector, useDebounce } from 'hooks';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchStarredWordsSelector } from 'store/dictionary';

export const StarredWordsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const [filters, setFilters] = useState({
    noun: searchParams.has('noun')
      ? searchParams.get('noun') === 'true'
      : false,
    verb: searchParams.has('verb')
      ? searchParams.get('verb') === 'true'
      : false,
    adjective: searchParams.has('adjective')
      ? searchParams.get('adjective') === 'true'
      : false,
  });

  const debouncedSearchValue = useDebounce(searchValue, 600);
  const debouncedFilters = useDebounce(filters, 600);

  const starredWords = useAppSelector(
    searchStarredWordsSelector(debouncedFilters, debouncedSearchValue)
  );

  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement>,
    filter: string
  ) => {
    setFilters({
      ...filters,
      [filter]: event.target.checked,
    });
    const params = new URLSearchParams(searchParams);
    params.set(filter, String(event.target.checked));
    setSearchParams(params);
  };

  return (
    <main className="starred-words">
      <h3 className="starred-words__title">Starred Words</h3>
      <div className="starred-words__main">
        <SearchForm
          setSearchValue={setSearchValue}
          handleFilterChange={handleFilterChange}
          searchValue={searchValue}
          filters
        />
        <WordsContainer words={starredWords} sort />
      </div>
    </main>
  );
};
