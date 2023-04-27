import './Input.css';

import { ChangeEvent, FC } from 'react';

import { InputProps } from './types';

export const Input: FC<InputProps> = ({ searchValue, setSearchValue }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      type="text"
      className="search-form__input"
      placeholder="Search"
      value={searchValue}
      onChange={handleChange}
    />
  );
};
