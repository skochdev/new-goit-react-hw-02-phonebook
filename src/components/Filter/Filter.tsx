import React, { ChangeEvent } from 'react';
import * as S from './Filter.styled';

interface Props {
  filterValue: string;
  onFilterChange: (filterValue: string) => void;
}

export const Filter: React.FC<Props> = ({ onFilterChange, filterValue }) => {
  const handleFilter = (e: ChangeEvent) => {
    const targetValue = (e.target as HTMLInputElement).value;
    onFilterChange(targetValue);
  };
  return (
    <S.Filter
      type="text"
      name="filter"
      value={filterValue}
      placeholder="Filter by name or phone number"
      onChange={handleFilter}
    />
  );
};
