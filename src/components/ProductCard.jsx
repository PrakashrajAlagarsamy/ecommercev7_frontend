/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardMedia, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import { ServerURL } from '../server/serverUrl';
import { API_InsertMyFavoriteProducts } from '../services/userServices';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, isLoading, offerProducts, relatedProducts }) => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product?.Price || 0);
  const [productId, setProductId] = useState(0);
  const [productValue, setProductValue] = useState(0);  
  let [isFavoriteProduct, setIsFavoriteProduct] = useState(0);  
  let [isProductAdd, setIsProductAdd] = useState(0);

  useEffect(() => {
    // Check if the current product is already in the cart and set the quantity accordingly
    const existingProduct = cartItems.find(
      (item) => item.id === product?.Productid || product?.Id
    );
    if (existingProduct) {
      setQuantity(existingProduct.item);
      setTotalPrice(existingProduct.totalPrice);
    }
    else{
      setQuantity(product?.item || 0);
      setTotalPrice(product?.Price || 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, product?.Productid, product?.Id]);


  //View product description page
  const handleProductClick = (event) => {
    const pdId = event.currentTarget.id;
    const pdValue = event.currentTarget.getAttribute('name');
    setProductId(pdId);
    setProductValue(pdValue);
    navigate(`/product-details?pdid=${encodeURIComponent(btoa(pdId))}&pdname=${encodeURIComponent(btoa(pdId))}`);
  };


  // const handleIncrement = (event) => {
  //   event.stopPropagation();
  //   setQuantity((prevQuantity) => {
  //     const newQuantity = prevQuantity + 1;
  //     if (newQuantity > 1) {
  //       setTotalPrice((prevPrice) => prevPrice + product.Price);
  //     }
  //     return newQuantity;
  //   });


  //   const existingProduct = cartItems.find((item) => item.id === product?.Productid ? product.Productid : product?.Id);

  //   if (existingProduct) {
  //     // If the product exists, update the item count
  //     setCartItems((prevItems) =>
  //       prevItems.map((item) =>
  //         item.id === product.id
  //           ? { ...item, item: item.item + 1 } // Increment the 'item' count
  //           : item
  //       )
  //     );
  //   } else {
  //     // If it doesn't exist, add it to the cart with an initial 'item' count of 1
  //     setCartItems([...cartItems, { ...product, item: 1 }]);
  //   }

  // };


  // const handleDecrement = (event) => {
  //   event.stopPropagation();
  //   setQuantity((prevQuantity) => {
  //     if (prevQuantity > 1) {
  //       setTotalPrice((prevPrice) => prevPrice - product.Price);
  //     }
  //     return prevQuantity > 0 ? prevQuantity - 1 : 0;
  //   });
  // };


  const handleIncrement = (event) => {
    event.stopPropagation();
    let cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'));
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setCartItems((prevCartItems) => {
        const existingProductIndex = prevCartItems.findIndex(
          (item) => item.Id === product?.Id
        );

        let updatedCartItems;

        if (existingProductIndex >= 0) {
          updatedCartItems = prevCartItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, item: item.item + 1, totalMRP: product.MRP * (item.item + 1), totalPrice: product.Price * (item.item + 1) }
              : item
          );
        } else {
          updatedCartItems = [...prevCartItems, { ...product, item: 1, totalMRP: product.MRP, totalPrice: product.Price }];
        }

        if (newQuantity > 1) {
          setTotalPrice((prevPrice) => prevPrice + product.Price);
        }
        
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
      return newQuantity;
    });
  };

  const handleDecrement = (event) => {
    event.stopPropagation();  
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.Id === product?.Id
      );
  
      let updatedCartItems = [];
  
      if (existingProductIndex >= 0) {
        const updatedQuantity = prevCartItems[existingProductIndex].item - 1;
  
        if (updatedQuantity > 0) {
          updatedCartItems = prevCartItems.map((item, index) =>
            index === existingProductIndex
              ? {
                  ...item,
                  item: updatedQuantity,
                  totalMRP: product.MRP * updatedQuantity,
                  totalPrice: product.Price * updatedQuantity,
                }
              : item
          );
        } else {
          updatedCartItems = prevCartItems.filter(
            (item, index) => index !== existingProductIndex
          );
        }
      } else {
        updatedCartItems = prevCartItems; 
      }  
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));  
      return updatedCartItems;
    });
  
      setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        setTotalPrice((prevPrice) => prevPrice - product.Price);
      }
      return prevQuantity > 0 ? prevQuantity - 1 : 0;
    });
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
  }

  return (
    <>    
    <Card
      id={product?.Productid ? product.Productid : product?.Id}
      name={product.Description}
      value={product?.Productid ? product.Productid : product?.Id}
      onClick={handleProductClick}
      sx={{
        width: { xs: offerProducts === null && relatedProducts === null ? 155 : 190, sm: 220, md: 260, lg: 280 },
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
              color: product.isFavorite !== 0 ? '#3BB77E' : '#FFF',
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
                '&:hover': {
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
                id={product?.Productid ? product.Productid : product?.Id}
                name={product.Description}
                value={product?.Productid ? product.Productid : product?.Id}
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
                  '&:hover': {
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
    </>    
  );
};

export default ProductCard;
