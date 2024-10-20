/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { ServerURL } from '../server/serverUrl';
import { useTheme } from '@mui/material/styles';

export default function RazorpayPayment({ PlaceOrder, OnlinePayment, payableamount, usedwalledamount, Customer }) {

    const theme = useTheme();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlePayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const options = {
            key: ServerURL.COMPANY_PAYMENT_RAZ_KEY,
            amount: payableamount * 100,
            currency: ServerURL.CURRENCY,
            name: ServerURL.COMPANY_NAME,
            description: ServerURL.COMPANY_ADDRESS,
            order_id: ServerURL.COMPANY_REF_ID,
            handler: function (response) {
                console.log("razorpay_payment_response:", response);
                const onlinePaymentId = response.razorpay_payment_id;
                sessionStorage.setItem('onlinePStatus', 1);
                sessionStorage.setItem('onlinePaymentId', onlinePaymentId);
                // Call your order placement function
                PlaceOrder(1, onlinePaymentId);
            },
            prefill: {                
                name: atob(localStorage.getItem("userName")),
                contact: atob(localStorage.getItem("userMobileNo")),
                email: atob(localStorage.getItem("userEmail")),
            },
            theme: {
                color: theme.palette.basecolorCode.main
            },
            // wallet: {
            //     WalletBalance: usedwalledamount,
            //     WalletPayment: usedwalledamount
            // }
        };

        const rzp1 = new window.Razorpay(options);

        // Handle payment failure
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description + ' ' + response.error.reason);
            window.location.reload();
        });

        rzp1.open();
    };

    useEffect(() => {
        if (OnlinePayment === true) {
            console.log("pay call");
            handlePayment();
        }
        // eslint-disable-next-line no-use-before-define
    }, [OnlinePayment, handlePayment]);
}

