import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { Box, Typography } from '@mui/material';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    borderTop: '1px solid #f0f4f9',
    my: 1,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: '#FFF',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'none',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(0),
    },
}));


export default function CouponModal() {
    return (
        <Box sx={{my: 1}}>
            <Accordion>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Box sx={{ marginRight: '8px' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            width="34px"
                            height="32px"
                            fill="none"
                            stroke="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                fill="#00cc96"
                                d="M50 0c6 0 11 6 16 7 5 2 12-1 17 3 4 3 3 10 5 15 1 5 7 10 7 16s-6 11-7 16c-2 5-1 12-5 15-5 4-12 1-17 3-5 1-10 7-16 7s-11-6-16-7c-5-2-12 1-17-3-4-3-3-10-5-15-1-5-7-10-7-16s6-11 7-16c2-5 1-12 5-15 5-4 12-1 17-3 5-1 10-7 16-7z"
                            />
                            <text
                                x="50%"
                                y="50%"
                                text-anchor="middle"
                                dominant-baseline="middle"
                                font-size="36"
                                font-family="Arial"
                                fill="white"
                            >
                                %
                            </text>
                        </svg>
                    </Box>
                    <Typography sx={{color: '#262a33', fontSize: '16px', fontWeight: 600, fontFamily: 'inherit'}}>Avail Offers / Coupons</Typography>
                </AccordionSummary>
            </Accordion>
        </Box>
    );
}
