import React, { useMemo, useCallback } from 'react';
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import { Product } from '../entities/product/model/types';
import { fetchProducts } from '../shared/api/products';
import { applyFilters } from '../entities/product/model/filters';
import FiltersPanel from '../widgets/FiltersPanel';
import ProductsGrid from '../widgets/ProductsGrid';
import ActiveFilterChips from '../features/activeFilterChips/ActiveFilterChips';
import ResetFiltersButton from '../features/resetFilters/ResetFiltersButton';
import { useUrlSyncedFilters } from '../features/urlSyncedFilters/hooks';

/**
 * CatalogPage - main catalog page.
 * Manages data loading, filtering and display.
 * All data is memoized for performance optimization.
 */
const CatalogPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Загружаем продукты при монтировании
  React.useEffect(() => {
    const load = async () => {
      try {
        const loaded = await fetchProducts();
        setProducts(loaded);
      } catch (e) {
        console.error(e);
        setError('Не удалось загрузить товары');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Мемоизируем доступные категории
  const categories = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category));
    return Array.from(set).sort();
  }, [products]);

  // Мемоизируем доступные бренды
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [products]);

  // Мемоизируем доступные теги
  const tags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  }, [products]);

  // URL-синхронизированные фильтры
  const {
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
  } = useUrlSyncedFilters(categories, brands, tags);

  // Мемоизируем отфильтрованные продукты
  const filteredProducts = useMemo(
    () => applyFilters(products, filters),
    [products, filters],
  );

  // Мемоизируем обработчики удаления фильтров
  const handleRemoveCategory = useCallback(
    (cat: string) => {
      updateCategories(filters.categories.filter((c) => c !== cat));
    },
    [filters.categories, updateCategories],
  );

  const handleRemoveBrand = useCallback(
    (brand: string) => {
      updateBrands(filters.brands.filter((b) => b !== brand));
    },
    [filters.brands, updateBrands],
  );

  const handleRemoveTag = useCallback(
    (tag: string) => {
      updateTags(filters.tags.filter((t) => t !== tag));
    },
    [filters.tags, updateTags],
  );

  return (
    <Box>
      {/* Page title */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Product Catalog
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Filters panel */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 16 }}>
            <FiltersPanel
              categories={categories}
              brands={brands}
              tags={tags}
              filters={filters}
              minPriceInput={minPriceInput}
              maxPriceInput={maxPriceInput}
              minDiscountInput={minDiscountInput}
              minStockInput={minStockInput}
              onCategoriesChange={updateCategories}
              onBrandsChange={updateBrands}
              onTagsChange={updateTags}
              onMinPriceInputChange={updateMinPriceInput}
              onMaxPriceInputChange={updateMaxPriceInput}
              onMinDiscountInputChange={updateMinDiscountInput}
              onMinStockInputChange={updateMinStockInput}
              onInStockChange={updateInStock}
              onRatingChange={updateRating}
            />
            <Box sx={{ mt: 2 }}>
              <ResetFiltersButton onReset={resetFilters} />
            </Box>
          </Box>
        </Grid>

        {/* Product list */}
        <Grid item xs={12} md={9}>
          {/* Active filters */}
          <ActiveFilterChips
            filters={filters}
            onRemoveCategory={handleRemoveCategory}
            onRemoveBrand={handleRemoveBrand}
            onRemoveTag={handleRemoveTag}
            onClearMin={() => updateMinPriceInput('')}
            onClearMax={() => updateMaxPriceInput('')}
            onClearDiscount={() => updateMinDiscountInput('')}
            onClearMinStock={() => updateMinStockInput('')}
            onClearRating={() => updateRating(null)}
            onClearStock={() => updateInStock(false)}
          />

          {/* Loading state */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress size={60} />
            </Box>
          )}

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mt: 4 }}>
              {error}
            </Alert>
          )}

          {/* Product grid with pagination */}
          {!loading && !error && <ProductsGrid products={filteredProducts} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogPage;
