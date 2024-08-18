import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeliveryBanner from './deliveryBanner';
import ProductItemCard from './productItemCard';
import SpecialOfferProduct from './specialOfferProducts';
import AccordionAmountDetails from './accordionAmountDetails';
import CouponModal from './couponsModal';
import emptyCartImage from '../../assets/empty-cart.png'; 

const drawerWidth = 380;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', 
  background: '#FFF',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: 'relative',    
  }),
);

export default function AppCart({ CartDrawerOpen, handleAuthDrawerToggle }) {
  const theme = useTheme();

  const products = [
    {
      image: 'http://13.200.71.164:9002//productimages/f6b009dc-38dc-406b-b532-09fc899c543b.png',
      name: 'Dove Cream Beauty Bar - Soft Smooth Dove Cream Beauty Bar',
      details: '5 x 125 g',
      price: 398,
      originalPrice: 463,
      quantity: 1,
    },
    {
      image: 'http://13.200.71.164:9002//productimages/5950243a-de02-45b8-be02-38fff0b090e9.jpg',
      name: 'Sunsilk Stunning Black Shine Shampoo',
      details: '180 ml',
      price: 149,
      originalPrice: 154,
      quantity: 1,
    },
    // Add more products as needed
  ];

  return (
    <div className="no-scrollbar relative bg-skin-grey-light">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,          
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: '#f0f4f9',
          },
        }}
        variant="persistent"
        anchor="right"
        open={CartDrawerOpen}
        onClose={() => handleAuthDrawerToggle(false)}
      >
        <DrawerHeader>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button onClick={handleAuthDrawerToggle} sx={{ color: "#000" }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              <Typography component={"p"} fontSize={"16"} fontWeight={600} sx={{ textTransform: "capitalize" }}>Cart</Typography>
            </Button>
            <Button sx={{ color: "red", textTransform: "capitalize" }}>
              clear cart
            </Button>
          </Box>
        </DrawerHeader>
        <DeliveryBanner/>

        <Main>
          {products.length === 0 ? (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
              <Box
                component="img"
                src={emptyCartImage}
                alt="Empty Cart"
                sx={{ width: 250, height: 140, margin: 'auto' }}
              />
              <Typography variant="h6" sx={{ marginTop: 2, fontSize: '16px', fontWeight: 600, fontFamily: 'inherit' }}>
                Your cart is empty
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 2, textTransform: 'capitalize', fontFamily: 'inherit' }}
              >
                Browse Products
              </Button>
            </Box>
          ) : (
            products.map((product, index) => (
              <Box key={index} sx={{ background: "#FFF" }}>
                <ProductItemCard product={product} />
              </Box>
            ))
          )}
          {/* <SpecialOfferProduct/> */}
          <CouponModal/>
          <AccordionAmountDetails/>
          
        </Main>
        <Main sx={{ position: 'fixed', bottom: '0', background: '#FFF' }}>
        <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <LocationOnIcon color="error" fontSize="small" />
            <Typography variant="body1" ml={1}>
              Home - 15, 15, vedha illam, Guduvanchery,...
            </Typography>
          </Box>
          <Box href="#" underline="always" sx={{ color: 'red', ml: 1 }}>
            Change
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox />
          <Typography variant="body1">
            Pay ₹75 from Wallet
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            To Pay
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            ₹2527.81
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: '50px',
            padding: '10px 24px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          CONTINUE TO PAYMENT
        </Button>
      </Box>
        </Main>
      </Drawer>      
    </div>
  );
}
