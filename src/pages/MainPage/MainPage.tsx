import { SearchContainer, WordsContainer } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';
import { searchDictionary, wordsSelector } from 'store/dictionary';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const words = useAppSelector(wordsSelector);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    dispatch(searchDictionary(event.target.value));
  };

  return (
    <div className="flex flex-row gap-10 my-8">
      <SearchContainer
        handleInputChange={handleInputChange}
        searchValue={searchValue}
      />
      <WordsContainer words={words} />
    </div>
  );
};
