export interface SearchContainerProps {
  filters?: true;
  searchValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    filter: string
  ) => void;
}
