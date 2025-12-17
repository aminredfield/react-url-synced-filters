/**
 * Product represents a single item in the catalogue. Having a shared type
 * definition ensures consistency across the application.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
}

/**
 * Filters represent the state of all available filter controls. When a
 * property is null it means the corresponding constraint is disabled.
 */
export interface Filters {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  rating: number | null;
}

/**
 * The initial filter state used when there are no query parameters.
 */
export const defaultFilters: Filters = {
  categories: [],
  minPrice: null,
  maxPrice: null,
  inStock: false,
  rating: null,
};