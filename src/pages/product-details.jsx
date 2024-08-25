import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const ProductDetails = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="path_to_your_image.jpg"
            alt="Product Image"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: { xs: '100%', md: '400px' },
              margin: '0 auto',
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
            Healthy-steps-ragi-millet-noodles-195-grm
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
            MRP: ₹80.00
          </Typography>
          <Typography variant="h5" component="p" sx={{ color: 'green', mb: 2 }}>
            ₹70.00
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Add to Cart
          </Button>
          <Typography variant="body2" component="p">
            Some health benefits text goes here. Ensure this text is responsive and readable across all devices.
          </Typography>
        </Grid>
      </Grid>     
    </Box>
  );
};

export default ProductDetails;
