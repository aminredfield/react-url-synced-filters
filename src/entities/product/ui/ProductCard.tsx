import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import { Product } from '../model/types';

interface Props {
  product: Product;
}

/**
 * ProductCard displays a concise summary of a product including its title,
 * category, price, stock status and rating. It relies purely on props and
 * contains no business logic.
 */
const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {product.category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {product.rating.toFixed(1)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          ${product.price.toFixed(2)}
        </Typography>
        {product.inStock ? (
          <Chip label="In Stock" color="success" size="small" sx={{ mt: 1 }} />
        ) : (
          <Chip label="Out of Stock" color="default" size="small" sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;