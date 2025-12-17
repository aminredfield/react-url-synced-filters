import { Filters } from '../../entities/product/model/types';

/**
 * Парсит URLSearchParams в объект Filters.
 * Все валидации и нормализации выполняются здесь.
 */
export function parseQueryToFilters(
  searchParams: URLSearchParams,
  availableCategories: string[],
): Filters {
  // Парсим категории (через запятую)
  const catParam = searchParams.get('cat');
  let categories: string[] = [];
  if (catParam) {
    const parts = catParam.split(',');
    categories = parts
      .map((p) => decodeURIComponent(p))
      .filter((c) => availableCategories.includes(c));
  }

  // Парсим минимальную цену
  let minPrice: number | null = null;
  const minParam = searchParams.get('min');
  if (minParam !== null && minParam !== '') {
    const n = Number(minParam);
    if (!Number.isNaN(n) && n >= 0) {
      minPrice = n;
    }
  }

  // Парсим максимальную цену
  let maxPrice: number | null = null;
  const maxParam = searchParams.get('max');
  if (maxParam !== null && maxParam !== '') {
    const n = Number(maxParam);
    if (!Number.isNaN(n) && n >= 0) {
      maxPrice = n;
    }
  }

  // Убеждаемся что min <= max когда оба присутствуют
  if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
    const tmp = minPrice;
    minPrice = maxPrice;
    maxPrice = tmp;
  }

  // Парсим наличие (truthy значения)
  const stockParam = searchParams.get('stock');
  const inStock =
    stockParam === '1' ||
    stockParam === 'true' ||
    stockParam === 'yes' ||
    stockParam === 'on';

  // Парсим рейтинг
  let rating: number | null = null;
  const ratingParam = searchParams.get('rating');
  if (ratingParam !== null && ratingParam !== '') {
    const r = Number(ratingParam);
    if (!Number.isNaN(r)) {
      const clamped = Math.max(0, Math.min(5, r));
      rating = clamped;
    }
  }

  return {
    categories,
    minPrice,
    maxPrice,
    inStock,
    rating,
  };
}

/**
 * Конвертирует объект Filters обратно в URLSearchParams.
 */
export function filtersToQuery(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.categories.length > 0) {
    const encoded = filters.categories
      .map((c) => encodeURIComponent(c))
      .join(',');
    params.set('cat', encoded);
  }
  if (filters.minPrice != null) {
    params.set('min', String(filters.minPrice));
  }
  if (filters.maxPrice != null) {
    params.set('max', String(filters.maxPrice));
  }
  if (filters.inStock) {
    params.set('stock', '1');
  }
  if (filters.rating != null) {
    params.set('rating', String(filters.rating));
  }
  return params;
}
