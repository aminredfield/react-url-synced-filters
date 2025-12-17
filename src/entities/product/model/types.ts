/**
 * Product представляет один товар в каталоге.
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
 * Filters представляет состояние всех доступных фильтров.
 * Когда свойство null - соответствующее ограничение отключено.
 */
export interface Filters {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  rating: number | null;
}

/**
 * Начальное состояние фильтров (когда нет параметров в URL).
 */
export const defaultFilters: Filters = {
  categories: [],
  minPrice: null,
  maxPrice: null,
  inStock: false,
  rating: null,
};
