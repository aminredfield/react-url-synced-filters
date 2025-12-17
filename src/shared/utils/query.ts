import { Filters } from '../../entities/product/model/types';

/**
 * Parse URLSearchParams into a Filters object. All validations and
 * normalisations specified in the task are implemented here. Unknown
 * categories are ignored, negative price values are removed, and min/max
 * ordering is corrected. Rating is clamped between 0 and 5.
 */
export function parseQueryToFilters(
  searchParams: URLSearchParams,
  availableCategories: string[],
): Filters {
  // parse categories (comma separated)
  const catParam = searchParams.get('cat');
  let categories: string[] = [];
  if (catParam) {
    const parts = catParam.split(',');
    categories = parts
      .map((p) => decodeURIComponent(p))
      .filter((c) => availableCategories.includes(c));
  }

  // parse min price
  let minPrice: number | null = null;
  const minParam = searchParams.get('min');
  if (minParam !== null && minParam !== '') {
    const n = Number(minParam);
    if (!Number.isNaN(n) && n >= 0) {
      minPrice = n;
    }
  }

  // parse max price
  let maxPrice: number | null = null;
  const maxParam = searchParams.get('max');
  if (maxParam !== null && maxParam !== '') {
    const n = Number(maxParam);
    if (!Number.isNaN(n) && n >= 0) {
      maxPrice = n;
    }
  }

  // ensure min <= max when both are present
  if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
    const tmp = minPrice;
    minPrice = maxPrice;
    maxPrice = tmp;
  }

  // parse stock (truthy values)
  const stockParam = searchParams.get('stock');
  const inStock =
    stockParam === '1' ||
    stockParam === 'true' ||
    stockParam === 'yes' ||
    stockParam === 'on';

  // parse rating
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
 * Convert a Filters object back into URLSearchParams. Only filters
 * differing from their default values are included to keep URLs clean.
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