import React from 'react';
import { Container, Grid, Box, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AppLogo from '../logo/AppLogo';

const AppFooter = () => {
    return (
        <>        
        <Box component="footer" sx={{ background: "#222", py: 4 }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Logo and Address Section */}
                    <Grid item xs={12} sm={4}>
                        <AppLogo />
                        <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                            No.1/181,1st Floor Elumalai Salai<br />
                            Nanmangalam, Chennai – 600 129<br />
                            Landmark: Near Nanmangalam Panchayat<br />
                        </p>
                    </Grid>

                    {/* Links Section */}
                    <Grid item xs={12} sm={4}>
                        <p className="text-white text-base sm:text-lg lg:text-xl font-semibold">
                            Quick Links
                        </p>
                        <Grid container spacing={1}>
                            {['FAQ', 'News room', 'Blog', "Didn't find your product?", 'Terms and Conditions', 'Privacy Policy', 'Refund Policy', 'Sellers', 'Contact Us'].map((link, index) => (
                                <Grid item xs={6} key={index}>
                                    <Link href="#" className="text-gray-400 text-sm sm:text-base lg:text-lg hover:text-white">
                                        {link}
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Contact Information Section */}
                    <Grid item xs={12} sm={4}>
                        <p className="text-white text-base sm:text-lg lg:text-xl font-semibold">
                            Contact Us
                        </p>
                        <p className="text-primary text-sm sm:text-base lg:text-lg">
                            1111-33-4444 <br />
                            customercare@healthystpes.com
                        </p>
                        <Box sx={{ mt: 2 }}>
                            <IconButton href="#" className="text-primary">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton href="#" className="text-primary">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton href="#" className="text-primary">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton href="#" className="text-primary">
                                <YouTubeIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        </>
    );
};

export default AppFooter;
