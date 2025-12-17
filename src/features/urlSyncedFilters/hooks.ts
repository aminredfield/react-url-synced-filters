import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../../entities/product/model/types';
import { parseQueryToFilters, filtersToQuery } from '../../shared/utils/query';
import { useDebouncedValue } from '../../shared/hooks/useDebouncedValue';

/**
 * Хук читает состояние фильтров из URL и предоставляет функции
 * для записи изменений обратно в URL.
 */
export function useUrlSyncedFilters(
  availableCategories: string[],
  availableBrands: string[],
  availableTags: string[],
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(
    () => parseQueryToFilters(searchParams, availableCategories, availableBrands, availableTags),
    [searchParams, availableCategories, availableBrands, availableTags],
  );

  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minPrice != null ? String(filters.minPrice) : '',
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxPrice != null ? String(filters.maxPrice) : '',
  );
  const [minDiscountInput, setMinDiscountInput] = useState<string>(
    filters.minDiscount != null ? String(filters.minDiscount) : '',
  );
  const [minStockInput, setMinStockInput] = useState<string>(
    filters.minStock != null ? String(filters.minStock) : '',
  );

  useEffect(() => {
    setMinPriceInput(filters.minPrice != null ? String(filters.minPrice) : '');
    setMaxPriceInput(filters.maxPrice != null ? String(filters.maxPrice) : '');
    setMinDiscountInput(filters.minDiscount != null ? String(filters.minDiscount) : '');
    setMinStockInput(filters.minStock != null ? String(filters.minStock) : '');
  }, [filters.minPrice, filters.maxPrice, filters.minDiscount, filters.minStock]);

  const debouncedMin = useDebouncedValue(minPriceInput, 400);
  const debouncedMax = useDebouncedValue(maxPriceInput, 400);
  const debouncedDiscount = useDebouncedValue(minDiscountInput, 400);
  const debouncedStock = useDebouncedValue(minStockInput, 400);

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
    
    const newDiscount = parseVal(debouncedDiscount);
    const newStock = parseVal(debouncedStock);
    
    if (
      newMin !== filters.minPrice || 
      newMax !== filters.maxPrice ||
      newDiscount !== filters.minDiscount ||
      newStock !== filters.minStock
    ) {
      const updated: Filters = {
        ...filters,
        minPrice: newMin,
        maxPrice: newMax,
        minDiscount: newDiscount,
        minStock: newStock,
      };
      const params = filtersToQuery(updated);
      // Сохраняем страницу если она есть
      const currentPage = searchParams.get('page');
      if (currentPage) {
        params.set('page', currentPage);
      }
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMin, debouncedMax, debouncedDiscount, debouncedStock]);

  const updateCategories = useCallback(
    (cats: string[]) => {
      const updated: Filters = {
        ...filters,
        categories: cats,
      };
      const params = filtersToQuery(updated);
      // Сбрасываем на первую страницу при изменении фильтров
      params.delete('page');
      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const updateBrands = useCallback(
    (brands: string[]) => {
      const updated: Filters = {
        ...filters,
        brands,
      };
      const params = filtersToQuery(updated);
      params.delete('page');
      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const updateTags = useCallback(
    (tags: string[]) => {
      const updated: Filters = {
        ...filters,
        tags,
      };
      const params = filtersToQuery(updated);
      params.delete('page');
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
      params.delete('page');
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
      params.delete('page');
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

  const updateMinDiscountInput = useCallback((val: string) => {
    setMinDiscountInput(val);
  }, []);

  const updateMinStockInput = useCallback((val: string) => {
    setMinStockInput(val);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    updateCategories,
    updateBrands,
    updateTags,
    updateInStock,
    updateRating,
    minPriceInput,
    maxPriceInput,
    minDiscountInput,
    minStockInput,
    updateMinPriceInput,
    updateMaxPriceInput,
    updateMinDiscountInput,
    updateMinStockInput,
    resetFilters,
  };
}
