import React from 'react';
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Alert,
  Container,
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
 * CatalogPage - главная страница каталога товаров.
 * Управляет загрузкой данных, фильтрацией и отображением.
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

  // Получаем доступные категории
  const categories = React.useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category));
    return Array.from(set).sort();
  }, [products]);

  // URL-синхронизированные фильтры
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

  // Применяем фильтры к товарам
  const filteredProducts = React.useMemo(
    () => applyFilters(products, filters),
    [products, filters],
  );

  return (
    <Box>
      {/* Заголовок страницы */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Каталог товаров
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Панель фильтров */}
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

        {/* Список товаров */}
        <Grid item xs={12} md={9}>
          {/* Активные фильтры */}
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

          {/* Состояние загрузки */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress size={60} />
            </Box>
          )}

          {/* Ошибка */}
          {error && (
            <Alert severity="error" sx={{ mt: 4 }}>
              {error}
            </Alert>
          )}

          {/* Сетка товаров */}
          {!loading && !error && <ProductsGrid products={filteredProducts} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogPage;
