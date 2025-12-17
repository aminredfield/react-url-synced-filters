import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../../entities/product/model/types';
import { parseQueryToFilters, filtersToQuery } from '../../shared/utils/query';
import { useDebouncedValue } from '../../shared/hooks/useDebouncedValue';

/**
 * Хук читает состояние фильтров из URL и предоставляет функции
 * для записи изменений обратно в URL.
 */
export function useUrlSyncedFilters(availableCategories: string[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(
    () => parseQueryToFilters(searchParams, availableCategories),
    [searchParams, availableCategories],
  );

  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minPrice != null ? String(filters.minPrice) : '',
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxPrice != null ? String(filters.maxPrice) : '',
  );

  useEffect(() => {
    setMinPriceInput(filters.minPrice != null ? String(filters.minPrice) : '');
    setMaxPriceInput(filters.maxPrice != null ? String(filters.maxPrice) : '');
  }, [filters.minPrice, filters.maxPrice]);

  const debouncedMin = useDebouncedValue(minPriceInput, 400);
  const debouncedMax = useDebouncedValue(maxPriceInput, 400);

  useEffect(() => {
    const parseVal = (val: string): number | null => {
      if (val === '') return null;
      const n = Number(val);
      if (Number.isNaN(n) || n < 0) {
        return null;
      }
      return n;
    };
    let newMin = parseVal(debouncedMin);
    let newMax = parseVal(debouncedMax);
    if (newMin != null && newMax != null && newMin > newMax) {
      const tmp = newMin;
      newMin = newMax;
      newMax = tmp;
    }
    if (newMin !== filters.minPrice || newMax !== filters.maxPrice) {
      const updated: Filters = {
        ...filters,
        minPrice: newMin,
        maxPrice: newMax,
      };
      const params = filtersToQuery(updated);
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMin, debouncedMax]);

  const updateCategories = useCallback(
    (cats: string[]) => {
      const updated: Filters = {
        ...filters,
        categories: cats,
      };
      const params = filtersToQuery(updated);
      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const updateInStock = useCallback(
    (value: boolean) => {
      const updated: Filters = {
        ...filters,
        inStock: value,
      };
      const params = filtersToQuery(updated);
      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const updateRating = useCallback(
    (value: number | null) => {
      const updated: Filters = {
        ...filters,
        rating: value,
      };
      const params = filtersToQuery(updated);
      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const updateMinPriceInput = useCallback((val: string) => {
    setMinPriceInput(val);
  }, []);

  const updateMaxPriceInput = useCallback((val: string) => {
    setMaxPriceInput(val);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    updateCategories,
    updateInStock,
    updateRating,
    minPriceInput,
    maxPriceInput,
    updateMinPriceInput,
    updateMaxPriceInput,
    resetFilters,
  };
}
