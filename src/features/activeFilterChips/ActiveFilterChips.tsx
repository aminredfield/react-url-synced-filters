import React, { useMemo } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { Filters } from '../../entities/product/model/types';

interface Props {
  filters: Filters;
  onRemoveCategory: (category: string) => void;
  onRemoveBrand: (brand: string) => void;
  onRemoveTag: (tag: string) => void;
  onClearMin: () => void;
  onClearMax: () => void;
  onClearDiscount: () => void;
  onClearMinStock: () => void;
  onClearRating: () => void;
  onClearStock: () => void;
}

/**
 * ActiveFilterChips displays active filters as chips
 * with ability to remove them.
 */
const ActiveFilterChips: React.FC<Props> = ({
  filters,
  onRemoveCategory,
  onRemoveBrand,
  onRemoveTag,
  onClearMin,
  onClearMax,
  onClearDiscount,
  onClearMinStock,
  onClearRating,
  onClearStock,
}) => {
  const chips = useMemo(() => {
    const result: React.ReactNode[] = [];

    // Category chips
    filters.categories.forEach((cat) => {
      result.push(
        <Chip
          key={`cat-${cat}`}
          label={`Category: ${cat}`}
          onDelete={() => onRemoveCategory(cat)}
          color="primary"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    });

    // Brand chips
    filters.brands.forEach((brand) => {
      result.push(
        <Chip
          key={`brand-${brand}`}
          label={`Brand: ${brand}`}
          onDelete={() => onRemoveBrand(brand)}
          color="secondary"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    });

    // Tag chips
    filters.tags.forEach((tag) => {
      result.push(
        <Chip
          key={`tag-${tag}`}
          label={`#${tag}`}
          onDelete={() => onRemoveTag(tag)}
          color="info"
          variant="outlined"
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    });

    // Min price chip
    if (filters.minPrice != null) {
      result.push(
        <Chip
          key="minPrice"
          label={`From $${filters.minPrice}`}
          onDelete={onClearMin}
          color="success"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Max price chip
    if (filters.maxPrice != null) {
      result.push(
        <Chip
          key="maxPrice"
          label={`Up to $${filters.maxPrice}`}
          onDelete={onClearMax}
          color="success"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Min discount chip
    if (filters.minDiscount != null) {
      result.push(
        <Chip
          key="minDiscount"
          label={`Discount ≥ ${filters.minDiscount}%`}
          onDelete={onClearDiscount}
          color="error"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Min stock chip
    if (filters.minStock != null) {
      result.push(
        <Chip
          key="minStock"
          label={`Stock ≥ ${filters.minStock}`}
          onDelete={onClearMinStock}
          color="warning"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Rating chip
    if (filters.rating != null) {
      result.push(
        <Chip
          key="rating"
          label={`Rating ≥ ${filters.rating}`}
          onDelete={onClearRating}
          color="primary"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // In stock chip
    if (filters.inStock) {
      result.push(
        <Chip
          key="inStock"
          label="In Stock Only"
          onDelete={onClearStock}
          color="success"
          variant="filled"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    return result;
  }, [
    filters,
    onRemoveCategory,
    onRemoveBrand,
    onRemoveTag,
    onClearMin,
    onClearMax,
    onClearDiscount,
    onClearMinStock,
    onClearRating,
    onClearStock,
  ]);

  if (chips.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Active Filters ({chips.length}):
      </Typography>
      <Box>{chips}</Box>
    </Box>
  );
};

export default ActiveFilterChips;
