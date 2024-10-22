import React, { useState } from "react";
import {
  Content,
  ContentTitle,
  Button,
  FilterTitle,
  FilterContent,
} from "./styles";
import { FilterItem, FilterProps, FilterType } from "./types";

const Filter: React.FC<FilterProps> = ({
  mainTitle,
  filters,
  resetFilters,
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<FilterItem[]>([]);
  const [filtersState, setFiltersState] = useState(filters);

  const handleToggleCheckbox = (filterType: string, selected: FilterItem) => {
    setSelectedItems((prevSelected) => {
      const isSelected =
        prevSelected.findIndex((item) => item.id === selected.id) > -1;

      const updatedSelection = isSelected
        ? prevSelected.filter((item) => item.id !== selected.id)
        : [
            ...prevSelected,
            { ...selected, filterType: filterType as FilterType },
          ];

      if (onChange) {
        onChange(updatedSelection);
      }

      return updatedSelection;
    });
  };

  const handleResetFilters = () => {
    setSelectedItems([]);
    resetFilters();
  };

  return (
    <Content>
      <ContentTitle>{mainTitle}</ContentTitle>
      {selectedItems.length > 0 && (
        <Button onClick={handleResetFilters}>Limpar Filtro</Button>
      )}

      {Object.entries(filtersState).map(([filterType, category]) => (
        <div key={filterType}>
          <FilterTitle>{category.title}</FilterTitle>
          <FilterContent>
            <ul>
              {category?.items?.map((item: any) => (
                <li key={item.id}>
                  <input
                    name={item.label}
                    data-testid={filterType + item.id}
                    type="checkbox"
                    checked={
                      selectedItems.findIndex(
                        (filter) => filter.id == item.id
                      ) > -1
                    }
                    onChange={() => handleToggleCheckbox(filterType, item)}
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </FilterContent>
        </div>
      ))}
    </Content>
  );
};

export default Filter;
