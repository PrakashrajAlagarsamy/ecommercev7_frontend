/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Backdrop
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProductCard from '../components/ProductCard';
import {API_FetchOfferFastMovingProduct} from '../services/offerFasMovingProducts';
import { API_FetchProductByCategory, API_FetchProductBySubCategory } from '../services/productListServices';
import { API_FetchCategorySubCategory } from '../services/categoryServices';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';

const drawerWidth = 240;

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [subcategories, setSubcategories] = useState([]);
  const [productLists, setProductLists] = useState([]);
  const [filteredProductLists, setFilteredProductLists] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(false); // Initially set to false
  const [backdropOpen, setBackdropOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [offerProducts, setOfferProducts] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [Multipleitems, setMultipleitems] = useState(1);
  const [Startindex, setStartindex] = useState(0);
  const [PageCount, setPageCount] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productFilterName, setProductFilterName] = useState('All products');

  const handleCategoryClick = (subCategoryName, SubCategoryId) => {
    navigate(`/product-list?pcid=${btoa(atob(categoryId))}&pcname=${btoa(atob(categoryName))}&pscid=${btoa(SubCategoryId)}&pscname=${subCategoryName}`);
    setActiveCategory(subCategoryName);
    setProductLists([]);
    if (subCategoryName === "All Products") {
      GetProductLists(atob(categoryId), Multipleitems, Startindex, PageCount); 
    } else {
      GetProductListsBySubCategory(SubCategoryId, Multipleitems, Startindex, PageCount); 
    }
  };

  const GetCategoryBySubCategory = async (categoryId) => {
    try {
      setLoading(true);
      setBackdropOpen(true); 

      const subcategories = await API_FetchCategorySubCategory(categoryId);
      setLoading(false);
      setBackdropOpen(false); 

      const allProductsCategory = { SubCategory: 'All Products' };
      setSubcategories([allProductsCategory, ...subcategories]);
      return subcategories;
    } catch (error) {
      console.error("Error fetching subcategory:", error);
      setLoading(false);
      setBackdropOpen(false); 
      return [];
    }
  };

  const GetProductLists = async (categoryId, Multipleitems, Startindex, PageCount) => {
    try {
      setLoading(true);
      setBackdropOpen(true);
      setProductLists([]);
      let productLists = [];
      if(categoryId === "offer_product"){
        setOfferProducts(categoryId);
        setActiveCategory("Offer products for you");
        productLists = await API_FetchOfferFastMovingProduct();
      }
      else{
        setOfferProducts(null);
        productLists = await API_FetchProductByCategory(categoryId, Multipleitems, Startindex, PageCount);
      }
      setProductLists(productLists);
      setLoading(false);
      setBackdropOpen(false); 
    } catch (error) {
      console.error("Error fetching products by category:", error);
      setLoading(false);
      setBackdropOpen(false); 
      setProductLists([]);
    }
  };

  const GetProductListsBySubCategory = async (SubCategoryId, Multipleitems, Startindex, PageCount) => {
    try {
      setLoading(true);
      setBackdropOpen(true); 
      setProductLists([]);
      const productLists = await API_FetchProductBySubCategory(SubCategoryId, Multipleitems, Startindex, PageCount);
      setProductLists(productLists);
      setLoading(false);
      setBackdropOpen(false); 
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      setLoading(false);
      setBackdropOpen(false);
      setProductLists([]);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedId = queryParams.get('pcid');
    const encodedName = queryParams.get('pcname');
    const encodedSId = queryParams.get('pscid');
    const encodedSName = queryParams.get('pscname');
    setCategoryId(decodeURIComponent(encodedId));
    setCategoryName(decodeURIComponent(encodedName));
    setSubCategoryId(decodeURIComponent(encodedSId));
    setSubCategoryName(decodeURIComponent(encodedSName));
    GetCategoryBySubCategory(atob(encodedId));
    if(encodedSId === null){
      setActiveCategory("All Products");      
      GetProductLists(atob(encodedId), Multipleitems, Startindex, PageCount);  
    }    
    
  }, [location.search, categoryId, Multipleitems, Startindex, PageCount]);

  // Function to filter products based on the selected option
  const handleProductFilterChange = (event) => {
    const filterName = event.target.value;
    setProductFilterName(filterName);
  };

  // Apply filtering logic whenever the product list or filter name changes
  useEffect(() => {
    let sortedProducts = [...productLists];

    switch (productFilterName) {
      case "Price(Low > High)":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price(High > Low)":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetical":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical Reverse":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedProducts = [...productLists];
    }

    setFilteredProductLists(sortedProducts);
  }, [productFilterName, productLists]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
        !loading
      ) {
        setPageCount(prevIndex => prevIndex + 5);
        // You can call GetProductLists or GetProductListsBySubCategory here if needed
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productLists, loading, PageCount]);

  return (
    <Container maxWidth="xl">
      <Grid container>
        {/* Left-side Drawer */}
        {offerProducts === null ? 
         <Grid item sx={{ display: { xs: 'none', md: 'block' } }} style={{ position: 'sticky', top: 0, height: '100vh' }}>
         <Drawer
           variant="permanent"
           sx={{
             width: drawerWidth,
             flexShrink: 0,
             position: "relative",
             '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box',
               position: "relative",
             },
           }}
         >
           <List>
             {subcategories.map((category, index) => (
               <ListItem
                 button
                 key={index}
                 onClick={() => handleCategoryClick(category.SubCategory, category.Id)}
                 sx={{
                   borderLeft: activeCategory === category.SubCategory ? '4px solid #3BB77E' : 'none',
                   backgroundColor: activeCategory === category.SubCategory ? '#3bb77e1c' : 'transparent',
                   color: activeCategory === category.SubCategory ? '#3BB77E' : '#253D4E',
                   '& .MuiListItemIcon-root': {
                     color: activeCategory === category.SubCategory ? '#000' : 'inherit',
                   },
                   '&:hover': {
                     backgroundColor: '#3bb77e1c',
                     color: "#3BB77E"
                   },
                 }}
               >
                 <img
                   style={{
                     position: 'relative',
                     height: '3rem',
                     width: '3rem',
                     borderRadius: '9999px',
                     padding: '.25rem',
                     backgroundColor: '#f7f0fa',
                     marginRight: 10,
                   }}
                   src={category.ImagePath ? ImagePathRoutes.SubCategoryImagePath + category.ImagePath : "https://www.healthysteps.in/categoryimages/All-categories.png"}
                 />
                 <ListItemText
                   primary={category.SubCategory}
                   primaryTypographyProps={{
                     style: {
                       fontWeight: activeCategory === category.SubCategory ? 'bold' : 'normal',
                       fontFamily: 'inherit'
                     },
                   }}
                 />
               </ListItem>
             ))}
           </List>
         </Drawer>
       </Grid>
        :
        <></>        
        }
       

        {/* Mobile Drawer Toggle Button */}
        <Grid item sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <List>
              {subcategories.map((category, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleCategoryClick(category.SubCategory, category.Id)}
                  sx={{
                    borderLeft: activeCategory === category.SubCategory ? '4px solid #3BB77E' : 'none',
                    backgroundColor: activeCategory === category.SubCategory ? '#3bb77e1c' : 'transparent',
                    color: activeCategory === category.SubCategory ? '#3BB77E' : '#253D4E',
                    '& .MuiListItemIcon-root': {
                      color: activeCategory === category.SubCategory ? '#000' : 'inherit',
                    },
                    '&:hover': {
                      backgroundColor: '#3bb77e1c',
                      color: "#3BB77E"
                    },
                  }}
                >
                  <img
                    style={{
                      position: 'relative',
                      height: '3rem',
                      width: '3rem',
                      borderRadius: '9999px',
                      padding: '.25rem',
                      backgroundColor: '#f7f0fa',
                      marginRight: 10,
                    }}
                    src={category.ImagePath ? ImagePathRoutes.SubCategoryImagePath + category.ImagePath : "https://www.healthysteps.in/categoryimages/All-categories.png"}
                  />
                  <ListItemText
                    primary={category.SubCategory}
                    primaryTypographyProps={{
                      style: {
                        fontWeight: activeCategory === category.SubCategory ? 'bold' : 'normal',
                        fontFamily: 'inherit'
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Grid>

        {/* Right-side Content Area */}
        <Grid item xs>
          <Grid container sx={{ px: 3, justifyContent: "flex-start", gap: "0px 18px" }}>
            <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ py: 3, fontSize: 28, fontFamily: "inherit", fontWeight: 600, color: '#F44336' }} variant="h4">
                {activeCategory ? activeCategory : subCategoryName}
              </Typography>
              <Box sx={{ minWidth: 250 }}>
                <FormControl fullWidth>
                  <Select
                    id="productFilter"
                    value={productFilterName}
                    size="small"
                    sx={{textAlign: "left"}}
                    onChange={handleProductFilterChange}
                  >
                    <MenuItem value={"All products"}>All products</MenuItem>
                    <MenuItem value={"Price(Low > High)"}>Price(Low > High)</MenuItem>
                    <MenuItem value={"Price(High > Low)"}>Price(High > Low)</MenuItem>
                    <MenuItem value={"Alphabetical"}>Alphabetical</MenuItem>
                    <MenuItem value={"Alphabetical Reverse"}>Alphabetical Reverse</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Render filtered product list */}
            {productLists.length > 0 ? (
              productLists.map((product) => (
                <Box key={product.id} sx={{ mb: 3 }}>
                  <ProductCard product={product} isLoading={loading} />
                </Box>
              ))
            ) : (
              !backdropOpen && (
                <Typography
                  variant="h6"
                  sx={{ mt: 3, width: '100%', textAlign: 'center', color: 'grey.600' }}
                >
                  No products available.
                </Typography>
              )
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Loader and Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default ProductList;
