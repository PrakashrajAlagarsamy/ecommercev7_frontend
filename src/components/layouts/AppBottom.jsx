import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Paper from '@mui/material/Paper';
import AppCart from '../cart/AppCart';

export default function AppBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const ref = React.useRef(null);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

    const handleAuthDrawerToggle = (event) => {
        setCartDrawerOpen((prev) => !prev);

        if(event === false){
            handleNavigation(1);
        }
      };
    

    const handleNavigation = (newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/myaccount?page=Favorites');
                break;
            case 2:
                navigate('/categories');
                break;
            case 3:
                return handleAuthDrawerToggle();
            case 4:
                navigate('/myaccount?page=Orders');
                break;
            default:
                break;
        }
    };

    return (
        <>
        <AppCart CartDrawerOpen={cartDrawerOpen} handleAuthDrawerToggle={handleAuthDrawerToggle}/>
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => handleNavigation(newValue)}
                >
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Categories" icon={<CategoryIcon />} />
                    <BottomNavigationAction label="Cart" icon={<ShoppingBagIcon />} />
                    <BottomNavigationAction label="Account" icon={<ManageAccountsIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
        </>
    );
}
