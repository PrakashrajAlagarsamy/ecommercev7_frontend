import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {Box, Typography, Grid, Divider} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SmsIcon from '@mui/icons-material/Sms';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid #f0f4f9`,
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
  backgroundColor:'#FFF',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
    alignItems: 'center'
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0px solid #f0f4f9',
}));

export default function AccordionAmountDetails() {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <VolunteerActivismIcon sx={{ marginRight: '15px', color: '#5c5c5c' }} />
          <Typography sx={{color: '#262a33', fontSize: '16px', fontWeight: 600, fontFamily: 'inherit'}}>Delivery partner tip
          <Typography sx={{fontSize: '.75rem', lineHeight: '1rem', fontWeight: 400, fontFamily: 'inherit' }}>This amount goes to your delivery partner</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <SmsIcon sx={{ marginRight: '15px', color: '#5c5c5c' }} />
          <Typography sx={{color: '#262a33', fontSize: '16px', fontWeight: 600, fontFamily: 'inherit'}}>Delivery instructions
          <Typography sx={{fontSize: '.75rem', lineHeight: '1rem', fontWeight: 400, fontFamily: 'inherit' }}>Delivery partner will be notified</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel1'} sx={{borderBottom: '1px solid #f0f4f9'}} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left section: Icon and text */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ReceiptIcon sx={{ marginRight: '15px', color: '#5c5c5c' }} />
        <Box>
          <Typography sx={{color: '#262a33', fontSize: '16px', fontWeight: 600, fontFamily: 'inherit'}}>To pay</Typography>
          <Typography variant="body2" sx={{color: '#a3a4ae', fontSize: '12px', fontWeight: 400, fontFamily: 'inherit'}}>
            Incl. all taxes and charges
          </Typography>
        </Box>
      </Box>

      {/* Right section: Price and savings */}
      <Box sx={{ textAlign: 'right' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="p"
            sx={{
              textDecoration: 'line-through',
              color: '#a3a4ae',
              marginRight: '8px',
              fontSize: '12px'
            }}
          >
            ₹3448.32
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#253D4E' }}>
            ₹2527.81
          </Typography>
        </Box>
        <Typography
          variant="p"
          sx={{
            background: 'linear-gradient(290deg, rgba(34, 155, 82, 0.18), rgba(34, 155, 82, 0))',
            color: '#229b52',
            fontWeight: '600',
            padding: '1px 6px',
            borderRadius: '3px',
            display: 'inline-block',
            fontSize: '10px',
          }}
        >
          SAVINGS ₹920.51
        </Typography>
      </Box>      
    </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Item Total & GST</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right" sx={{ textDecoration: 'line-through' }}>
                ₹3406.32
              </Typography>
              <Typography variant="body1" align="right">
                ₹2629.32
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Extra Discount With Pass</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right" color="green">
                -₹107
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Item total With Pass & GST</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                ₹2522.32
              </Typography>
            </Grid>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Grid item xs={6}>
              <Typography variant="body1">Handling Charge</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                ₹5.49
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Delivery Fee: Free with Pass</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                ₹0
              </Typography>
            </Grid>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Grid item xs={6}>
              <Typography variant="h6">To Pay</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                ₹2527.81
              </Typography>
              <Typography variant="body2" align="right" color="green">
                SAVING ₹920.51
              </Typography>
            </Grid>
          </Grid>
        </Box>
        </AccordionDetails>
      </Accordion>      
    </div>
  );
}
