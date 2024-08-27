import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { Edit, Delete, LocationOn } from '@mui/icons-material';

const Address = () => {
  const addresses = [
    {
      label: 'Home',
      address: '15, 15, vedha illam, Guduvanchery, indhira gandhi street, Meenakshi Nagar, 6/1, Saban Minimnillam, Thailavaram, Tamil Nadu',
    },
    {
      label: 'Work',
      address: 'Ground floor, The WorkVilla, 110, Uthamar Gandhi Road, Subba Road Avenue, Nungambakkam, Chennai, Tamil Nadu',
    },
    {
      label: 'Other',
      address: '1, Nungambakkam Railway Station, Nungambakkam Railway Station, Railway Border Road, Sowrashtra Nagar, Choolaimedu, Chennai, Tamil Nadu',
    },
  ];

  return (
    <Box sx={{ background: '#FFF', maxHeight: '500px', overflowY: 'scroll', p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">All Saved Addresses</Typography>
        <Button variant="contained" color="secondary" sx={{ backgroundColor: '#ff4081' }}>
          Add New Address
        </Button>
      </Box>
      {addresses.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" py={2} mb={2} sx={{borderBottom: '1px solid #efefef'}}>
          <Box sx={{mr: 2}}>
            <svg fill="none" height="24" viewBox="0 0 26 26" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.9204 18.682L12.552 17.9718H12.552L12.9204 18.682ZM12.0801 18.682L12.4484 17.9718H12.4484L12.0801 18.682ZM19.0891 9.38889C19.0891 11.7465 17.8884 13.6759 16.4236 15.1534C14.9596 16.63 13.2988 17.5845 12.552 17.9718L13.2887 19.3921C14.1073 18.9675 15.9308 17.923 17.5598 16.2798C19.1881 14.6375 20.6891 12.3263 20.6891 9.38889H19.0891ZM12.5002 2.8C16.1392 2.8 19.0891 5.74995 19.0891 9.38889H20.6891C20.6891 4.86629 17.0228 1.2 12.5002 1.2V2.8ZM5.91133 9.38889C5.91133 5.74995 8.86127 2.8 12.5002 2.8V1.2C7.97762 1.2 4.31133 4.86629 4.31133 9.38889H5.91133ZM12.4484 17.9718C11.7017 17.5845 10.0408 16.63 8.57682 15.1534C7.11206 13.6759 5.91133 11.7465 5.91133 9.38889H4.31133C4.31133 12.3263 5.8123 14.6375 7.44059 16.2798C9.06961 17.923 10.8932 18.9675 11.7117 19.3921L12.4484 17.9718ZM12.552 17.9718C12.5307 17.9828 12.5135 17.9858 12.5002 17.9858C12.4869 17.9858 12.4697 17.9828 12.4484 17.9718L11.7117 19.3921C12.2096 19.6504 12.7908 19.6504 13.2887 19.3921L12.552 17.9718ZM14.8668 9.38932C14.8668 10.6964 13.8072 11.756 12.5002 11.756V13.356C14.6909 13.356 16.4668 11.5801 16.4668 9.38932H14.8668ZM12.5002 7.02266C13.8072 7.02266 14.8668 8.08225 14.8668 9.38932H16.4668C16.4668 7.19859 14.6909 5.42266 12.5002 5.42266V7.02266ZM10.1335 9.38932C10.1335 8.08225 11.1931 7.02266 12.5002 7.02266V5.42266C10.3094 5.42266 8.5335 7.19859 8.5335 9.38932H10.1335ZM12.5002 11.756C11.1931 11.756 10.1335 10.6964 10.1335 9.38932H8.5335C8.5335 11.5801 10.3094 13.356 12.5002 13.356V11.756Z" fill="black"></path><path d="M20.7272 18.3607C21.561 18.8421 22 19.3881 22 19.944C22 20.4999 21.561 21.0459 20.7272 21.5273C19.8934 22.0087 18.6942 22.4085 17.25 22.6864C15.8058 22.9644 14.1676 23.1107 12.5 23.1107C10.8324 23.1107 9.19418 22.9644 7.75 22.6864C6.30582 22.4085 5.10656 22.0087 4.27276 21.5273C3.43896 21.046 3 20.4999 3 19.944C3 19.3881 3.43896 18.8421 4.27276 18.3607" stroke="black" stroke-linecap="round" stroke-width="1.6"></path></svg>      
          </Box>
          <Box sx={{textAlign: 'left'}}>
          <Typography variant="h6" fontSize={16} fontWeight="bold">{item.label}</Typography>
          <Typography variant="body1" fontSize={16} color="textSecondary" mb={1}>{item.address}</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <IconButton size="small" color="inherit" sx={{color: "gray"}}>
              <Edit />
            </IconButton>
            <IconButton size="small" color="inherit" sx={{color: "gray"}}>
              <Delete />
            </IconButton>
          </Box>
          {index < addresses.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default Address;
