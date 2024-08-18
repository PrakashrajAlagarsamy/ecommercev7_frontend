import React, {useEffect} from 'react';
import AppHeader from './AppHeader';
import TopCategory from '../category/TopCategory';
import AppFooter from './AppFooter';
import FooterCategories from '../category/FooterCategory';
import { Container, Box } from '@mui/material';
import { API_FetchSettings } from '../../services/settings';

const AppLayout = ({ children }) => {
  let [settingsLists, setSettingsLists] = React.useState([]);

  const FetchSettingsLists = async () => {
    try {
        settingsLists = await API_FetchSettings();
        let colorSelect = settingsLists.data[0];
        console.log(colorSelect);
        const root = document.documentElement;

        // Set the value of --primary-color to the value received from the API
        root.style.setProperty("--primary-color", colorSelect.basecolorCode);
        root.style.setProperty("--secondary-background", colorSelect.shadowcolorCode);
        root.style.setProperty("--color-black", colorSelect.lightblackcolorCode);
        root.style.setProperty("--color-grey-dark-3", colorSelect.whitecolorCode);
        root.style.setProperty("--secondary-color", colorSelect.colorCode);
        setSettingsLists(settingsLists.data[0]);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

useEffect(() => {
  FetchSettingsLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

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
