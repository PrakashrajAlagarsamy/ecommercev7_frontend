import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Container, Skeleton, Grid } from '@mui/material';
import ProductCard from '../ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryHeader from '../category/categoryHeader';
import { API_SelectOfferFastMovingProduct } from '../../services/offerFasMovingProducts';

const OfferFastMovingProduct = () => {
  const [productLists, setProductLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetOfferProductLists = async () => {
      try {
          const objLists = await API_SelectOfferFastMovingProduct();
          setProductLists(objLists);
      } catch (error) {
          console.error("Error fetching categories:", error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    GetOfferProductLists();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container maxWidth="xl" sx={{pt: 5, pb: 3}}>
      <Box sx={{ margin: 'auto' }}>
        {loading ? (
          <Skeleton variant="text" height={40} width="30%" />
        ) : (
          <CategoryHeader CategoryHeading={"Top offer products"} categoryId={"offer_product"} categoryValue={"offer_product"} />
        )}

        <Slider {...settings}>
          {loading ? (
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
            productLists.map((product) => (
              <Box key={product.id} sx={{ padding: 2 }}>
                <ProductCard product={product} />
              </Box>
            ))
          )}
        </Slider>
      </Box>
    </Container>
  );
};

export default OfferFastMovingProduct;
