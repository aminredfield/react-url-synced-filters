import { Filters } from '../../entities/product/model/types';

/**
 * Парсит URLSearchParams в объект Filters.
 * Все валидации и нормализации выполняются здесь.
 */
export function parseQueryToFilters(
  searchParams: URLSearchParams,
  availableCategories: string[],
  availableBrands: string[],
  availableTags: string[],
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

  // Парсим бренды
  const brandParam = searchParams.get('brand');
  let brands: string[] = [];
  if (brandParam) {
    const parts = brandParam.split(',');
    brands = parts
      .map((p) => decodeURIComponent(p))
      .filter((b) => availableBrands.includes(b));
  }

  // Парсим теги
  const tagParam = searchParams.get('tags');
  let tags: string[] = [];
  if (tagParam) {
    const parts = tagParam.split(',');
    tags = parts
      .map((p) => decodeURIComponent(p))
      .filter((t) => availableTags.includes(t));
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

  // Парсим минимальную скидку
  let minDiscount: number | null = null;
  const discountParam = searchParams.get('discount');
  if (discountParam !== null && discountParam !== '') {
    const n = Number(discountParam);
    if (!Number.isNaN(n) && n >= 0 && n <= 100) {
      minDiscount = n;
    }
  }

  // Парсим наличие (truthy значения)
  const stockParam = searchParams.get('stock');
  const inStock =
    stockParam === '1' ||
    stockParam === 'true' ||
    stockParam === 'yes' ||
    stockParam === 'on';

  // Парсим минимальное количество на складе
  let minStock: number | null = null;
  const minStockParam = searchParams.get('minStock');
  if (minStockParam !== null && minStockParam !== '') {
    const n = Number(minStockParam);
    if (!Number.isNaN(n) && n >= 0) {
      minStock = n;
    }
  }

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
    brands,
    tags,
    minPrice,
    maxPrice,
    minDiscount,
    inStock,
    rating,
    minStock,
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
  
  if (filters.brands.length > 0) {
    const encoded = filters.brands
      .map((b) => encodeURIComponent(b))
      .join(',');
    params.set('brand', encoded);
  }
  
  if (filters.tags.length > 0) {
    const encoded = filters.tags
      .map((t) => encodeURIComponent(t))
      .join(',');
    params.set('tags', encoded);
  }
  
  if (filters.minPrice != null) {
    params.set('min', String(filters.minPrice));
  }
  if (filters.maxPrice != null) {
    params.set('max', String(filters.maxPrice));
  }
  if (filters.minDiscount != null) {
    params.set('discount', String(filters.minDiscount));
  }
  if (filters.inStock) {
    params.set('stock', '1');
  }
  if (filters.minStock != null) {
    params.set('minStock', String(filters.minStock));
  }
  if (filters.rating != null) {
    params.set('rating', String(filters.rating));
  }
  return params;
}

/**
 * Парсит номер страницы из URL
 */
export function parsePageFromQuery(searchParams: URLSearchParams): number {
  const pageParam = searchParams.get('page');
  if (pageParam) {
    const page = Number(pageParam);
    if (!Number.isNaN(page) && page > 0) {
      return page;
    }
  }
  return 1;
}

/**
 * Устанавливает номер страницы в URLSearchParams
 */
export function setPageInQuery(params: URLSearchParams, page: number): URLSearchParams {
  const newParams = new URLSearchParams(params);
  if (page > 1) {
    newParams.set('page', String(page));
  } else {
    newParams.delete('page');
  }
  return newParams;
}
