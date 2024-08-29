"use client"


import React, { useState } from 'react';

export default function Home() {
    const [value, setValue] = useState(1.00);

    const increment = () => {
        setValue((prevValue) => (prevValue + 0.01).toFixed(2));
    };

    const decrement = () => {
        setValue((prevValue) => Math.max((prevValue - 0.01).toFixed(2), 1.00));
    };

    return (
        <div className="container flex flex-col justify-center mt-8 space-y-3 px-52">
            <h2 className='text-3xl font-bold poppins'>Where does the money go?</h2>
            <h3>The money you donate goes to whatever I want to spend it on!</h3>
            
            <div className='flex items-center space-x-2'>
                <span className='relative bg-transparent rounded -me-5'>$</span>
                <input className='w-24 h-10 bg-white border border-gray-300 rounded ps-4' type="number" min={1} placeholder='01.00'/>
                <select id="donationFrequency" className='h-10 border border-gray-300 rounded'>
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>


            <button className='px-2 py-1 mt-4 text-white bg-blue-600 rounded hover:bg-blue-400 w-fit'>Donate</button>
        </div>

    );
}
