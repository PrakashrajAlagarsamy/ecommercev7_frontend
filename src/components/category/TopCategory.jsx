import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/material';
import { API_SelectCategory } from '../../services/categoryServices';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';

export default function TopCategory() {
    const [value, setValue] = useState(null);
    const [categoryLists, setCategoryLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const FetchTopCategoryLists = async () => {
        try {
            const categoryList = await API_SelectCategory();
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

    return (
        <Box sx={{ maxWidth: "100%", bgcolor: 'background.paper' }}>
            <Container  
                maxWidth={{ xs: false, sm: 'xl' }}
                disableGutters={{ xs: true, sm: false }} 
                sx={{ pb: 2 }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"
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
                        // Category list
                        categoryLists.map((item, index) => (
                            <Tab
                                key={index}
                                id={item.Id}
                                label={
                                    <Box id={item.Id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar
                                            src={ImagePathRoutes.CategoryImagePath + item.ImagePath}
                                            sx={{ width: 55, height: 55, mb: 0.5 }}
                                            alt={item.Category}
                                        />
                                        <Typography variant="caption" 
                                        sx={{ textAlign: 'center',
                                            textTransform: 'capitalize',
                                            color: '#253D4E',
                                            fontFamily: 'inherit',
                                            fontWeight: 500,
                                            fontSize: '14px'
                                        }}>
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
}
