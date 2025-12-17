import { Product, Filters } from './types';

/**
 * Apply the given filters to a list of products. Each filter is optional:
 * - categories: if non‑empty, only products whose category is listed are kept
 * - minPrice: if set, products must have price >= minPrice
 * - maxPrice: if set, products must have price <= maxPrice
 * - inStock: if true, products must be in stock
 * - rating: if set, products must have rating >= rating
 */
export function applyFilters(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    // category filter
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
      return false;
    }
    // stock filter
    if (filters.inStock && !p.inStock) {
      return false;
    }
    // price filters
    if (filters.minPrice != null && p.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice != null && p.price > filters.maxPrice) {
      return false;
    }
    // rating filter
    if (filters.rating != null && p.rating < filters.rating) {
      return false;
    }
    return true;
  });
}