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
 * ActiveFilterChips отображает активные фильтры в виде чипов
 * с возможностью их удаления.
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

    // Чипы для категорий
    filters.categories.forEach((cat) => {
      result.push(
        <Chip
          key={`cat-${cat}`}
          label={`Категория: ${cat}`}
          onDelete={() => onRemoveCategory(cat)}
          color="primary"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    });

    // Чипы для брендов
    filters.brands.forEach((brand) => {
      result.push(
        <Chip
          key={`brand-${brand}`}
          label={`Бренд: ${brand}`}
          onDelete={() => onRemoveBrand(brand)}
          color="secondary"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    });

    // Чипы для тегов
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

    // Чип минимальной цены
    if (filters.minPrice != null) {
      result.push(
        <Chip
          key="minPrice"
          label={`От $${filters.minPrice}`}
          onDelete={onClearMin}
          color="success"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Чип максимальной цены
    if (filters.maxPrice != null) {
      result.push(
        <Chip
          key="maxPrice"
          label={`До $${filters.maxPrice}`}
          onDelete={onClearMax}
          color="success"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Чип минимальной скидки
    if (filters.minDiscount != null) {
      result.push(
        <Chip
          key="minDiscount"
          label={`Скидка ≥ ${filters.minDiscount}%`}
          onDelete={onClearDiscount}
          color="error"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Чип минимального количества на складе
    if (filters.minStock != null) {
      result.push(
        <Chip
          key="minStock"
          label={`На складе ≥ ${filters.minStock}`}
          onDelete={onClearMinStock}
          color="warning"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />,
      );
    }

    // Чип рейтинга
    if (filters.rating != null) {
      result.push(
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
      result.push(
        <Chip
          key="inStock"
          label="Только в наличии"
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
        Активные фильтры ({chips.length}):
      </Typography>
      <Box>{chips}</Box>
    </Box>
  );
};

export default ActiveFilterChips;
