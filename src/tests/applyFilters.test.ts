import { describe, it, expect } from 'vitest';
import { applyFilters } from '../entities/product/model/filters';
import { Product, Filters } from '../entities/product/model/types';

const items: Product[] = [
  { id: 1, title: 'Alpha', price: 10, category: 'A', inStock: true, rating: 4 },
  { id: 2, title: 'Bravo', price: 20, category: 'B', inStock: false, rating: 3 },
  { id: 3, title: 'Charlie', price: 30, category: 'A', inStock: true, rating: 5 },
];

describe('applyFilters', () => {
  it('filters by category', () => {
    const filters: Filters = {
      categories: ['A'],
      minPrice: null,
      maxPrice: null,
      inStock: false,
      rating: null,
    };
    const result = applyFilters(items, filters);
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  it('filters by price range', () => {
    const filters: Filters = {
      categories: [],
      minPrice: 15,
      maxPrice: 25,
      inStock: false,
      rating: null,
    };
    const result = applyFilters(items, filters);
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it('filters by stock and rating', () => {
    const filters: Filters = {
      categories: [],
      minPrice: null,
      maxPrice: null,
      inStock: true,
      rating: 4,
    };
    const result = applyFilters(items, filters);
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });
});