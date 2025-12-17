import React, { useMemo } from 'react';
import { Grid, Box, Typography, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../entities/product/model/types';
import ProductCard from '../../entities/product/ui/ProductCard';
import { parsePageFromQuery, setPageInQuery } from '../../shared/utils/query';

interface Props {
  products: Product[];
  itemsPerPage?: number;
}

/**
 * ProductsGrid displays product cards in responsive grid
 * with beautiful pagination at the bottom. Pagination is synced with URL.
 */
const ProductsGrid: React.FC<Props> = ({ products, itemsPerPage = 12 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Читаем текущую страницу из URL
  const currentPage = useMemo(() => parsePageFromQuery(searchParams), [searchParams]);
  
  // Вычисляем общее количество страниц
  const totalPages = useMemo(
    () => Math.ceil(products.length / itemsPerPage),
    [products.length, itemsPerPage],
  );
  
  // Вычисляем индексы для текущей страницы
  const { startIndex, endIndex, currentProducts } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      startIndex: start,
      endIndex: end,
      currentProducts: products.slice(start, end),
    };
  }, [currentPage, itemsPerPage, products]);
  
  // Обработчик смены страницы - обновляет URL
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    const newParams = setPageInQuery(searchParams, page);
    setSearchParams(newParams);
    // Прокручиваем к началу списка товаров
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Сбрасываем на первую страницу если текущая страница больше общего количества
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const newParams = setPageInQuery(searchParams, 1);
      setSearchParams(newParams, { replace: true });
    }
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  if (products.length === 0) {
    return (
      <Box 
        sx={{ 
          mt: 4, 
          p: 6, 
          textAlign: 'center',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try changing filter parameters
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Results info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {startIndex + 1}–{Math.min(endIndex, products.length)} of {products.length} products
        </Typography>
      </Box>

      {/* Product grid */}
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack 
          spacing={2} 
          alignItems="center" 
          sx={{ 
            mt: 5,
            mb: 2,
          }}
        >
          <Pagination 
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 500,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Page {currentPage} of {totalPages}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ProductsGrid;
