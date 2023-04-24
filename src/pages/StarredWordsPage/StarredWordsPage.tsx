import { SearchContainer, WordsContainer } from 'components';
import { useAppSelector, useDebounce } from 'hooks';
import { useState } from 'react';
import { seatchStarredWordsSelector } from 'store/dictionary';

export const StarredWordsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    noun: false,
    verb: false,
    adjective: false,
  });
  const debouncedSearchValue = useDebounce(searchValue, 600);
  const debouncedFilters = useDebounce(filters, 600);

  const starredWords = useAppSelector(
    seatchStarredWordsSelector(debouncedFilters, debouncedSearchValue)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filter: string
  ) => {
    setFilters({
      ...filters,
      [filter]: event.target.checked,
    });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold my-6">Starred Words</h3>
      <div className="flex flex-row gap-10">
        <SearchContainer
          handleInputChange={handleInputChange}
          handleFilterChange={handleFilterChange}
          searchValue={searchValue}
          filters
        />
        <WordsContainer words={starredWords} sort />
      </div>
    </div>
  );
};
