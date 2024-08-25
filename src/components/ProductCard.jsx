import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardMedia, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import { ServerURL } from '../server/serverUrl';

const ProductCard = ({ product, isLoading }) => {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product?.Price || 0);
  const [productId, setProductId] = useState(0);
  const [productValue, setProductValue] = useState(0);

  const navigate = useNavigate();

  const handleProductClick = (event) => {
    const pdId = event.currentTarget.id; 
    const pdValue = event.currentTarget.getAttribute('name');
    setProductId(pdId); 
    setProductValue(pdValue);
    navigate(`/product-details?pdid=${btoa(pdId)}&pdname=${btoa(pdValue)}`);
  };

  const handleIncrement = (event) => {
    event.stopPropagation();  // Prevents click event from triggering card navigation
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice((prevPrice) => prevPrice + product.Price);
      return newQuantity;
    });
  };

  const handleDecrement = (event) => {
    event.stopPropagation();  // Prevents click event from triggering card navigation
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        setTotalPrice((prevPrice) => prevPrice - product.Price);
      }
      return prevQuantity > 0 ? prevQuantity - 1 : 0;
    });
  };

  return (
    <Card
      id={product?.Productid ? product.Productid : product?.Id}
      name={product.Description}
      value={product?.Productid ? product.Productid : product?.Id}
      onClick={handleProductClick}
      sx={{
        width: { xs: 160, sm: 220, md: 260, lg: 280 },
        height: { xs: 320, sm: 380, md: 400, lg: 420 },
        margin: '0 auto',
        textAlign: 'left',
        border: '1px solid #e8e8e8',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 7px 0 rgb(218 220 230 / 60%)',
        },
        '&:hover .card-media': {
          transform: 'scale(1.1)',
        },
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height="60%" />
      ) : (
        <Box sx={{ position: 'relative', height: { xs: '50%', sm: '55%', md: '60%' } }}>
          <CardMedia
            component="img"
            image={ImagePathRoutes.ProductImagePath + product.Img0}
            alt={product.Description}
            className="card-media"
            sx={{
              transition: 'all 0.3s ease-in-out',
              transform: 'scale(1)',
              width: '100%',
              height: '100%',
              padding: { xs: '10px', sm: '12px', md: '15px' },
              objectFit: 'contain',
            }}
          />
          {Math.round(product.Offer) > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                backgroundColor: '#fff6e0',
                color: '#5d3e03',
                padding: '2px 5px',
                borderRadius: '3px',
                border: '1px solid #90784159',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'inherit',
              }}
            >
              {Math.round(product.Offer)}% OFF
            </Box>
          )}
          <Box
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: product.isFavorite ? '#3BB77E' : '#FFF',
            }}
          >
            {product.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon size="small" sx={{ color: '#ee4372', fontSize: '18px' }} />}
          </Box>
        </Box>
      )}

      <CardContent sx={{ height: { xs: '50%', sm: '45%', md: '40%' }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {isLoading ? (
          <>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" width="100%" height={20} />
          </>
        ) : (
          <>
            <Box sx={{ flex: '1 0 auto' }}>
              <Typography
                variant="body2"
                component={"p"}
                name={product.Description}
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  lineHeight: '15px',
                  fontFamily: 'inherit',
                  minHeight: '32px',
                }}
              >
                {product.Description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                {product.quantity}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{ color: '#253D4E', fontSize: '14px', lineHeight: '24px', fontFamily: 'inherit' }}
              >
                {product.MultiplePriceEnable === 0 ? product.UnitType : <>Multiple price</>}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <Typography
                variant="body2"
                sx={{ color: '#253D4E', fontSize: '14px', lineHeight: '24px', fontFamily: 'inherit' }}
              >
                {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
              {product.MRP && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', fontSize: '12px', fontWeight: 200, color: '#a3a4ae', fontFamily: 'inherit' }}
                >
                  {'MRP:' + product.MRP.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              )}
            </Box>
            <Button 
              variant="outlined"
              sx={{ 
                width: "100%",
                display: quantity !== 0 ? 'flex' : 'none', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '10px',             
                border: '1px solid #3BB77E', 
                fontFamily: 'inherit',
                padding: { xs: '6px 0px', sm: '7px 0px', md: '7.2px 0px' },
                '&:hover':{
                  background: 'none',
                  border: '1px solid #3BB77E',
                  color: '#3BB77E'
                } 
              }}
            >
              <Typography 
                variant="body2" 
                onClick={(e) => { handleDecrement(e); }} 
                disabled={quantity === 0}
                sx={{    
                  width: '25%',          
                  color: '#3BB77E', 
                  fontFamily: 'inherit',
                }}
              >
                -
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  width: '50%',     
                  color: '#3BB77E',
                  fontFamily: 'inherit',
                }}
              >
                {quantity}
              </Typography>
              <Typography 
                variant="body2" 
                onClick={(e) => { handleIncrement(e); }} 
                sx={{ 
                  width: '25%',     
                  color: '#3BB77E',
                  fontFamily: 'inherit',
                }}
              >
                +
              </Typography>
            </Button>
            {product.InStock !== 0 ?
              <Button
                variant="outlined"
                sx={{ 
                  display: quantity !== 0 ? 'none' : 'block', 
                  marginTop: '10px', 
                  width: '100%', 
                  textTransform: 'none', 
                  fontFamily: 'inherit',
                  fontWeight: 600,  
                  border: '1px solid #3BB77E', 
                  backgroundColor: '#3bb77e1c',
                  color: '#3BB77E',
                  '&:hover':{
                    background: 'none',
                    border: '1px solid #3BB77E',
                    color: '#3BB77E'
                  } 
                }}
                id={product.Id}
                onClick={(e) => { handleIncrement(e); }} 
              >
                Add to Cart
              </Button>
            : 
              <Button
                variant="outlined"
                sx={{ 
                  marginTop: '10px', 
                  width: '100%', 
                  textTransform: 'none', 
                  fontFamily: 'inherit',  
                  border: '1px solid #dc3545', 
                  backgroundColor: '#dc3545',
                  color: '#FFF',          
                }}
                id={product.Id}
              >
                Out of Stock
              </Button>
            }
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
