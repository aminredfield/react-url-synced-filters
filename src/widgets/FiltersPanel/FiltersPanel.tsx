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
 * FiltersPanel - расширенная панель фильтров с аккордеонами.
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
      {/* Заголовок */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Фильтры
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Основные фильтры */}
      <Box sx={{ p: 3, pt: 2 }}>
        {/* Категории */}
        <FormControl fullWidth sx={{ mb: 2 }}>
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

        {/* Бренды */}
        {brands.length > 0 && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="brand-label">Бренды</InputLabel>
            <Select
              labelId="brand-label"
              multiple
              value={filters.brands}
              onChange={handleBrandChange}
              input={<OutlinedInput label="Бренды" />}
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

        {/* Теги */}
        {tags.length > 0 && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="tag-label">Теги</InputLabel>
            <Select
              labelId="tag-label"
              multiple
              value={filters.tags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Теги" />}
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

        {/* Рейтинг */}
        <FormControl fullWidth sx={{ mb: 2 }}>
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
      </Box>

      <Divider />

      {/* Дополнительные фильтры в аккордеонах */}
      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Цена</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Скидка</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Минимальная скидка (%)"
            type="number"
            value={minDiscountInput}
            onChange={(e) => onMinDiscountInputChange(e.target.value)}
            size="small"
            fullWidth
            inputProps={{ min: 0, max: 100, step: 5 }}
            helperText="Товары со скидкой от указанного процента"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Наличие на складе</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Минимальное количество"
            type="number"
            value={minStockInput}
            onChange={(e) => onMinStockInputChange(e.target.value)}
            size="small"
            fullWidth
            inputProps={{ min: 0, step: 10 }}
            helperText="Товары с количеством на складе от указанного"
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FiltersPanel;
