export type FilterProps = {
  mainTitle: string
  filters: FilterContentProps
  // dispatch: React.Dispatch<React.SetStateAction<boolean>>
  onChange: (filters: Array<FilterItem & { filterType?: string }>) => void;
  hasSelectedFilters?: boolean
  resetFilters: () => void
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

type AvailableItems = Filter;
type AvailableFormats = Filter;
type Price = Omit<Filter, "items"> & {
  items: Array<FilterItem & {
    rangeValue: {
      min: number,
      max: number
    }
  }>
}

export type FilterContentProps = {
  price: Price
  availableItems: AvailableItems
  availableFormats: AvailableFormats
}
