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
} from '@mui/material';
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

// Configures the height of the dropdown for category multi‑select
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * FiltersPanel renders the filter controls. It is a presentational component
 * which receives state and handlers via props and delegates business logic
 * to higher level hooks. The UI uses MUI form components for consistency.
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
  // Handle category multi‑select changes. MUI returns either a string or an
  // array depending on how many values are selected. We normalise to an
  // array of strings.
  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onCategoriesChange(typeof value === 'string' ? value.split(',') : value);
  };

  // Handle rating select changes. An empty value means no rating filter.
  const handleRatingChange = (event: any) => {
    const value = event.target.value;
    if (value === '') {
      onRatingChange(null);
    } else {
      onRatingChange(Number(value));
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filters
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="categories-label">Category</InputLabel>
        <Select
          labelId="categories-label"
          id="categories"
          multiple
          value={filters.categories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Category" />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={filters.categories.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Min Price"
        type="number"
        size="small"
        fullWidth
        value={minPriceInput}
        onChange={(e) => onMinPriceInputChange(e.target.value)}
        sx={{ mb: 2 }}
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Max Price"
        type="number"
        size="small"
        fullWidth
        value={maxPriceInput}
        onChange={(e) => onMaxPriceInputChange(e.target.value)}
        sx={{ mb: 2 }}
        inputProps={{ min: 0 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.inStock}
            onChange={(e) => onInStockChange(e.target.checked)}
          />
        }
        label="In stock"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="rating-label">Rating ≥</InputLabel>
        <Select
          labelId="rating-label"
          id="rating-select"
          value={filters.rating ?? ''}
          label="Rating ≥"
          onChange={handleRatingChange}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          {[5, 4, 3, 2, 1].map((r) => (
            <MenuItem key={r} value={r}>
              {r} & up
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltersPanel;