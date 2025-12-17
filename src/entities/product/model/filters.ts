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
    
    // Фильтр по бренду
    if (filters.brands.length > 0) {
      if (!p.brand || !filters.brands.includes(p.brand)) {
        return false;
      }
    }
    
    // Фильтр по тегам (товар должен иметь хотя бы один из выбранных тегов)
    if (filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => p.tags.includes(tag));
      if (!hasTag) {
        return false;
      }
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
    
    // Фильтр по минимальной скидке
    if (filters.minDiscount != null && p.discountPercentage < filters.minDiscount) {
      return false;
    }
    
    // Фильтр по рейтингу
    if (filters.rating != null && p.rating < filters.rating) {
      return false;
    }
    
    // Фильтр по минимальному количеству на складе
    if (filters.minStock != null && p.stock < filters.minStock) {
      return false;
    }
    
    return true;
  });
}
