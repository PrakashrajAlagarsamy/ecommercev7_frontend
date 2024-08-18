import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductItemCard = ({ product }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#FFF',
      }}
    >
      <Box
        component="img"
        sx={{
          width: 65,
          height: 65,
          borderRadius: 1,
          marginRight: 1.5,
        }}
        src={product.image}
        alt={product.name}
      />
      <Box>
        <Typography variant="p" 
        sx={{
            fontSize: '12px',
            fontWeight: 'bold',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            lineHeight: '12px',
            fontFamily: 'inherit',
            minHeight: '20px', 
            width: '150px',
            marginRight: 1.5,
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="p" color="textSecondary"
        sx={{
            fontSize: '10px',            
          }}
        >
          {product.details}
        </Typography>
      </Box>
      <Button 
        variant="outlined"
          sx={{ 
            width: "50%",
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: '#3BB77E',
            fontFamily: 'inherit',
            marginRight: 1.5,
            padding: { xs: '4px 0px', sm: '5px 0px', md: '5px 0px' },
            '&:hover':{
              background: '#3BB77E',
              border: '1px solid #3BB77E',
              color: '#FFF'
            } 
          }}
        >
          <Typography 
            variant="body2" 
            sx={{    
              width: '25%',          
              color: '#FFF', 
              fontFamily: 'inherit',
            }}
          >
            -
          </Typography>
          <Typography 
            variant="body2"
            sx={{ 
              width: '50%',     
              color: '#FFF',
              fontFamily: 'inherit',
            }}
          >
            1
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              width: '25%',     
              color: '#FFF',
              fontFamily: 'inherit',
            }}
          >
            +
          </Typography>
        </Button>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="p" sx={{ fontWeight: 500, fontSize: '14px' }}>
          ₹{product.price}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textDecoration: 'line-through', color: '#9e9e9e', fontSize: '12px' }}
        >
          ₹{product.originalPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductItemCard;
