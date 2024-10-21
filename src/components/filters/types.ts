export enum FilterType {
  PRICE = 'price',
  AVAILABLE_ITEMS = 'availableItems',
  AVAILABLE_FORMATS = 'availableFormats'
}
export type FilterProps = {
  mainTitle: string
  filters: FilterContentProps
  // dispatch: React.Dispatch<React.SetStateAction<boolean>>
  onChange: (filters: Array<FilterItem & { filterType?: FilterType }>) => void;
  hasSelectedFilters?: boolean
  resetFilters: () => void
}

export type PriceFilterItem = FilterItem & {
  rangeValue: {
    min: number,
    max: number
  }
}

export interface FilterItem {
  id: number;
  label: string;
  value?: string | number | boolean
}

export interface Filter {
  title: string;
  items: FilterItem[]
}

export type AvailableItems = Filter;
export type AvailableFormats = Filter;
export type Price = Omit<Filter, "items"> & {
  items: Array<PriceFilterItem>
}

export type FilterContentProps = {
  price: Price
  availableItems: AvailableItems
  availableFormats: AvailableFormats
}
