import React, {useState} from 'react';
import { Box, Typography, Button, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CancelIcon from '@mui/icons-material/Cancel';

const OrderDetails = ({setActiveComponent}) => {
  const handleReturn = () => {
    
  };

  return (
    <>
    <Box sx={{ background: '#f0f4f9', maxHeight: '700px', overflowY: 'scroll', borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{backgroundColor: '#FFF', py: 2, px: 2, borderBottom: '1px solid #ececec' }} display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setActiveComponent('Orders')} startIcon={<ArrowBackIosIcon />} sx={{ color: '#000', fontWeight: 500 }}>Back</Button>
        <Button>
          Order Id #CB76ACVRE16624             
        </Button>            
      </Box>
      
      {/* Order Status */}
      <Box sx={{ backgroundColor: '#FFF', py: 2,  px: 2, borderBottom: '1px solid #ececec', display: 'flex', alignItems: 'center' }}>
        <CancelIcon sx={{ fontSize: 20, color: '#f44336' }} />
        <Box ml={1}>
          <Typography variant="p" fontWeight="600" sx={{fontSize: 18}}>
            1 item cancelled
          </Typography>
        </Box>
      </Box>

      {/* Order Items */}
      <Box sx={{backgroundColor: '#FFF', py: 2, px: 2}}>
        <Typography align="left" variant="body1" fontWeight="bold">1 item in order</Typography>
        <List>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar src="https://www.healthysteps.in/productimages/5193a2a9-2af9-40da-8384-d474d93ff39d.jpg" alt="Item Image" />
            </ListItemAvatar>
            <ListItemText
              primary="Dragon Fruit"
              secondary="10 piece - 1 unit"
            />
            <Typography variant="body2" align="right">
                <Typography sx={{fontSize: 14}} variant="span">₹81</Typography><br/>
                <Typography sx={{textDecoration: 'line-through', color: '#a3a4ae', fontSize: 12}} variant="span">MRP: ₹100</Typography>
            </Typography>            
          </ListItem>
        </List>
      </Box>

      {/* Bill Summary */}
      <Box sx={{backgroundColor: '#FFF', py: 2, px: 2, my: 1.5, boxShadow: '0 0 #0000, 0 0 #0000, 0px 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.1)'}}>
        <Typography align='left' variant="h6" gutterBottom>
          Bill Summary
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
          <Typography variant="body2" sx={{color: '#262a33', fontSize: '12px', fontWeight: 450}}>Item Total & GST</Typography>
          <Typography variant="body2">₹101.81</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
          <Typography variant="body2" sx={{color: '#262a33', fontSize: '12px', fontWeight: 450}}>Handling Charge</Typography>
          <Typography variant="body2">₹0.00</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
          <Typography variant="body2" sx={{color: '#000', fontSize: '12px', fontWeight: 450}}>Convenience Fee</Typography>
          <Typography variant="body2">₹0</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
          <Typography variant="body2" sx={{color: '#000', fontSize: '12px', fontWeight: 450}}>Delivery Fee</Typography>
          <Typography variant="body2">₹0</Typography>
        </Box>
        <Box sx={{borderBottom: '1px solid #ececec', pb: 1}} display="flex" alignItems="center" justifyContent="space-between" my={1}>
          <Typography variant="body2" sx={{color: '#000', fontSize: '12px', fontWeight: 450}}>Wallet Amount</Typography>
          <Typography variant="body2">₹25</Typography>
        </Box>
        <Box display="flex" mt={2} justifyContent="space-between">
          <Typography align='left' gutterBottom variant="body1" fontWeight="bold">Total Bill
          <Typography sx={{color: 'grey', fontWeight: 500, fontSize: '12px'}}>Incl. all taxes and charges</Typography>
          </Typography>          
          <Box align='right'>
            <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'grey', fontSize: 14 }}>MRP: ₹160.81</Typography>
            <Typography variant="body1" fontWeight="bold" color="success.main">₹107.30</Typography>
            <Typography variant="caption" color="success.main" 
            sx={{color: '#3BB77E',
                padding: '2px 6px',
                background: 'linear-gradient(45deg, rgba(34, 155, 82, 0.18), rgba(34, 155, 82, 0))'}}>SAVED ₹53.51</Typography>
          </Box>
        </Box>
      </Box>

      {/* Order Details */}
      <Box sx={{backgroundColor: '#FFF', py: 2, px: 2}} align='left'>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight="bold" gutterBottom>Order Details</Typography>
            <Box sx={{display: 'none'}} mt={2}>
                <Button size="small" sx={{background: '#3bb77e1c', color: '#3BB77E', border: '0.1px solid #3BB77E', borderRadius: 0}}>
                    Download Invoice
                </Button>
            </Box>
        </Box>
        <Box>
            <Typography variant="body2"><Typography gutterBottom style={{color: 'grey', fontWeight: 500, fontSize: '12px', margin: 0}}>Order ID:</Typography>CB76ACVRE16624</Typography>
            <Typography my={1} variant="body2"><Typography gutterBottom style={{color: 'grey', fontWeight: 500, fontSize: '12px', margin: 0}}>Delivery Address:</Typography>15, 15, vedha illam, Guduvanchery, indhira gandhi street, Meenakshi Nagar , 6/1, Saban Minminillam, Thailavaram, Tamil Nadu</Typography>
            <Typography variant="body2"><Typography gutterBottom style={{color: 'grey', fontWeight: 500, fontSize: '12px', margin: 0}}>Order Placed:</Typography>31st Aug 2024, 10:06 am</Typography>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default OrderDetails;
