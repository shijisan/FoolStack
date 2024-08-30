"use client";

import { useState, useEffect } from 'react';

// PayPal client ID and currency
const clientId = 'AfhgmGbBJ5A48FEEXu3i_sZnF9EnWVL1xw2v7gULdMRc6bWKXVZmdjjAnhPJyKGjPN-mnHGZCTcp3qYt';
const currency = 'USD';

// Mapping of prices to PayPal plan IDs
const planIds = {
  1: 'P-9B738207GY1713912M3JCENY', // $1/month plan ID
  5: 'P-9B738207GY1713912M3JCENY', // $5/month plan ID
  10: 'P-9B738207GY1713912M3JCENY', // $10/month plan ID
  20: 'P-9B738207GY1713912M3JCENY', // $20/month plan ID
};

export default function MonthlyDonation() {
  const [selectedAmount, setSelectedAmount] = useState(1);

  useEffect(() => {
    const scriptId = 'paypal-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      return;
    }

    if (clientId && currency) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons&vault=true`;
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          window.paypal.Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'subscribe'
            },
            createSubscription: (data, actions) => {
              const planId = planIds[selectedAmount];
              if (!planId) {
                throw new Error('Selected plan ID is not available');
              }
              return actions.subscription.create({
                plan_id: planId,
              });
            },
            onApprove: (data, actions) => {
              alert('Subscription approved! ID: ' + data.subscriptionID);
            },
            onError: (err) => {
              console.error('PayPal Error:', err);
              alert('An error occurred, please try again.');
            },
          }).render('#paypal-button-container');
        } else {
          console.error('PayPal SDK not loaded');
        }
      };

      document.body.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById(scriptId);
        if (scriptToRemove) {
          document.body.removeChild(scriptToRemove);
        }
      };
    } else {
      console.error('Missing PayPal client ID or currency.');
    }
  }, [selectedAmount]);

  const handleAmountChange = (event) => {
    setSelectedAmount(parseInt(event.target.value, 10));
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-8 space-y-3 px-52">
      <form className='flex flex-col w-6/12 p-8 space-y-3 bg-gray-700 rounded'>
        <h2 className='text-3xl font-bold text-white poppins'>Support Me with a Monthly Subscription</h2>
        <h3 className='text-white'>Choose your subscription plan:</h3>

        <div className='flex items-center space-x-2'>
          <span className='relative bg-transparent rounded -me-5'>$</span>
          <select
            className='w-9/12 h-10 bg-white border border-gray-300 rounded'
            value={selectedAmount}
            onChange={handleAmountChange}
          >
            <option value={1}>$1/month</option>
            <option value={5}>$5/month</option>
            <option value={10}>$10/month</option>
            <option value={20}>$20/month</option>
          </select>
          <a className='flex items-center justify-center w-3/12 h-10 px-2 text-center text-white bg-blue-600 rounded hover:bg-blue-400' href="one-time"> &#8635; One-time</a>
        </div>


        <div className='mt-4' id='paypal-button-container'>
          {/* PayPal Buttons will be rendered here */}
        </div>

      </form>
    </div>
  );
}
