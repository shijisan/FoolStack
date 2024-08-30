"use client";

import { useState, useEffect } from 'react';

// PayPal client ID and currency
const clientId = 'AfhgmGbBJ5A48FEEXu3i_sZnF9EnWVL1xw2v7gULdMRc6bWKXVZmdjjAnhPJyKGjPN-mnHGZCTcp3qYt'; // Your PayPal client ID
const currency = 'USD';

export default function Home() {
  const [amount, setAmount] = useState(1.00);

  useEffect(() => {
    const scriptId = 'paypal-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      return;
    }

    if (clientId && currency) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons`;
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          window.paypal.Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'pay',
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                  },
                }],
              });
            },
            onApprove: async (data, actions) => {
              await actions.order.capture();
              alert('Transaction completed');
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
  }, [amount]);

  return (
    <div className="container flex flex-col items-center justify-center mt-8 space-y-3 px-52">
      <form className='flex flex-col w-6/12 p-8 space-y-3 bg-gray-700 rounded'>
        <h2 className='text-3xl font-bold text-white poppins'>Support Me with a Donation</h2>
        <h3 className='text-white'>Choose the amount of your donation:</h3>

        <div className='flex items-center space-x-2'>
          <span className='relative bg-transparent rounded -me-5'>$</span>
          <input
            className='w-9/12 h-10 bg-white border border-gray-300 rounded ps-4'
            type="number"
            min={1}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder='01.00'
          />
          <a className='flex items-center justify-center w-3/12 h-10 px-2 text-center text-white bg-blue-600 rounded hover:bg-blue-400' href="monthly"> &#8635; Monthly</a>
        </div>

        <div className='mt-4' id='paypal-button-container'>
          {/* PayPal Buttons will be rendered here */}
        </div>
      </form>
    </div>
  );
}
