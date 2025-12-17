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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Filters } from '../../entities/product/model/types';

interface Props {
  categories: string[];
  brands: string[];
  tags: string[];
  filters: Filters;
  minPriceInput: string;
  maxPriceInput: string;
  minDiscountInput: string;
  minStockInput: string;
  onCategoriesChange: (categories: string[]) => void;
  onBrandsChange: (brands: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  onMinPriceInputChange: (value: string) => void;
  onMaxPriceInputChange: (value: string) => void;
  onMinDiscountInputChange: (value: string) => void;
  onMinStockInputChange: (value: string) => void;
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
 * FiltersPanel - advanced filters panel with accordions.
 */
const FiltersPanel: React.FC<Props> = ({
  categories,
  brands,
  tags,
  filters,
  minPriceInput,
  maxPriceInput,
  minDiscountInput,
  minStockInput,
  onCategoriesChange,
  onBrandsChange,
  onTagsChange,
  onMinPriceInputChange,
  onMaxPriceInputChange,
  onMinDiscountInputChange,
  onMinStockInputChange,
  onInStockChange,
  onRatingChange,
}) => {
  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onCategoriesChange(typeof value === 'string' ? value.split(',') : value);
  };

  const handleBrandChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onBrandsChange(typeof value === 'string' ? value.split(',') : value);
  };

  const handleTagChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onTagsChange(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRatingChange = (event: any) => {
    const val = event.target.value;
    onRatingChange(val === '' ? null : Number(val));
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Main filters */}
      <Box sx={{ p: 3, pt: 2 }}>
        {/* Categories */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="category-label">Categories</InputLabel>
          <Select
            labelId="category-label"
            multiple
            value={filters.categories}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Categories" />}
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

        {/* Brands */}
        {brands.length > 0 && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="brand-label">Brands</InputLabel>
            <Select
              labelId="brand-label"
              multiple
              value={filters.brands}
              onChange={handleBrandChange}
              input={<OutlinedInput label="Brands" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  <Checkbox checked={filters.brands.includes(brand)} />
                  <ListItemText primary={brand} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="tag-label">Tags</InputLabel>
            <Select
              labelId="tag-label"
              multiple
              value={filters.tags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={filters.tags.includes(tag)} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Rating */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="rating-label">Minimum Rating</InputLabel>
          <Select
            labelId="rating-label"
            value={filters.rating ?? ''}
            onChange={handleRatingChange}
            label="Minimum Rating"
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value={5}>⭐⭐⭐⭐⭐ (5)</MenuItem>
            <MenuItem value={4}>⭐⭐⭐⭐ (4+)</MenuItem>
            <MenuItem value={3}>⭐⭐⭐ (3+)</MenuItem>
            <MenuItem value={2}>⭐⭐ (2+)</MenuItem>
            <MenuItem value={1}>⭐ (1+)</MenuItem>
          </Select>
        </FormControl>

        {/* In stock */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.inStock}
              onChange={(e) => onInStockChange(e.target.checked)}
              color="primary"
            />
          }
          label="In Stock Only"
          sx={{ 
            '& .MuiFormControlLabel-label': {
              fontWeight: 500,
            }
          }}
        />
      </Box>

      <Divider />

      {/* Additional filters in accordions */}
      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Min"
              type="number"
              value={minPriceInput}
              onChange={(e) => onMinPriceInputChange(e.target.value)}
              size="small"
              fullWidth
              inputProps={{ min: 0, step: 1 }}
            />
            <TextField
              label="Max"
              type="number"
              value={maxPriceInput}
              onChange={(e) => onMaxPriceInputChange(e.target.value)}
              size="small"
              fullWidth
              inputProps={{ min: 0, step: 1 }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Discount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Minimum Discount (%)"
            type="number"
            value={minDiscountInput}
            onChange={(e) => onMinDiscountInputChange(e.target.value)}
            size="small"
            fullWidth
            inputProps={{ min: 0, max: 100, step: 5 }}
            helperText="Products with discount from specified percentage"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Stock Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Minimum Quantity"
            type="number"
            value={minStockInput}
            onChange={(e) => onMinStockInputChange(e.target.value)}
            size="small"
            fullWidth
            inputProps={{ min: 0, step: 10 }}
            helperText="Products with stock quantity from specified amount"
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FiltersPanel;
