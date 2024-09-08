import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ServerURL } from '../../server/serverUrl';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { API_FetchMyOrders } from '../../services/userServices';


const OrderDeliveredSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14"><g clip-path="url(#clip0_640_2070)"><path fill="#06A976" d="M6.999 13.998A6.999 6.999 0 1 0 6.999 0a6.999 6.999 0 0 0 0 13.998Z" /><path fill="#fff" fill-rule="evenodd" d="M5.27 8.012 9.92 4.32a.73.73 0 0 1 .905 1.142l-5.28 4.191-.051.041a.732.732 0 0 1-.066.042l-.029.018a.728.728 0 0 1-.965-.285l-.082-.137-1.356-2.357a.726.726 0 0 1 1.26-.724l1.016 1.76H5.27Z" clip-rule="evenodd" /></g><defs><clipPath id="clip0_640_2070"><path fill="#fff" d="M0 0h14v14H0z" /></clipPath></defs></svg>
    )
}

const OrderCancelledSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14"><g clip-path="url(#clip0_640_2068)"><path fill="#A2AABA" d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7Zm2.59 8.61c.28.28.28.7 0 .98s-.7.28-.98 0L7 7.98 5.39 9.59c-.28.28-.7.28-.98 0a.677.677 0 0 1 0-.98L6.02 7 4.41 5.39a.677.677 0 0 1 0-.98c.28-.28.7-.28.98 0L7 6.02l1.61-1.61c.28-.28.7-.28.98 0s.28.7 0 .98L7.98 7l1.61 1.61Z" /></g><defs><clipPath id="clip0_640_2068"><path fill="#fff" d="M0 0h14v14H0z" /></clipPath></defs></svg>
    )
}

const Orders = ({ setActiveComponent }) => {
    const [customerDetails, setCustomerDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [visibleOrders, setVisibleOrders] = useState(5);
    const [orderLists, setOrderLists] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const [OrderDetailsId, setOrderDetailsId] = useState({});
    const navigate = useNavigate();

    const orders = [
        { status: 'Order delivered', icon: <OrderDeliveredSvg />, date: '25th Aug 2024, 12:08 pm', price: 107.3 },
        { status: 'Order cancelled', icon: <OrderCancelledSvg />, date: '18th Aug 2024, 10:29 am', price: 148.49 },
        { status: 'Order Delivered', icon: <OrderCancelledSvg />, date: '10th Aug 2024, 05:39 pm', price: 107.3 },
        { status: 'Order Delivered', icon: <OrderDeliveredSvg />, date: '8th Aug 2024, 08:06 pm', price: 100.97 },
        { status: 'Order cancelled', icon: <OrderCancelledSvg />, date: '8th Aug 2024, 08:06 pm', price: 1000.77 },
        { status: 'Order Delivered', icon: <OrderCancelledSvg />, date: '8th Aug 2024, 08:06 pm', price: 190.97 },
        { status: 'Order Delivered', icon: <OrderCancelledSvg />, date: '8th Aug 2024, 08:06 pm', price: 280.97 },
        { status: 'Order Delivered', icon: <OrderDeliveredSvg />, date: '8th Aug 2024, 08:06 pm', price: 300.93 },
        { status: 'Order Delivered', icon: <OrderDeliveredSvg />, date: '8th Aug 2024, 08:06 pm', price: 20.97 },
    ];

    const loadMoreOrders = () => {
        setVisibleOrders((prev) => prev + 5);
    };


    const FetchMyOrders = async (userId) => {
        try {
            const orderList = await API_FetchMyOrders(userId);
            setOrderLists(orderList);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching order lists:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const userId = 0;
        //FetchMyOrders(userId);
        //setShowComponent(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <>
            <Box sx={{ background: '#f0f4f9', maxHeight: '700px', overflowY: 'scroll', p: 2, borderRadius: 2 }}>
                    {orders.slice(0, visibleOrders).map((order, index) => (
                        <Paper onClick={() => setActiveComponent('OrderDetails')} key={index} sx={{ my: 2, boxShadow: '0 0 #0000, 0 0 #0000, 0px 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.1)', borderRadius: '1rem', cursor: 'pointer' }}>
                            <Box sx={{ p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <img src={"https://www.healthysteps.in/productimages/48b699ca-b8bc-4ac1-8f86-5370ae8e3634.png"}
                                        style={{ width: '50px', height: '50px', borderRadius: '.5rem', objectFit: 'contain' }} />
                                </Box>
                                <Box><Typography sx={{ textAlign: 'left', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>View<KeyboardArrowRightIcon size="small" sx={{ width: '18px', height: '18px', fontWeight: 600 }} /></Typography></Box>
                            </Box>
                            <Box sx={{ mb: 2, p: 2, pt: 0, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Typography variant="subtitle1" sx={{ textAlign: 'left', fontSize: 16, fontWeight: 600, }}>{order.status}</Typography>
                                        <Box sx={{ ml: 1 }}>{order.icon}</Box>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', fontSize: 12, fontWeight: 500, }}>
                                        Placed at {order.date}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ textAlign: 'left', fontSize: 16, fontWeight: 500, }}>
                                    {order.price.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                    {visibleOrders < orders.length && (
                        <Button variant="contained" onClick={loadMoreOrders} sx={{ mt: 2 }}>
                            Load More Orders
                        </Button>
                    )}
                </Box>
        </>
    );
};

export default Orders;
