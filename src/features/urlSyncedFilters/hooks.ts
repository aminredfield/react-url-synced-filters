import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../../entities/product/model/types';
import { parseQueryToFilters, filtersToQuery } from '../../shared/utils/query';
import { useDebouncedValue } from '../../shared/hooks/useDebouncedValue';

/**
 * useUrlSyncedFilters reads filter state from the URL query string and
 * exposes update functions that write changes back into the URL. It
 * normalises and validates incoming values via parseQueryToFilters and
 * provides debounced inputs for the price fields to avoid updating the
 * query string on every keystroke.
 *
 * @param availableCategories A list of valid categories used to filter out
 * invalid category values from the query string.
 */
export function useUrlSyncedFilters(availableCategories: string[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive filters from the current query string. Memoising ensures the
  // object reference only changes when relevant parts of the URL change.
  const filters: Filters = useMemo(
    () => parseQueryToFilters(searchParams, availableCategories),
    [searchParams, availableCategories],
  );

  // Keep local string inputs for price fields so we can debounce them. The
  // inputs mirror the parsed filters and update whenever the filters change
  // due to back/forward navigation or a different filter being applied.
  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minPrice != null ? String(filters.minPrice) : '',
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxPrice != null ? String(filters.maxPrice) : '',
  );

  // Synchronise local inputs with filters when they change from the URL.
  useEffect(() => {
    setMinPriceInput(filters.minPrice != null ? String(filters.minPrice) : '');
    setMaxPriceInput(filters.maxPrice != null ? String(filters.maxPrice) : '');
  }, [filters.minPrice, filters.maxPrice]);

  // Debounce the price inputs so we only write to the URL after the user
  // pauses typing. 400ms is a good balance between responsiveness and
  // avoiding excessive URL updates.
  const debouncedMin = useDebouncedValue(minPriceInput, 400);
  const debouncedMax = useDebouncedValue(maxPriceInput, 400);

  // Whenever the debounced values change, update the URL if the derived
  // numbers differ from the current filters. Swapping min/max when the user
  // enters them in the wrong order keeps the interface forgiving.
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
      // Replace so intermediate keystrokes don't pollute the history stack
      setSearchParams(params, { replace: true });
    }
    // We intentionally exclude filters from deps to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMin, debouncedMax]);

  // Update functions for each filter. They create a new Filters object and
  // serialise it back into the query string. Most update functions push
  // onto the history stack so back/forward navigation works as expected.
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