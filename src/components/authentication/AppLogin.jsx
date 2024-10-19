/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { TextField, Button, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppLogo from '../logo/AppLogo';
import {useAuth} from '../../context/authContext';
import { useTheme } from '@mui/material/styles';
import AppRegister from './AppRegister';
//API
import { loginUser } from '../../services/userServices';

export default function AppLogin({ LoginDrawerOpen, setRegisterDrawerOpen, handleAuthDrawerToggle }) {
  const theme = useTheme();
  const { setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Form state
  const [loginData, setLoginData] = useState({
    MobileNumber: '',
    Password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setErrorMsg(false);
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle Password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Validation logic for login
  const validate = () => {
    let tempErrors = {};
    if (!loginData.MobileNumber) {
      tempErrors.MobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(loginData.MobileNumber)) {
      tempErrors.MobileNumber = "Mobile number must be 10 digits";
    }
    if (!loginData.Password) {
      tempErrors.Password = "Password is required";
    } 
    // else if (loginData.Password.length >= 3) {
    //   tempErrors.Password = "Password must be at most 6 characters";
    // }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await loginUser(loginData.MobileNumber, loginData.Password);
      if (response[0].Id !== 0 && response !== "Not found") {
        localStorage.setItem("userLogin", 'true');
        localStorage.setItem("userId", btoa(response[0].Id));
        localStorage.setItem("userName", btoa(response[0].CustomerName));
        setIsAuthenticated(true);
        setErrorMsg(false);
        handleAuthDrawerToggle(false); 
      } else {
        setErrorMsg(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg(true);
    }
  };

  return (
    <>
    <Drawer
      open={LoginDrawerOpen}
      anchor="right"
      onClose={() => handleAuthDrawerToggle(false)}
    >
      <Box sx={{
        width: 400,
        padding: 2,
      }}>
        <AppLogo />
        <div className="flex justify-center items-center">
          <div className="w-96 p-3 rounded-md bg-white">
            <Typography variant="h5" align="center" sx={{ my: 2 }}>
              Login to Your Account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                margin="normal"
                name="MobileNumber"
                value={loginData.MobileNumber}
                onChange={handleChange}
                error={!!errors.MobileNumber}
                helperText={errors.MobileNumber}
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                className="mb-4"
                required
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'Password'}
                variant="outlined"
                margin="normal"
                name="Password"
                value={loginData.Password}
                onChange={handleChange}
                error={!!errors.Password}
                helperText={errors.Password}
                InputLabelProps={{ shrink: true }}
                className="mb-6"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {ErrorMsg && (
                <><Typography color="error" align="center">Invalid mobile number or Password.</Typography></>
              )}
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ my: 3, background: theme.palette.basecolorCode.main,color: theme.palette.whitecolorCode.main }}
                type="submit"
              >
                Login
              </Button>
            </form>

            <Typography variant="body2" align="left" className="mt-10">
              Don't have an account?{' '}
              <Link
                href="#"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  handleAuthDrawerToggle(false); 
                  setRegisterDrawerOpen(true); 
                }}
              >
                Register
              </Link>
            </Typography>
          </div>
        </div>
      </Box>
    </Drawer>
    {/* <AppRegister
    registerDrawerOpen={true}
    handleLoginDrawerToggle={false}
  /> */}
    </>
  );
}
