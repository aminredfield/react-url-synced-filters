import React, { useState } from 'react';
import { Grid, Box, Typography, Pagination, Stack } from '@mui/material';
import { Product } from '../../entities/product/model/types';
import ProductCard from '../../entities/product/ui/ProductCard';

interface Props {
  products: Product[];
  itemsPerPage?: number;
}

/**
 * ProductsGrid отображает карточки товаров в адаптивной сетке
 * с красивой пагинацией внизу.
 */
const ProductsGrid: React.FC<Props> = ({ products, itemsPerPage = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Вычисляем индексы для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Обработчик смены страницы
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    // Прокручиваем к началу списка товаров
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Сбрасываем страницу на первую при изменении списка товаров
  React.useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

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
