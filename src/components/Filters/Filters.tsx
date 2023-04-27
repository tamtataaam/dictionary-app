import './Filters.css';

import { ChangeEvent, FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { checkboxFilters } from './consts';
import { FiltersProps } from './types';

export const Filters: FC<FiltersProps> = ({ onChange }) => {
  const [filterParams] = useSearchParams();

  const getIsChecked = (filter: string) => {
    return filterParams.get(filter) === 'true';
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    filter: string
  ) => {
    onChange(e, filter);
  };

  return (
    <div className="filters-form">
      {checkboxFilters.map((filter, index) => (
        <label className="filters-form__label" htmlFor={filter} key={index}>
          <input
            type="checkbox"
            id={filter}
            className="filters-form__checkbox"
            onChange={(e) => handleCheckboxChange(e, filter)}
            checked={getIsChecked(filter)}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};
