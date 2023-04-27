import './SearchForm.css';

import { Filters } from 'components/Filters';
import { Input } from 'components/Input';
import { FC } from 'react';

import { SearchFormProps } from './types';

export const SearchForm: FC<SearchFormProps> = ({
  searchValue,
  setSearchValue,
  handleFilterChange,
  filters,
}) => {
  return (
    <form className="search-form">
      <Input searchValue={searchValue} setSearchValue={setSearchValue} />

      {filters && handleFilterChange && (
        <Filters onChange={handleFilterChange} />
      )}
    </form>
  );
};
