/**
 * Product представляет один товар в каталоге.
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  images: string[];
  thumbnail: string;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  // Вычисляемое поле для обратной совместимости
  inStock: boolean;
}

/**
 * Filters представляет состояние всех доступных фильтров.
 * Когда свойство null - соответствующее ограничение отключено.
 */
export interface Filters {
  categories: string[];
  brands: string[];
  tags: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minDiscount: number | null;
  inStock: boolean;
  rating: number | null;
  minStock: number | null;
}

/**
 * Начальное состояние фильтров (когда нет параметров в URL).
 */
export const defaultFilters: Filters = {
  categories: [],
  brands: [],
  tags: [],
  minPrice: null,
  maxPrice: null,
  minDiscount: null,
  inStock: false,
  rating: null,
  minStock: null,
};
