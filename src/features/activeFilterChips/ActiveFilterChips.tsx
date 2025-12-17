import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { Filters } from '../../entities/product/model/types';

interface Props {
  filters: Filters;
  onRemoveCategory: (category: string) => void;
  onClearMin: () => void;
  onClearMax: () => void;
  onClearRating: () => void;
  onClearStock: () => void;
}

/**
 * ActiveFilterChips отображает активные фильтры в виде чипов
 * с возможностью их удаления.
 */
const ActiveFilterChips: React.FC<Props> = ({
  filters,
  onRemoveCategory,
  onClearMin,
  onClearMax,
  onClearRating,
  onClearStock,
}) => {
  const chips: React.ReactNode[] = [];

  // Чипы для категорий
  filters.categories.forEach((cat) => {
    chips.push(
      <Chip
        key={`cat-${cat}`}
        label={cat}
        onDelete={() => onRemoveCategory(cat)}
        color="primary"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  });

  // Чип минимальной цены
  if (filters.minPrice != null) {
    chips.push(
      <Chip
        key="minPrice"
        label={`От $${filters.minPrice}`}
        onDelete={onClearMin}
        color="primary"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  // Чип максимальной цены
  if (filters.maxPrice != null) {
    chips.push(
      <Chip
        key="maxPrice"
        label={`До $${filters.maxPrice}`}
        onDelete={onClearMax}
        color="primary"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  // Чип рейтинга
  if (filters.rating != null) {
    chips.push(
      <Chip
        key="rating"
        label={`Рейтинг ≥ ${filters.rating}`}
        onDelete={onClearRating}
        color="primary"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  // Чип наличия
  if (filters.inStock) {
    chips.push(
      <Chip
        key="inStock"
        label="В наличии"
        onDelete={onClearStock}
        color="primary"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Активные фильтры:
      </Typography>
      <Box>{chips}</Box>
    </Box>
  );
};

export default ActiveFilterChips;
