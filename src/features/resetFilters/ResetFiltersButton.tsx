import React from 'react';
import { Button } from '@mui/material';

interface Props {
  onReset: () => void;
}

/**
 * ResetFiltersButton triggers a complete reset of all filters. It is kept
 * separate from the filters panel to emphasise its importance and avoid
 * accidental clicks.
 */
const ResetFiltersButton: React.FC<Props> = ({ onReset }) => {
  return (
    <Button variant="outlined" color="secondary" fullWidth onClick={onReset}>
      Reset Filters
    </Button>
  );
};

export default ResetFiltersButton;