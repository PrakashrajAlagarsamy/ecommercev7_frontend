import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ServerURL } from '../server/serverUrl';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import { API_FetchProductById } from '../services/productListServices';
import RelatedProducts from '../components/slider/relatedProducts';

const ProductDetails = () => {
    const [productId, setProductId] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [productDetails, setProductDetails] = useState({});
    const [imageLists, setImageLists] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();   

    const handleIncrement = (event) => {
        event.stopPropagation();
        setQuantity((prevQuantity) => {
          const newQuantity = prevQuantity + 1;
          if (newQuantity > 1) {
            setTotalPrice((prevPrice) => prevPrice + productDetails.Price);
          }
          return newQuantity;
        });
      };
    
      const handleDecrement = (event) => {
        event.stopPropagation();
        setQuantity((prevQuantity) => {
          if (prevQuantity > 1) {
            setTotalPrice((prevPrice) => prevPrice - productDetails.Price);
          }
          return prevQuantity > 0 ? prevQuantity - 1 : 0;
        });
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
                // Handle the case when no product details are fetched
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

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        beforeChange: (current, next) => setActiveIndex(next),
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box sx={{ mb: 3 }}>
                            {imageLists.length > 0 && (
                                // <img src={imageLists[activeIndex]} alt="Active Product" style={{ width: '100%', height: 'auto' }} />
                                <img src={"https://www.healthysteps.in/assets/img/category/no-image.png"} alt="Active Product" style={{ width: '450px', height: '420px' }} />
                            )}
                        </Box>
                        {imageLists.length > 0 && (
                            <Slider {...settings}>
                                {imageLists.map((image, index) => (
                                    // <img key={index} src={ImagePathRoutes.ProductDetailsImagePath + image} alt={`Product ${index + 1}`} />
                                    <img key={index} src={"https://www.healthysteps.in/assets/img/category/no-image.png"} alt={`Product ${index + 1}`} style={{ width: '150px !important', height: '150px !important' }} />
                                ))}
                            </Slider>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography component={"h4"} sx={{ fontSize: 18, fontWeight: 600, fontFamily: "inherit", textAlign: "left", }}>
                                {productDetails.Description || "Description not available"}
                            </Typography>
                            {Math.round(productDetails.Offer) > 0 && (
                                <Box sx={{
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
                                }}>
                                    {Math.round(productDetails.Offer)}% OFF
                                </Box>
                            )}
                            <Box sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                color: productDetails.isFavorite ? '#3BB77E' : '#FFF',
                            }}>
                                {productDetails.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon size="small" sx={{ color: '#ee4372', fontSize: '18px' }} />}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#253D4E', fontSize: '14px', lineHeight: '24px', fontFamily: 'inherit' }}>
                                    {productDetails.MultiplePriceEnable === 0 ? productDetails.UnitType : <>Multiple price</>}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#253D4E', fontSize: '16px', lineHeight: '24px', fontFamily: 'inherit', textAlign: 'left' }}>
                                {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                            {productDetails.MRP && (
                                <Typography variant="body2" sx={{ textDecoration: 'line-through', fontSize: '16px', fontWeight: 200, color: '#a3a4ae', fontFamily: 'inherit', textAlign: 'left' }}>
                                    {'MRP:' + productDetails.MRP.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                            )}
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "auto",
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
                            {productDetails.InStock > 0 ?
                                <Button
                                    variant="outlined"
                                    sx={{
                                        display: quantity === 0 ? 'block' : 'none',
                                        marginTop: '10px',
                                        width: "auto",
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
