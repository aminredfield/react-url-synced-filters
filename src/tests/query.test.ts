import { describe, it, expect } from 'vitest';
import { parseQueryToFilters, filtersToQuery } from '../shared/utils/query';
import { Filters } from '../entities/product/model/types';

describe('parseQueryToFilters', () => {
  const available = ['A', 'B', 'C'];
  it('normalises invalid values', () => {
    const params = new URLSearchParams('cat=A,D&min=-5&max=10&stock=1&rating=6');
    const filters = parseQueryToFilters(params, available);
    // Unknown category D is ignored
    expect(filters.categories).toEqual(['A']);
    // Negative min price is ignored
    expect(filters.minPrice).toBe(null);
    expect(filters.maxPrice).toBe(10);
    // Truthy stock values yield true
    expect(filters.inStock).toBe(true);
    // Rating is clamped to 5
    expect(filters.rating).toBe(5);
  });

  it('swaps min and max when min > max', () => {
    const params = new URLSearchParams('min=50&max=10');
    const filters = parseQueryToFilters(params, available);
    expect(filters.minPrice).toBe(10);
    expect(filters.maxPrice).toBe(50);
  });
});

describe('filtersToQuery', () => {
  it('serialises and deserialises filters correctly', () => {
    const original: Filters = {
      categories: ['A', 'B'],
      minPrice: 5,
      maxPrice: 20,
      inStock: true,
      rating: 4,
    };
    const params = filtersToQuery(original);
    const parsed = parseQueryToFilters(params, ['A', 'B']);
    expect(parsed).toEqual(original);
  });
});