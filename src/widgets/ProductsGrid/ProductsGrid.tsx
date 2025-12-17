import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Product } from '../../entities/product/model/types';
import ProductCard from '../../entities/product/ui/ProductCard';

interface Props {
  products: Product[];
}

/**
 * ProductsGrid lays out product cards in a responsive grid. When no
 * products are present it shows a friendly empty state message.
 */
const ProductsGrid: React.FC<Props> = ({ products }) => {
  if (products.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography>No products found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsGrid;