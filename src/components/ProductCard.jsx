import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardMedia, Skeleton, MenuItem, FormControl, Select } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import { ServerURL } from '../server/serverUrl';
import { API_InsertMyFavoriteProducts } from '../services/userServices';
import { useCart } from '../context/CartContext';
import { useTheme } from '@mui/material/styles';

const ProductCard = ({ product, isLoading, offerProducts, relatedProducts }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cartItems, setCartItems } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product?.Price || 0);
  const [productId, setProductId] = useState(0);
  const [productValue, setProductValue] = useState(0);
  let [isFavoriteProduct, setIsFavoriteProduct] = useState(0);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    event.stopPropagation();
    setAge(event.target.value);
  };

  useEffect(() => {
    const existingProduct = cartItems.find(item => item.Id === product?.Id);
    if (existingProduct) {
      setQuantity(existingProduct.item);
      setTotalPrice(existingProduct.totalPrice);
    } else {
      setQuantity(0);
      setTotalPrice(product?.Price || 0);
    }
  }, [cartItems, product]);
  
  // Update cartItems function
  const updateCartItems = (newQuantity, newTotalPrice, MRP) => {
    setCartItems(prevCartItems => {
      const existingProductIndex = prevCartItems.findIndex(item => item.Id === product?.Id);
      let updatedCartItems = [...prevCartItems];
  
      if (existingProductIndex >= 0) {
        if (newQuantity > 0) {
          updatedCartItems[existingProductIndex] = {
            ...updatedCartItems[existingProductIndex],
            item: newQuantity,
            totalPrice: newTotalPrice,
            totalMRP: MRP  
          };
        } else {
          updatedCartItems = updatedCartItems.filter(item => item.Id !== product?.Id);
        }
      } else if (newQuantity > 0) {
        updatedCartItems.push({ 
          ...product, 
          item: newQuantity, 
          totalPrice: newTotalPrice,
          totalMRP: MRP  
        });
      }
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };
  
  // Quantity increment function
  const handleIncrement = (event) => {
    event.stopPropagation();
    const newQuantity = quantity + 1;
    const newTotalPrice = newQuantity * product.Price;
    const MRP = newQuantity * product.MRP;
  
    setQuantity(newQuantity);
    setTotalPrice(newTotalPrice);
    updateCartItems(newQuantity, newTotalPrice, MRP);
  };
  
  // Quantity decrement function
  const handleDecrement = (event) => {
    event.stopPropagation();
    const newQuantity = quantity - 1;
    const newTotalPrice = newQuantity * product.Price;
    const MRP = newQuantity * product.MRP;
  
    if (newQuantity === 0) {
      setQuantity(0);
      setTotalPrice(product.Price);
      updateCartItems(0, product.Price, MRP); 
    } else if (quantity > 0) {
      setQuantity(newQuantity);
      setTotalPrice(newTotalPrice);
      updateCartItems(newQuantity, newTotalPrice, MRP);
    }
  };
  
  //View product description page
  const handleProductClick = (event) => {
    const pdId = event.currentTarget.id;
    const pdValue = event.currentTarget.getAttribute('name');
    setProductId(pdId);
    setProductValue(pdValue);
    navigate(`/product-details?pdid=${encodeURIComponent(btoa(pdId))}&pdname=${encodeURIComponent(btoa(pdId))}`);
  };

  //Add fav product
  const handleAddFavProduct = async (ProductId, event, status) => {
    event.stopPropagation();
    let userId = localStorage.getItem("userId");
    userId = Number(atob(userId));
    try {
      const response = await API_InsertMyFavoriteProducts(ProductId, userId);
      if (response.ok) {
        setIsFavoriteProduct(status === 'Add' ? isFavoriteProduct = 1 : isFavoriteProduct = 0);
        console.log("Product added successfully:", response);
      }
    } catch (error) {
      console.error("Error removing favorite product lists:", error);
    }
  };

  return (
    <Card
      id={product?.Productid ? product.Productid : product?.Id}
      name={product.Description}
      value={product?.Productid ? product.Productid : product?.Id}
      onClick={handleProductClick}
      sx={{
        width: { xs: offerProducts === null && relatedProducts === null ? 155 : 175, sm: 220, md: 260, lg: 280 },
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
        // Render skeleton placeholders for products
        Array.from(new Array(5)).map((_, index) => (
          <Box key={index} sx={{ padding: 2 }}>
            <Skeleton variant="rectangular" width={250} height={250} />
            <Skeleton variant="text" height={20} width="80%" sx={{ mt: 2 }} />
            <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" height={30} width="40%" sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" height={40} width="100%" sx={{ mt: 2 }} />
          </Box>
        ))
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
          {Math.round(product.Offer) === 0 && (
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
              color: product.isFavorite !== 0 ? theme.palette.basecolorCode.main : theme.palette.whitecolorCode.main,
            }}
            id={product.isFavorite !== null ? product.isFavorite : isFavoriteProduct}
          >
            {isFavoriteProduct !== 0 ? <FavoriteIcon size="small" sx={{ color: '#ee4372', fontSize: '18px' }} onClick={(event) => { handleAddFavProduct(product?.Productid ? product.Productid : product?.Id, event, 'Remove'); }} /> : <FavoriteBorderIcon onClick={(event) => { handleAddFavProduct(product?.Productid ? product.Productid : product?.Id, event, 'Add'); }} size="small" sx={{ color: '#ee4372', fontSize: '18px' }} />}
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
                  fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '14px', xl: '14px' }, 
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  lineHeight: '15px',
                  fontFamily: 'inherit',
                  minHeight: { xs: '23px', sm: '25px', md: '28px', lg: '32px', xl: '32px' }, 
                  color: theme.palette.lightblackcolorCode.main
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
                sx={{ color: theme.palette.lightblackcolorCode.main, fontSize: '14px', lineHeight: '24px', fontFamily: 'inherit' }}
              >
                {product.MultiplePriceEnable === 0 ? product.UnitType :
                  <Box sx={{ minWidth: 75, p: 0 }}>
                    <FormControl fullWidth sx={{ p: 0, border: 'none', }}>
                      <Select
                        sx={{ height: '30px', border: '1px dotted #999', '&:hover': { border: '1px dotted #999' } }}
                        size='small'
                        labelId="demo-simple-select-label-multi"
                        id="demo-simple-select-multi"
                        value={age}
                        onChange={(e) => { handleChange(e); }}
                      >
                        <MenuItem sx={{ px: 1, py: 0 }} value={10}>1kg</MenuItem>
                        <MenuItem sx={{ px: 1, py: 0 }} value={20}>500GM</MenuItem>
                        <MenuItem sx={{ px: 1, py: 0 }} value={30}>250GM</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                }
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.lightblackcolorCode.main, fontSize: '14px', lineHeight: '24px', fontFamily: 'inherit' }}
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
                border: '1px solid',
                borderColor: theme.palette.basecolorCode.main,
                fontFamily: 'inherit',
                padding: { xs: '6px 0px', sm: '7px 0px', md: '7.2px 0px' },
                '&:hover': {
                  background: 'none',
                  border: '1px solid',
                  borderColor: theme.palette.basecolorCode.main,
                  color: theme.palette.basecolorCode.main
                }
              }}
            >
              <Typography
                variant="body2"
                onClick={(e) => { handleDecrement(e); }}
                disabled={quantity === 0}
                sx={{
                  width: '25%',
                  color: theme.palette.basecolorCode.main,
                  fontFamily: 'inherit',
                }}
              >
                -
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: '50%',
                  color: theme.palette.basecolorCode.main,
                  fontFamily: 'inherit',
                }}
              >
                {quantity}
              </Typography>
              <Typography
                variant="body2"
                id={product?.Productid ? product.Productid : product?.Id}
                name={product.Description}
                value={product?.Productid ? product.Productid : product?.Id}
                onClick={(e) => { handleIncrement(e); }}
                sx={{
                  width: '25%',
                  color: theme.palette.basecolorCode.main,
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
                  border: '1px solid',
                  borderColor: theme.palette.basecolorCode.main,
                  backgroundColor: theme.palette.basecolorCode.secondary,
                  color: theme.palette.basecolorCode.main,
                  '&:hover': {
                    background: 'none',
                    border: '1px solid',
                    borderColor: theme.palette.basecolorCode.main,
                    color: theme.palette.basecolorCode.main,
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
                  color: theme.palette.whitecolorCode.main,
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
