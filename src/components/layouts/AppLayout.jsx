import React from 'react';
import AppHeader from './AppHeader';
import TopCategory from '../category/TopCategory';
import AppFooter from './AppFooter';
import FooterCategories from '../category/FooterCategory';
import { Container, Box } from '@mui/material';

const AppLayout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Container maxWidth="xl">
          <TopCategory/>
      </Container>
      {children}
      <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', display: 'none' }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Container maxWidth="xl">
            <FooterCategories />
          </Container>
        </Container>
      </Box>
      <AppFooter />
    </>
  );
};

export default AppLayout;
