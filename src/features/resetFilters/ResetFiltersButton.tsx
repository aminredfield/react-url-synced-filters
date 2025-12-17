import React from 'react';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface Props {
  onReset: () => void;
}

/**
 * ResetFiltersButton - button to reset all filters.
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
      Reset Filters
    </Button>
  );
};

export default ResetFiltersButton;
