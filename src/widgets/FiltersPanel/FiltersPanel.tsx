import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Filters } from '../../entities/product/model/types';

interface Props {
  categories: string[];
  filters: Filters;
  minPriceInput: string;
  maxPriceInput: string;
  onCategoriesChange: (categories: string[]) => void;
  onMinPriceInputChange: (value: string) => void;
  onMaxPriceInputChange: (value: string) => void;
  onInStockChange: (value: boolean) => void;
  onRatingChange: (value: number | null) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * FiltersPanel - современная панель фильтров с улучшенным дизайном.
 */
const FiltersPanel: React.FC<Props> = ({
  categories,
  filters,
  minPriceInput,
  maxPriceInput,
  onCategoriesChange,
  onMinPriceInputChange,
  onMaxPriceInputChange,
  onInStockChange,
  onRatingChange,
}) => {
  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onCategoriesChange(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRatingChange = (event: any) => {
    const val = event.target.value;
    onRatingChange(val === '' ? null : Number(val));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Заголовок */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Фильтры
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Категории */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="category-label">Категории</InputLabel>
        <Select
          labelId="category-label"
          multiple
          value={filters.categories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Категории" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox checked={filters.categories.includes(cat)} />
              <ListItemText primary={cat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Цена */}
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
        Диапазон цен
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Мин"
          type="number"
          value={minPriceInput}
          onChange={(e) => onMinPriceInputChange(e.target.value)}
          size="small"
          fullWidth
          inputProps={{ min: 0, step: 1 }}
        />
        <TextField
          label="Макс"
          type="number"
          value={maxPriceInput}
          onChange={(e) => onMaxPriceInputChange(e.target.value)}
          size="small"
          fullWidth
          inputProps={{ min: 0, step: 1 }}
        />
      </Box>

      {/* Рейтинг */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="rating-label">Минимальный рейтинг</InputLabel>
        <Select
          labelId="rating-label"
          value={filters.rating ?? ''}
          onChange={handleRatingChange}
          label="Минимальный рейтинг"
        >
          <MenuItem value="">Любой</MenuItem>
          <MenuItem value={5}>⭐⭐⭐⭐⭐ (5)</MenuItem>
          <MenuItem value={4}>⭐⭐⭐⭐ (4+)</MenuItem>
          <MenuItem value={3}>⭐⭐⭐ (3+)</MenuItem>
          <MenuItem value={2}>⭐⭐ (2+)</MenuItem>
          <MenuItem value={1}>⭐ (1+)</MenuItem>
        </Select>
      </FormControl>

      {/* В наличии */}
      <FormControlLabel
        control={
          <Checkbox
            checked={filters.inStock}
            onChange={(e) => onInStockChange(e.target.checked)}
            color="primary"
          />
        }
        label="Только в наличии"
        sx={{
          '& .MuiFormControlLabel-label': {
            fontWeight: 500,
          }
        }}
      />
    </Paper>
  );
};

export default FiltersPanel;
