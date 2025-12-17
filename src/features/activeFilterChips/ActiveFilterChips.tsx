import React from 'react';
import { Box, Chip } from '@mui/material';
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
 * ActiveFilterChips summarises the currently applied filters and allows
 * users to remove individual filters directly via chip delete actions.
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

  // Render a chip per selected category
  filters.categories.forEach((cat) => {
    chips.push(
      <Chip
        key={`cat-${cat}`}
        label={cat}
        onDelete={() => onRemoveCategory(cat)}
        color="primary"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  });

  // Price chips
  if (filters.minPrice != null) {
    chips.push(
      <Chip
        key="minPrice"
        label={`Min: $${filters.minPrice}`}
        onDelete={onClearMin}
        color="primary"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  if (filters.maxPrice != null) {
    chips.push(
      <Chip
        key="maxPrice"
        label={`Max: $${filters.maxPrice}`}
        onDelete={onClearMax}
        color="primary"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  // Rating chip
  if (filters.rating != null) {
    chips.push(
      <Chip
        key="rating"
        label={`Rating ≥ ${filters.rating}`}
        onDelete={onClearRating}
        color="primary"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  // Stock chip
  if (filters.inStock) {
    chips.push(
      <Chip
        key="inStock"
        label="In Stock"
        onDelete={onClearStock}
        color="primary"
        sx={{ mr: 1, mb: 1 }}
      />,
    );
  }

  if (chips.length === 0) {
    return null;
  }

  return <Box sx={{ mb: 2 }}>{chips}</Box>;
};

export default ActiveFilterChips;