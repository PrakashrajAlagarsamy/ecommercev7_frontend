import React, { useState } from 'react';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import { ServerURL } from '../server/serverUrl';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';

const FavProductCard = ({ FavProductLists, handleRemoveFavProduct }) => {
    // State to track quantities for each product by their ID
    const [quantities, setQuantities] = useState({});

    const handleIncrement = (event, list) => {
        event.stopPropagation();
        const newQuantity = (quantities[list.Id] || 0) + 1;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [list.Id]: newQuantity,
        }));
    };

    const handleDecrement = (event, list) => {
        event.stopPropagation();
        const currentQuantity = quantities[list.Id] || 0;
        const newQuantity = currentQuantity > 0 ? currentQuantity - 1 : 0;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [list.Id]: newQuantity,
        }));
    };    

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            {FavProductLists.map((list) => {
                const quantity = quantities[list.Id] || 0;
                return (
                    <Card
                        key={list.Id}
                        sx={{
                            width: '48%',
                            display: 'flex',
                            padding: '12px',
                            borderRadius: '5px',
                            boxShadow: '0px 1px 3px rgba(0,0,0,0.16)',
                            marginBottom: '16px'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                            {/* Product name */}
                            <Typography
                                align="left"
                                variant="body1"
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
                                {list.Description}
                            </Typography>

                            {/* Price, MRP, and Discount */}
                            <Box sx={{ py: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '30px' }}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#253D4E', fontSize: '16px', lineHeight: '30px', fontFamily: 'inherit', textAlign: 'left' }}
                                >
                                    {list.Price.toLocaleString('en-IN', {
                                        style: 'currency',
                                        currency: ServerURL.CURRENCY,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </Typography>
                                {list.MRP && (
                                    <Typography
                                        variant="body2"
                                        sx={{ textDecoration: 'line-through', fontSize: '14px', fontWeight: 200, color: '#a3a4ae', fontFamily: 'inherit', textAlign: 'left' }}
                                    >
                                        {'MRP: ' + list.MRP.toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: ServerURL.CURRENCY,
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </Typography>
                                )}
                            </Box>

                            {/* Weight */}
                            <Typography align="left" variant="body2" sx={{ fontSize: 14, color: '#253D4E' }}>
                                {list.UnitType}
                            </Typography>

                            {/* Cart Button */}
                            <Button
                                variant="outlined"
                                sx={{
                                    width: '70%',
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
                                    onClick={(e) => { handleDecrement(e, list); }}
                                    sx={{
                                        width: '25%',
                                        color: '#FFF',
                                        background: '#3BB77E',
                                        fontFamily: 'inherit'
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
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    {quantity}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    onClick={(e) => { handleIncrement(e, list); }}
                                    sx={{
                                        width: '25%',
                                        color: '#FFF',
                                        background: '#3BB77E',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    +
                                </Typography>
                            </Button>

                            {list.InStock !== 0 ? (
                                <Button
                                    variant="outlined"
                                    sx={{
                                        display: quantity === 0 ? 'block' : 'none',
                                        marginTop: '10px',
                                        width: '70%',
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
                                    onClick={(e) => { handleIncrement(e, list); }}
                                >
                                    Add to Cart
                                </Button>
                            ) : (
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
                            )}
                        </Box>

                        {/* Product Image and Remove Button */}
                        <Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 100, height: 100 }}
                                image={ImagePathRoutes.ProductImagePath + list.Img0}
                                alt={list.Description}
                            />
                            <Box>
                                <Button
                                    variant="outlined"
                                    id={list.Id}
                                    onClick={() => handleRemoveFavProduct(list.Id)}
                                    sx={{
                                        marginTop: '10px',
                                        width: '10%',
                                        p: '0px',
                                        textTransform: 'none',
                                        fontFamily: 'inherit',
                                        border: '1px solid #dc3545',
                                        color: '#dc3545',
                                        '&:hover': {
                                            background: '#FFF',
                                            border: '1px solid #dc3545',
                                            color: '#dc3545'
                                        }
                                    }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                );
            })}
        </Box>
    );
};

export default FavProductCard;
