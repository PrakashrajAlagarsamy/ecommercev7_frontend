import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { API_SelectCategory } from '../../services/categoryServices';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';

const CategoryCard = () => {
    const [categoryLists, setCategoryLists] = useState([]);

    const ShopByCategoryLists = async () => {
        try {
            const categoryList = await API_SelectCategory();
            setCategoryLists(categoryList);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        ShopByCategoryLists();
    }, []);

    return (
        <Box className="p-4">
            <Grid container spacing={4} justifyContent="center">
                {categoryLists.map((item, index) => (
                    <Grid
                        item
                        key={index}
                        xs={6} sm={4} md={3} lg={3} // Adjust grid for responsiveness
                        className=""
                    >
                        {/* Image container */}
                        <Box>
                            <img
                                src={ImagePathRoutes.CategoryImagePath + item.ImagePath}
                                alt={item.Category}
                                className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden shadow-md"
                            //className="object-cover w-full h-full"
                            />
                            <Typography
                                variant="body1"
                                sx={{ mt: 1 }}
                                className="w-full text-center text-sm sm:text-md lg:text-lg font-medium"
                            >
                                {item.Category}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategoryCard;
