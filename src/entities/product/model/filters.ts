import { Product, Filters } from './types';

/**
 * Применяет заданные фильтры к списку продуктов.
 * Каждый фильтр опционален.
 */
export function applyFilters(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    // Фильтр по категории
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
      return false;
    }
    // Фильтр по наличию
    if (filters.inStock && !p.inStock) {
      return false;
    }
    // Фильтр по цене
    if (filters.minPrice != null && p.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice != null && p.price > filters.maxPrice) {
      return false;
    }
    // Фильтр по рейтингу
    if (filters.rating != null && p.rating < filters.rating) {
      return false;
    }
    return true;
  });
}
