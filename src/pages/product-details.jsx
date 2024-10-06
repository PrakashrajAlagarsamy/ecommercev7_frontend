/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Grid, Typography, Button, CircularProgress, Backdrop } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ServerURL } from '../server/serverUrl';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import { API_FetchProductById } from '../services/productListServices';
import RelatedProducts from '../components/slider/relatedProducts';
import BreadCrumbs from '../components/BreadCrumbs';
import { useCart } from '../context/CartContext';
import { useTheme } from '@mui/material/styles';

const ProductDetails = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [productId, setProductId] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productDetails, setProductDetails] = useState({});
    const [imageLists, setImageLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);    
    const { cartItems, setCartItems } = useCart();
    const [productValue, setProductValue] = useState(0);
    let [isFavoriteProduct, setIsFavoriteProduct] = useState(0);
  
    const [productWeight, setProductWeight] = useState(''); 
    const [selectedPrice, setSelectedPrice] = useState(0); 
    const [selectedMRP, setSelectedMRP] = useState(0);
  
    
  

  const handleProductWeightChange = (event, ProductWeightLists) => {
    event.stopPropagation();
    
    const selectedWeightId = event.target.value; // Get the selected weight Id or value
    const selectedWeight = ProductWeightLists.find(item => item.WeightType === selectedWeightId); // Find the corresponding weight object
    if (selectedWeight) {
      setProductWeight(selectedWeight.WeightType); // Set the selected weight
      setTotalPrice(selectedWeight.SaleRate); // Update the price for the selected weight
      setSelectedMRP(selectedWeight.MRP); // Update the MRP for the selected weight
      
      // Update total price based on selected weight price and quantity
      const newTotalPrice = quantity * selectedWeight.SaleRate;
      updateCartItems(quantity, newTotalPrice, selectedWeight.MRP);
    }
  };
  

  useEffect(() => {    
    const existingProduct = cartItems.find(item => item.Id === productDetails?.Id);
    if (existingProduct) {
      setQuantity(existingProduct.item);
      setTotalPrice(existingProduct.totalPrice);
    } else {
      setQuantity(0);
      setTotalPrice(productDetails?.Price || 0);
    }
  }, [cartItems, productDetails]);
  
  // Update cartItems function
  const updateCartItems = (newQuantity, newTotalPrice, MRP) => {
    setCartItems(prevCartItems => {
      const existingProductIndex = prevCartItems.findIndex(item => item.Id === productDetails?.Id);
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
          updatedCartItems = updatedCartItems.filter(item => item.Id !== productDetails?.Id);
        }
      } else if (newQuantity > 0) {
        updatedCartItems.push({ 
          ...productDetails, 
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
    const newTotalPrice = newQuantity * productDetails.Price;
    const MRP = newQuantity * productDetails.MRP;
  
    setQuantity(newQuantity);
    setTotalPrice(newTotalPrice);
    updateCartItems(newQuantity, newTotalPrice, MRP);
  };
  
  // Quantity decrement function
  const handleDecrement = (event) => {
    event.stopPropagation();
    const newQuantity = quantity - 1;
    const newTotalPrice = newQuantity * productDetails.Price;
    const MRP = newQuantity * productDetails.MRP;
  
    if (newQuantity === 0) {
      setQuantity(0);
      setTotalPrice(productDetails.Price);
      updateCartItems(0, productDetails.Price, MRP); 
    } else if (quantity > 0) {
      setQuantity(newQuantity);
      setTotalPrice(newTotalPrice);
      updateCartItems(newQuantity, newTotalPrice, MRP);
    }
  };


    const GetProductDetails = async (productId) => {
        try {
            setLoading(true);
            setBackdropOpen(true);
            const fetchedProductDetails = await API_FetchProductById(productId);
            if (Array.isArray(fetchedProductDetails) && fetchedProductDetails.length > 0) {
                const product = fetchedProductDetails[0];
                setProductDetails(product);
                setTotalPrice(product.Price);

                // Filter and flatten the image list
                const images = [product.Img0, product.Img1, product.Img2, product.Img3, product.Img4]
                    .filter(img => img && img !== "Undefined.jpg" && img !== "Undefined.png");
                setImageLists(images);
            } else {
                setProductDetails({});
                setImageLists([]);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            setProductDetails({});
            setImageLists([]);
        } finally {
            setLoading(false);
            setBackdropOpen(false);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const encodedId = queryParams.get('pdid');
        const productId = encodedId ? decodeURIComponent(encodedId) : null;
        setProductId(atob(productId));
        if (productId) {
            GetProductDetails(atob(productId));
        }
    }, [location.search, productId]);


    // Slick Slider settings
    const settings1 = {
        customPaging: function (index) {
            return (
                <img src={ImagePathRoutes.ProductDetailsImagePath + imageLists[index]} alt={productDetails.Description || "Product name is not available" + index + 1} />
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
            <Box className="card-wrapper" sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
                <Box sx={{ display: 'block', justifyContent: 'space-between' }}>
                    {/* Card Left - Image Slider */}
                    <Box className="product-imgs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>

                    </Box>

                    {/* Card Right - Product Content */}

                </Box>
            </Box>
            <Container maxWidth="xl" sx={{ my: 3 }}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Slider {...settings1}>
                            {imageLists.map((image, index) => (
                                <img src={ImagePathRoutes.ProductDetailsImagePath + image} alt={productDetails.Description || "Product name is not available" + index + 1} />
                            ))}
                        </Slider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Box sx={{ pb: 1 }}><BreadCrumbs CategoryId={productDetails.CId} SubCateoryId={productDetails.SId} SubCategoryName={productDetails.SubCategoryName} ProductName={productDetails.Description} /></Box>
                            <Typography component={"h4"} sx={{ fontSize: 20, fontWeight: 600, fontFamily: "inherit", textAlign: "left", pb: 1.5 }}>
                                {productDetails.Description || "Product name is not available"}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '100px', pb: 1 }}>
                                {Math.round(productDetails.Offer) === 0 && (
                                    <Typography sx={{
                                        position: 'relative',
                                        left: '8px',
                                        backgroundColor: '#fff6e0',
                                        color: '#5d3e03',
                                        padding: '2px 5px',
                                        borderRadius: '3px',
                                        border: '1px solid #90784159',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        fontFamily: 'inherit',
                                        display: 'block'
                                    }}>
                                        {Math.round(productDetails.Offer)}% OFF
                                    </Typography>
                                )}
                                <Box sx={{
                                    position: 'relative',
                                    color: productDetails.isFavorite ? '#3BB77E' : '#3BB77E',
                                }}>
                                    {productDetails.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon size="small" sx={{ color: '#ee4372', fontSize: '18px' }} />}
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pb: 2 }}>
                                <Typography variant="body2" sx={{ color: '#253D4E', fontSize: '14px', lineHeight: '24px', fontFamily: 'inherit' }}>
                                    {productDetails.MultiplePriceEnable === 0 ? productDetails.UnitType : <>Multiple price</>}
                                </Typography>
                            </Box>
                            <Box sx={{pb: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '30px'}}>
                                <Typography variant="body2" sx={{ color: '#253D4E', fontSize: '16px', lineHeight: '30px', fontFamily: 'inherit', textAlign: 'left' }}>
                                    {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                                {productDetails.MRP && (
                                    <Typography variant="body2" sx={{ textDecoration: 'line-through', fontSize: '14px', fontWeight: 200, color: '#a3a4ae', fontFamily: 'inherit', textAlign: 'left' }}>
                                        {'MRP:' + productDetails.MRP.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                )}
                            </Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "20%",
                                    display: quantity !== 0 ? 'flex' : 'none',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                    border: '1px solid #3BB77E',
                                    fontFamily: 'inherit',
                                    background: '#3BB77E',
                                    color: '#FFF',
                                    padding: { xs: '6px 0px', sm: '7px 0px', md: '7.2px 0px' },
                                    '&:hover': {
                                        background: '#3BB77E',
                                        border: '1px solid #3BB77E',
                                        color: '#FFF'
                                    }
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    onClick={(e) => { handleDecrement(e); }}
                                    sx={{
                                        width: '25%',
                                        color: '#FFF',
                                        background: '#3BB77E',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    -
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        width: '50%',
                                        color: '#FFF',
                                        background: '#3BB77E',
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
                                        color: '#FFF',
                                        background: '#3BB77E',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    +
                                </Typography>
                            </Button>
                            {productDetails.InStock !== 0 ?
                                <Button
                                    variant="outlined"
                                    sx={{
                                        display: quantity === 0 ? 'block' : 'none',
                                        marginTop: '10px',
                                        width: {xs: 'auto', sm: 'auto', md: "30%", lg: "20%"},
                                        textTransform: 'none',
                                        fontFamily: 'inherit',
                                        fontWeight: 600,
                                        border: '1px solid #3BB77E',
                                        backgroundColor: '#3BB77E',
                                        color: '#FFF',
                                        '&:hover': {
                                            background: '#3BB77E',
                                            border: '1px solid #3BB77E',
                                            color: '#FFF'
                                        }
                                    }}
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
                                        color: '#fff',
                                        '&:hover': {
                                            background: '#dc3545',
                                            border: '1px solid #dc3545',
                                            color: '#fff'
                                        }
                                    }}
                                    disabled
                                >
                                    Out of Stock
                                </Button>
                            }
                        </Box>
                        <Box sx={{ pb: 4, pt: 6.5 }}>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, textAlign: 'left', pb: 1 }}>About Product</Typography>
                            <Typography component={'p'} sx={{ color: '#2b1e3580', textAlign: 'left', fontSize: 16 }}>
                                {productDetails.ProductDescription ? productDetails.ProductDescription
                                    :
                                    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
                                repellendus tenetur reiciendis magnam quae accusamus repellat debitis
                                laboriosam error labore! Aperiam praesentium nisi quidem molestiae unde
                                architecto quam adipisci ut!
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
                                repellendus tenetur reiciendis magnam quae accusamus repellat debitis
                                laboriosam error labore! Aperiam praesentium nisi quidem molestiae unde
                                architecto quam adipisci ut!`
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl">
                <Box sx={{ width: "100%", display: "inline-block" }}>
                    <RelatedProducts ProductId={productId} />
                </Box>
            </Container>
        </>
    );
};

export default ProductDetails;
