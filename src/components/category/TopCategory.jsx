/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/material';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { API_FetchCategory } from '../../services/categoryServices';

const TopCategory = (props) => {
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryLists, setCategoryLists] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClickChange = (event, newValue) => {
    const selectedCategoryId = event.currentTarget.id; 
    setCategoryValue(newValue); 
    navigate(`/product-list?pcid=${btoa(selectedCategoryId)}&pcname=${btoa(newValue)}`);
  };

  const FetchTopCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory();
      setCategoryLists(categoryList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchTopCategoryLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.get_catgory_lists && props.get_catgory_lists.length > 0) {
      //setCategoryLists(props.get_catgory_lists); // Set categories from Redux store
      setIsLoading(false); // Data is loaded, stop the loading state
    }

    const params = new URLSearchParams(location.search);
    const pcid = params.get('pcid');
    const pcname = params.get('pcname');
    if (pcid && pcname) {
      const decodedPcid = atob(pcid);
      const decodedPcname = atob(pcname);
      setCategoryValue(decodedPcname);      
    }
  }, [props.get_catgory_lists]);

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: 'background.paper' }}>
      <Container
        maxWidth={{ xs: false, sm: 'xl' }}
        disableGutters={{ xs: true, sm: false }}
        sx={{ pb: 2 }}
      >
        <Tabs
          value={categoryValue}
          onChange={handleCategoryClickChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#3BB77E', // Set the indicator color for the active tab
            },
          }}
        >
          {/* Show Skeleton loaders */}
          {isLoading ? (
            [...Array(18)].map((_, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={55} height={55} />
                    <Skeleton variant="text" width={70} height={20} sx={{ mt: 0.5 }} />
                  </Box>
                }
              />
            ))
          ) : (
            // Category list from Redux store
            categoryLists.map((item, index) => (
              <Tab
                sx={{
                  cursor: "pointer",
                  '&.Mui-selected': {
                    color: '#3BB77E', // Set the text color for the active tab
                    backgroundColor: '#3bb77e1c',
                    borderColor: '#3BB77E'
                  },
                }}
                key={index}
                id={item.Id}
                value={item.Category}
                label={
                  <Box id={item.Id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={ImagePathRoutes.CategoryImagePath + item.ImagePath}
                      sx={{ width: 55, height: 55, mb: 0.5, boxShadow: '0px 0px 40px 20px #3bb77e1c' }}
                      alt={item.Category}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        color: 'inherit', // inherit color from parent (Tab)
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}
                    >
                      {item.Category}
                    </Typography>
                  </Box>
                }
              />
            ))
          )}
        </Tabs>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    get_catgory_lists: state.get_catgory_lists, // Get category lists from Redux state
  };
};

export default connect(mapStateToProps, null)(TopCategory);
