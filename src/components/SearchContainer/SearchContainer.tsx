import { SearchContainerProps } from './types';

const checkboxFilters = ['adjective', 'verb', 'noun'];

export const SearchContainer = ({
  searchValue,
  handleInputChange,
  handleFilterChange,
  filters,
}: SearchContainerProps) => {
  return (
    <div className="h-80 bg-stone-200 p-6 rounded-md">
      <input
        type="text"
        placeholder="Search"
        className="w-80 h-10 p-2 border-2 border-sky-600 rounded-md"
        value={searchValue}
        onChange={handleInputChange}
      />
      {filters && handleFilterChange && (
        <div className="flex flex-col my-4">
          {checkboxFilters.map((filter, i) => (
            <label key={i}>
              <input
                type="checkbox"
                className="w-4 h-4 align-middle"
                onChange={(e) => handleFilterChange(e, filter)}
              />{' '}
              {filter}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
