import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Grid, IconButton, InputAdornment, TextField, Button, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from '@mui/icons-material/Menu';
import AppLogo from '../logo/AppLogo';
import AppRegister from '../authentication/AppRegister';
import AppLogin from '../authentication/AppLogin';
import AppForgetPassword from '../authentication/AppForgetPassword';
import { useAuth } from '../../context/authContext';

const drawerContent = (
  <List>
    <ListItem button>
      <AppLogo />
    </ListItem>
    <ListItem button>
      <ListItemText primary="About us" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Privacy policy" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Terms & conditions" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Refund & cancellation" />
    </ListItem>
  </List>
);

export default function AppHeader() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [registerDrawerOpen, setRegisterDrawerOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [forgetPasswordDrawerOpen, setForgetPasswordDrawerOpen] = useState(false);
  
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Authentication right sidebar
  const handleAuthDrawerToggle = (event) => {
    if(event === false){
      if(registerDrawerOpen === true){
        setRegisterDrawerOpen((prev) => !prev);
      }
      else if(loginDrawerOpen === true){
        setLoginDrawerOpen((prev) => !prev);
      }
      else{
        setForgetPasswordDrawerOpen((prev) => !prev);
      }
    }
    else{
      const id = event.currentTarget.id;
      if(id === "register_btn"){
        setRegisterDrawerOpen((prev) => !prev);
      }
      else if(id === "login_btn"){
        setLoginDrawerOpen((prev) => !prev);
      }
      else{
        setForgetPasswordDrawerOpen((prev) => !prev);
      }    
    }
  };

  // Handle scroll event to animate header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>      
      <AppBar
        position={isScrolled ? 'fixed' : 'relative'} 
        color="transparent"
        elevation={isScrolled ? 7 : 0}
        sx={{
          borderBottom: isScrolled ? 'none' : '1px solid #ddd',
          backgroundColor: isScrolled ? '#FFF' : '#FFF',
          transition: 'all 1s ease',
          zIndex: 10,
          top: 0, 
          '@media (max-width: 600px)': {
            position: 'relative', // Change position to relative on mobile
            width: '100%',
          },
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">

            {/* Logo Section */}
            <Grid item xs={6} sm={3} md={2}>
             <Link to={"/"}> <AppLogo /></Link>
            </Grid>

            {/* Hamburger Menu for Mobile */}
            <Grid item xs={6} sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ width: '30px', height: '30px' }} />
              </IconButton>
            </Grid>

            {/* Search Bar Section */}
            <Grid
              item
              xs={12} sm={6} md={5}
              sx={{
                display: { sm: 'inline-block' },
                alignItems: 'center',
                mt: { xs: 1, sm: 0 },
                position: 'relative', // Remove fixed positioning for mobile
                width: '100%',
                zIndex: 9,
              }}
            >
              <TextField
                placeholder='Search for "your products"'
                fullWidth
                variant="outlined"
                sx={{ padding: 0 }}
                autoComplete={"off"}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Navigation and User Action Section */}
            <Grid item xs={6} sm={3} md={5} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', gap: '30px' }}>
              <Button sx={{ color: '#333', textTransform: 'none', display: { xs: 'none', md: 'block' } }}>
                <Typography component={"p"}>WhatsApp Only</Typography>
              </Button>
              <Button sx={{ color: '#333', textTransform: 'none', display: { xs: 'none', md: 'block' } }}><Link to={"/categories"}>Home</Link></Button>
              {!isAuthenticated && (
                <>
                  <Button
                    id={"register_btn"}
                    sx={{ color: '#333', textTransform: 'none' }}
                    onClick={handleAuthDrawerToggle}
                  >
                    Register
                  </Button>

                  <Button
                    id={"login_btn"}
                    sx={{ color: '#333', textTransform: 'none' }}
                    onClick={handleAuthDrawerToggle}
                  >
                    Sign In
                    <PersonIcon sx={{ ml: 1 }} />
                  </Button>
                </>
              )}

              {isAuthenticated && (
                <Button
                  id={"profile_btn"}
                  sx={{ color: '#333', textTransform: 'none' }}
                >
                  <PersonIcon sx={{ ml: 1 }} />
                  Profile
                </Button>
              )}

              <IconButton color="inherit">
                <ShoppingBagIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>

        {/* Drawer for Mobile Navigation */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
        <AppRegister RegisterDrawerOpen={registerDrawerOpen} handleAuthDrawerToggle={handleAuthDrawerToggle} />
        <AppLogin LoginDrawerOpen={loginDrawerOpen} handleAuthDrawerToggle={handleAuthDrawerToggle} />
        <AppForgetPassword ForgetPasswordDrawerOpen={forgetPasswordDrawerOpen} handleAuthDrawerToggle={handleAuthDrawerToggle} />
      </AppBar>
    </>
  );
}
