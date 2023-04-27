export interface SearchFormProps {
  filters?: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleFilterChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    filter: string
  ) => void;
}
