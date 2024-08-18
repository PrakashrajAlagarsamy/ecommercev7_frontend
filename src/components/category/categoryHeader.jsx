import React from 'react';
import { Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

function CategoryHeader({ CategoryHeading, categoryId, categoryValue }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 
        className="font-bold"
        style={{ 
          fontSize: 'clamp(1rem, 4vw, 1.5rem)' // Responsive font size
        }}
      >
        {CategoryHeading}
      </h2>
      <Button
        id={categoryId}
        value={categoryValue}
        variant="outlined"
        endIcon={<ArrowForward />}
        sx={{
          mt: { xs: 2, sm: 0 }, // Margin top for mobile and tablet
          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '12px' }, // Responsive font size for button text
          padding: { xs: '2px 5px', sm: '4px 7px', md: '5px 10px' }, // Responsive padding
          background: 'none',
          borderColor: '#253D4E',
          color: '#253D4E',
          '&:hover': {
            background: '#253D4E',
            color: '#FFF',
          }
        }}
      >
        See All
      </Button>
    </div>
  );
}

export default CategoryHeader;
