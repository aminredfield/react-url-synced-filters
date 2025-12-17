import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
  CardMedia,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Product } from '../model/types';

interface Props {
  product: Product;
}

/**
 * ProductCard отображает краткую информацию о товаре.
 * Использует современный дизайн с улучшенной визуальной иерархией.
 */
const ProductCard: React.FC<Props> = ({ product }) => {
  // Берем первое изображение или thumbnail
  const imageUrl = product.images.length > 0 ? product.images[0] : product.thumbnail;
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Изображение товара */}
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={product.title}
          sx={{
            objectFit: 'cover',
            backgroundColor: 'grey.100',
          }}
        />
      )}
      
      {/* Бейдж скидки */}
      {product.discountPercentage > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'error.main',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            boxShadow: 2,
          }}
        >
          <LocalOfferIcon sx={{ fontSize: 16 }} />
          -{Math.round(product.discountPercentage)}%
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        {/* Название товара */}
        <Typography 
          variant="h6" 
          component="div" 
          gutterBottom 
          noWrap
          sx={{ 
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {product.title}
        </Typography>
        
        {/* Бренд и категория */}
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          {product.brand && (
            <Typography 
              variant="caption" 
              sx={{ 
                bgcolor: 'primary.50',
                color: 'primary.main',
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            >
              {product.brand}
            </Typography>
          )}
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: 500,
            }}
          >
            {product.category}
          </Typography>
        </Stack>
        
        {/* Рейтинг */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{ mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            ({product.rating.toFixed(1)})
          </Typography>
        </Box>
        
        {/* Цена */}
        <Box sx={{ mb: 1.5 }}>
          {product.discountPercentage > 0 ? (
            <Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  textDecoration: 'line-through',
                  color: 'text.disabled',
                  mr: 1,
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Typography 
                variant="h5" 
                component="span"
                sx={{ 
                  fontWeight: 700,
                  color: 'error.main',
                }}
              >
                ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
              </Typography>
            </Box>
          ) : (
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
        
        {/* Статусы */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {product.inStock ? (
            <Chip 
              icon={<CheckCircleIcon />}
              label={`В наличии: ${product.stock}`}
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
