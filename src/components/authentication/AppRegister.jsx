import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { TextField, Button, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppLogo from '../logo/AppLogo';
import AppLogin from './AppLogin'; 

//API's
import { checkExistingUser, registerUser } from '../../services/userServices';

export default function AppRegister({ RegisterDrawerOpen, handleAuthDrawerToggle }) {
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Form state
  let [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',    
  }); 

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [objList, setObjList] = useState({
    Id: 0,
    CompanyRefId: 41,
    CustomerName: formData.fullname,
    MobileNo: formData.mobileNumber,
    Password: formData.password,
    Email: formData.email,
    ReferMobileNo: "",
    TokenId: "",
    Address1: "",
    Address2: "",
    City: "",
    Landmark: "",
    FlatNo: "",
    PhoneNo: "",
    Pincode: 0,
    AreaMasterRefId: null,
    Active: 1,
    firstorder: 1,
    OrderCount: 1
  });

  useEffect(() => {
    setObjList((prevState) => ({
      ...prevState,
      CustomerName: formData.fullname,
      MobileNo: formData.mobileNumber,
      Password: formData.password,
      Email: formData.email,
    }));
  }, [formData]);
  

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Validation logic
  const validate = () => {
    let tempErrors = {};

    if (!formData.fullname) tempErrors.fullname = "Full name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!formData.mobileNumber) {
      tempErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = "Mobile number must be 10 digits";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length > 6) tempErrors.password = "Password must be at most 6 characters";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  // Check if email or mobile number already exists
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const existingUser = await checkExistingUser(formData.email, formData.mobileNumber); 
      if (existingUser.length !== 0) {
        if (existingUser.length !== 0) setErrors((prevErrors) => ({ ...prevErrors, email: "Email or Mobile numbers is already in use" }));
        return;
      }
      
      const response = await registerUser(objList);
      if (response) {
        alert("Account created successfully!");
        handleAuthDrawerToggle(false); // Close register drawer
        setLoginDrawerOpen(true); // Open login drawer
      } else {
        alert("Failed to create account.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the account.");
    }
  };

  return (
    <>
      <Drawer
        open={RegisterDrawerOpen}
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
                Create an Account
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  error={!!errors.fullname}
                  helperText={errors.fullname}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  className="mb-4"
                  required
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  className="mb-4"
                  required
                />

                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  margin="normal"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  className="mb-4"
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
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

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputLabelProps={{ shrink: true }}
                  className="mb-6"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  className="bg-green-700 hover:bg-green-800 text-white"
                  sx={{ my: 3 }}
                  type="submit"
                >
                  Create Account
                </Button>
              </form>

              <Typography variant="body2" align="left" className="mt-10">
                Already have an account?{' '}
                <Link
                  href="#"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    handleAuthDrawerToggle(false); 
                    setLoginDrawerOpen(true); 
                  }}
                >
                  Login
                </Link>
              </Typography>
            </div>
          </div>
        </Box>
      </Drawer>

      {/* Login Drawer Component */}
      <AppLogin
        LoginDrawerOpen={loginDrawerOpen}
        handleLoginDrawerToggle={setLoginDrawerOpen}
      />
    </>
  );
}


