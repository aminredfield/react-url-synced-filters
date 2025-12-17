import React from 'react';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface Props {
  onReset: () => void;
}

/**
 * ResetFiltersButton - кнопка для сброса всех фильтров.
 */
const ResetFiltersButton: React.FC<Props> = ({ onReset }) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<RestartAltIcon />}
      onClick={onReset}
      sx={{ 
        fontWeight: 600,
      }}
    >
      Сбросить фильтры
    </Button>
  );
};

export default ResetFiltersButton;
