import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import MyAccountSidebar from '../components/myAccount/MyAccountSidebar';
import Orders from '../components/myAccount/Orders';
import CustomerSupport from '../components/myAccount/CustomerSupport';
import Profile from '../components/myAccount/Profile';
import Wallet from '../components/myAccount/Wallet';
import Addresses from '../components/myAccount/Addresses';
import { API_FetchCustomerAddress } from '../services/userServices';

const MyAccount = () => {
    const [activeComponent, setActiveComponent] = useState('Orders');
    const [customerDetails, setCustomerDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const FetchCustomerAddress = async (userId) => {
        try {
            const address = await API_FetchCustomerAddress(userId);
            console.log("Fetched address:", address); // Debugging log
            setCustomerDetails(address);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching customer address:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const CId = userId ? decodeURIComponent(userId) : null;
        if (CId) {
            FetchCustomerAddress(atob(CId));
        }
    }, []);

    useEffect(() => {
        navigate(`/myaccount?${activeComponent}`);
    }, [activeComponent, navigate]);

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'Orders':
                return <Orders />;
            case 'CustomerSupport':
                return <CustomerSupport />;
            case 'Profile':
                return <Profile />;
            case 'Wallet':
                return <Wallet />;
            case 'Addresses':
                return <Addresses />;
            default:
                return <Orders />;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box>
                <Grid container>
                    <Grid item xs={4}>
                        <MyAccountSidebar
                            CustomerDetails={customerDetails}
                            setActiveComponent={setActiveComponent}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        {renderActiveComponent()}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default MyAccount;
