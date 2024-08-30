"use client"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Log form data for debugging
        console.log('Form data:', new FormData(form.current));

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
            (result) => {
                console.log('SUCCESS!', result.text);
                alert('Email sent successfully!');
            },
            (error) => {
                console.log('FAILED...', error);
                alert(`An error occurred: ${error.text || 'Unknown error'}`);
            }
        );
    };

    return (
        <div className="container flex flex-col items-center justify-center mt-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col w-4/12 p-8 space-y-3 bg-gray-700 rounded">
                <label className="text-white" htmlFor="from_name">Your Name:</label>
                <input
                    className="p-2 rounded"
                    type="text"
                    id="from_name"
                    name="from_name"
                    placeholder="Enter your name"
                    required
                />
                <label className="text-white" htmlFor="from_email">Your Email:</label>
                <input
                    className="p-2 rounded"
                    type="email"
                    id="from_email"
                    name="from_email"
                    placeholder="Enter your email address"
                    required
                />
                <label className="text-white" htmlFor="subject">Select a Subject:</label>
                <select
                    className="py-2 rounded"
                    id="subject"
                    name="subject"
                >
                    <option value="order_inquiry">Order Inquiry</option>
                    <option value="product_question">Product Question</option>
                    <option value="technical_support">Technical Support</option>
                    <option value="donation_inquiry">Donation Inquiry</option>
                    <option value="general_feedback">General Feedback</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="message" className="text-white">Write your message here:</label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Enter your message here."
                    className="p-2"
                ></textarea>
                <input
                    className="w-24 py-2 text-white bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
                    type="submit"
                    value="Send"
                />
            </form>
        </div>
    );
}
