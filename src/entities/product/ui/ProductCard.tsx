import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Product } from '../model/types';

interface Props {
  product: Product;
}

/**
 * ProductCard отображает краткую информацию о товаре.
 * Использует современный дизайн с улучшенной визуальной иерархией.
 */
const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        {/* Название товара */}
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          noWrap
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          {product.title}
        </Typography>

        {/* Категория */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mb: 1.5,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 500,
          }}
        >
          {product.category}
        </Typography>

        {/* Рейтинг */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            ({product.rating.toFixed(1)})
          </Typography>
        </Box>

        {/* Цена */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 1.5,
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>

        {/* Статус наличия */}
        {product.inStock ? (
          <Chip
            icon={<CheckCircleIcon />}
            label="В наличии"
            color="success"
            size="small"
            sx={{
              fontWeight: 500,
            }}
          />
        ) : (
          <Chip
            icon={<CancelIcon />}
            label="Нет в наличии"
            color="default"
            size="small"
            sx={{
              fontWeight: 500,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
