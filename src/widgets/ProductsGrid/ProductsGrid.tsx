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
 * ProductsGrid отображает карточки товаров в адаптивной сетке
 * с красивой пагинацией внизу. Пагинация синхронизирована с URL.
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
          Товары не найдены
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Попробуйте изменить параметры фильтра
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Информация о результатах */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Показано {startIndex + 1}–{Math.min(endIndex, products.length)} из {products.length} товаров
        </Typography>
      </Box>

      {/* Сетка товаров */}
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
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
            Страница {currentPage} из {totalPages}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ProductsGrid;
