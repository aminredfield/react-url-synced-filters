import React from 'react';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
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
 * CatalogPage orchestrates loading the products, deriving available categories,
 * and wiring up the URL‑synchronised filters. It shows loading/error states,
 * a filters sidebar, active filter chips, and the resulting products grid.
 */
const CatalogPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch products on mount. If remote fetch fails, the API layer
  // automatically falls back to local mocks.
  React.useEffect(() => {
    const load = async () => {
      try {
        const loaded = await fetchProducts();
        setProducts(loaded);
      } catch (e) {
        console.error(e);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Derive the available categories from loaded products. Using a Set
  // ensures uniqueness. Categories drive the category filter UI and also
  // validation of incoming query parameters.
  const categories = React.useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  // Pull URL‑synced filters. All update functions return new search params
  // to ensure back/forward navigation works correctly. Min/max price inputs
  // are debounced internally to avoid spamming the URL while typing.
  const {
    filters,
    updateCategories,
    updateInStock,
    updateRating,
    minPriceInput,
    maxPriceInput,
    updateMinPriceInput,
    updateMaxPriceInput,
    resetFilters,
  } = useUrlSyncedFilters(categories);

  // Apply filters to the products. useMemo avoids recomputing on every
  // render when filters or products have not changed.
  const filteredProducts = React.useMemo(
    () => applyFilters(products, filters),
    [products, filters],
  );

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Grid container spacing={3}>
        {/* Filters sidebar */}
        <Grid item xs={12} md={3}>
          <FiltersPanel
            categories={categories}
            filters={filters}
            minPriceInput={minPriceInput}
            maxPriceInput={maxPriceInput}
            onCategoriesChange={updateCategories}
            onMinPriceInputChange={updateMinPriceInput}
            onMaxPriceInputChange={updateMaxPriceInput}
            onInStockChange={updateInStock}
            onRatingChange={updateRating}
          />
          <Box sx={{ mt: 2 }}>
            <ResetFiltersButton onReset={resetFilters} />
          </Box>
        </Grid>

        {/* Products section */}
        <Grid item xs={12} md={9}>
          {/* Chips summarising the active filters with the ability to remove them */}
          <ActiveFilterChips
            filters={filters}
            onRemoveCategory={(cat) =>
              updateCategories(filters.categories.filter((c) => c !== cat))
            }
            onClearMin={() => updateMinPriceInput('')}
            onClearMax={() => updateMaxPriceInput('')}
            onClearRating={() => updateRating(null)}
            onClearStock={() => updateInStock(false)}
          />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Box sx={{ mt: 4 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
          {!loading && !error && <ProductsGrid products={filteredProducts} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CatalogPage;