import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Icon for the tag

const DeliveryBanner = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(90deg, #3bb77e1c 0%, #3bb77e1c 100%)',
        padding: '3px 20px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >      
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#3BB77E' }}>
        <LocalOfferIcon size="small" sx={{ marginRight: 1, fontSize: '14px' }} />
        <Typography variant="span" sx={{ fontWeight: 'bold', marginRight: 1, fontSize: '12px' }}>
          ₹62.51 saved!
        </Typography>
        <Typography variant="span" sx={{ marginRight: 1, color: '#000', fontSize: '12px' }}>
          You've saved <Typography variant="span" sx={{ fontWeight: 'bold', color: '#3BB77E'}}>₹0</Typography> on
        </Typography>
        <Button
          variant="text"
          sx={{
            padding: 0,
            minWidth: 'unset',
            color: '#3BB77E',
            textTransform: 'none',
            fontSize: '12px'
          }}
        >
          Delivery fee
        </Button>
      </Box>
    </Box>
  );
};

export default DeliveryBanner;
