import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './styles/checkout.scss';
import formatNaira from 'format-to-naira';
import PaymentService from '../services/PaymentService';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

// Protect the page by checking if the state exists
  if(!state || !state.product || !state.totalAmount){
    return <Navigate to='/' replace/>
  }

  const initializePayment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await PaymentService.initializeTransaction({
        productId: state.product.id,
        quantity: Number(state.quantity),
        callback_url: "http://localhost:3000/verify-payment"
        // amount: state.totalAmount
      });
      window.location.href = data.data.authorization_url
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section id='checkout'>
      <div className="checkout-container">
        <h3>Checkout</h3>
        <h5>Selecting any of the payment method will redirect you to their payment platform.</h5>

        <div className="summary">
          <p className="content">
            <span className="left">Original Price</span>
            <span className="right">{formatNaira(state?.product?.price)}</span>
          </p>
          <p className="content">
            <span className="left">Total ({state?.quantity})</span>
            <span className="right">{formatNaira(state?.totalAmount)}</span>
          </p>
        </div>

        <div className="payment-icon-container">
          <div className="icon-wrapper">
            <svg onClick={initializePayment} name='flutterwave' viewBox="-135.4 209.8 604.3 125.4" xmlns="http://www.w3.org/2000/svg">
              <path d="m67.2 244.4h.2c1.2 0 1.9.9 1.9 2.1v53.9c0 .9-.7 1.9-1.9 1.9-.9 0-1.9-.7-1.9-1.9v-54.1c0-1 .7-1.9 1.7-1.9zm-51.3 2.8h35.3c1.2 0 1.9 1.2 1.9 2.1s-.7 1.9-1.9 1.9h-33.4v22.5h30.2c.9 0 1.9.7 1.9 1.9 0 .9-.7 1.9-1.9 1.9h-29.9v23.2c-.2 1.2-1.2 2.1-2.3 2.1-1.2 0-2.1-.9-2.1-2.1v-51.3h.2a2 2 0 0 1 2-2.2zm102.5 16.7c0-1.2-.9-1.9-1.9-1.9-1.2 0-1.9.9-1.9 1.9v22.5c0 7.7-6.3 13.7-14 13.5-8.2 0-12.9-5.3-12.9-13.7v-22.3c0-1.2-.9-1.9-1.9-1.9-.9 0-1.9.9-1.9 1.9v23c0 9.5 6.1 16.5 16.1 16.5 6.1.2 11.9-3 14.7-8.4v5.8c0 1.2.9 1.9 1.9 1.9 1.2 0 1.9-.9 1.9-1.9h-.2v-36.9zm35.5.3c0 .9-.9 1.6-1.9 1.6h-12.9v25.8c0 5.8 3.3 7.9 8.2 7.9 1.6 0 3.3-.2 4.7-.7.9 0 1.6.7 1.6 1.6 0 .7-.5 1.4-1.2 1.6-1.9.7-4 .9-5.8.9-6.1 0-11.2-3.5-11.2-10.9v-26.2h-4.4c-.9 0-1.9-.9-1.9-1.9 0-.9.9-1.6 1.9-1.6h4.4v-11.1c0-.9.7-1.9 1.6-1.9h.2c.9 0 1.9.9 1.9 1.9v11.1h12.9c1 0 1.9.9 1.9 1.9zm30 1.6c.9 0 1.9-.7 1.9-1.6s-.9-1.9-1.9-1.9h-12.9v-11.1c0-.9-.9-1.9-1.9-1.9h-.2c-.9 0-1.6.9-1.6 1.9v11.1h-4.4c-.9 0-1.9.7-1.9 1.6s.9 1.9 1.9 1.9h4.4v26.2c0 7.4 5.1 10.9 11.2 10.9 1.9 0 4-.2 5.8-.9.7-.2 1.2-.9 1.2-1.6 0-.9-.7-1.6-1.6-1.6-1.4.5-3 .7-4.7.7-4.9 0-8.2-2.1-8.2-7.9v-25.8zm8.9 16.5c0-11.8 8.2-21.1 19.2-21.1 11.5 0 18.7 9.3 18.7 21.1 0 .9-.9 1.9-1.9 1.9h-31.8c.7 10 8 15.8 15.9 15.8 4.9 0 9.8-2.1 13.1-5.6.2-.2.7-.5 1.2-.5.9 0 1.9.9 1.9 1.9 0 .5-.2.9-.7 1.4-4 4.4-9.8 6.7-15.7 6.5-10.8 0-19.9-8.4-19.9-21.1zm53.1-8.4c2.6-6.7 8.9-11.6 16.1-12.1 1.2 0 2.1.9 2.1 2.3 0 .9-.7 2.1-1.9 2.1h-.2c-8.7.9-16.1 7.2-16.1 20.2v14.9c-.2 1.2-.9 1.9-2.1 1.9-.9 0-1.9-.9-1.9-1.9v-37.2c.2-1.2.9-1.9 2.1-1.9.9 0 1.9.9 1.9 1.9zm79.9-14.2c-2.8 0-5.1 1.9-5.8 4.6l-6.8 21.6-6.8-21.6c-.7-2.8-3.3-4.9-6.3-4.9h-.7c-3 0-5.6 1.9-6.3 4.9l-6.8 21.4-6.5-21.6c-.7-2.6-3-4.6-5.8-4.6h-.2c-3 0-5.4 2.6-5.4 5.6 0 .9.2 1.9.5 2.8l10.5 30c.7 3 3.3 5.1 6.5 5.3h.5c3 0 5.6-2.1 6.5-5.1l6.8-21.4 6.8 21.4c.7 3 3.5 5.1 6.5 5.1h.5c3.3 0 6.1-2.1 6.8-5.3l10.5-30.2c.2-.7.5-1.6.5-2.3v-.2c-.1-3.1-2.4-5.5-5.5-5.5zm16.4 2.1c4.4-1.4 8.9-2.3 13.6-2.1 6.5 0 11.2 1.9 14.7 4.9 3.3 3.7 4.9 8.6 4.7 13.5v19c0 3.3-2.6 5.8-5.8 5.8-3 0-5.6-2.1-5.8-5.1-3.3 3.5-8 5.6-12.9 5.3-7.7 0-14.5-4.6-14.5-13 0-9.3 7-13.7 17.1-13.7 3.5 0 7 .5 10.3 1.6v-.7c0-5.1-3-7.7-9.1-7.7-2.8 0-5.6.2-8.4 1.2-.5.2-1.2.2-1.6.2-2.8.2-5.1-1.9-5.1-4.6-.2-2 .9-3.9 2.8-4.6zm69 1.9c.7-2.6 3-4.2 5.6-4.2 3.3 0 5.8 2.6 5.8 5.6v.2c0 .9-.2 1.9-.7 2.8l-12.6 30c-1.2 3-4 4.9-7 5.1h-.7c-3.3-.2-5.8-2.3-6.8-5.3l-13.1-30c-.5-.9-.7-1.9-.7-2.8.2-3.3 2.8-5.6 5.8-5.6 2.8 0 5.1 1.9 5.8 4.4l9.1 24.4zm16.2 19.5c.5 11.6 10.5 20.7 22.2 20 5.4 0 10.5-1.6 14.7-5.1 1.2-.9 1.6-2.1 1.6-3.5v-.2c0-2.6-2.1-4.6-4.7-4.6-.9 0-2.1.2-2.8.9-2.6 1.9-5.6 3-8.7 2.8-5.1.2-9.6-3.3-10.3-8.4h24.1c3-.2 5.4-2.8 5.1-5.8v-.9c0-10.5-9.1-19.3-20.3-19-12.4 0-21.1 10-21.1 22.1v1.7z" fill="#10112b" />
              <path d="m196.7 280.4c.7-8.8 7-15.6 15-15.6 9.1 0 14 7.4 14.5 15.6zm167 7c0 4.6-4 7.4-9.6 7.2-3.7 0-6.5-1.9-6.5-5.1v-.2c0-3.5 3.3-5.8 8.4-5.8 2.6 0 5.4.7 7.7 1.6zm84.7-18.4c-4.9 0-8.2 3.5-9.1 9.1h18c-.7-5.4-4-9.1-8.9-9.1z" fill="#fff" />
              <path d="m-46.7 217.7c52.6-7.9 18.9 36.9 2.6 49.5 11.2 8.6 22.7 20.7 27.6 34.4 9.1 25.1-13.3 28.8-30.2 22.5-18.5-6.5-34.8-20.4-45.6-36.7-3 0-6.3-.5-9.4-1.4 6.1 17.2 8.7 34.8 7 49.2 0-29-13.8-57.8-33.7-81.8-7-8.4.2-14.6 6.5-6.5 4.3 5.9 8.2 12 11.7 18.3 6.9-23.6 40.5-44.2 63.5-47.5zm-7.5 42.7c10.3-6.3 41.6-39.9 12.4-36.9-16.8 1.9-37.2 17.4-45.6 27.4 11.7-1.4 23.6 3.7 33.2 9.5zm-29 26.1c9.4 10.5 22.2 20.7 36 24.4 8 2.1 16.8 1.2 13.6-10.2-3.3-10.5-11.7-19.7-19.9-26.7-2.3 1.6-4.9 3.3-7.5 4.4-7 3.9-14.5 6.7-22.2 8.1z" fill="#eba12a" />
              <path d="m-87.7 258.3c8-.7 16.6 3.5 23.2 7.7-6.3 3-13.3 4.9-20.6 5.3-10.7.1-12.9-12-2.6-13z" fill="#fff" />
            </svg>
          </div>
          <div className="icon-wrapper">
            <svg onClick={initializePayment} name='paystack' viewBox="-131.2 222 600.2 106.9" xmlns="http://www.w3.org/2000/svg">
              <path d="m-45.8 232.2h-80.4c-2.7 0-5 2.3-5 5.1v9.1c0 2.8 2.3 5.1 5 5.1h80.4c2.8 0 5-2.3 5.1-5.1v-9c0-2.9-2.3-5.2-5.1-5.2zm0 50.5h-80.4c-1.3 0-2.6.5-3.5 1.5-1 1-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h80.4c2.8 0 5-2.2 5.1-5.1v-9.1c-.1-2.9-2.3-5.1-5.1-5.1zm-35.1 25.2h-45.3c-1.3 0-2.6.5-3.5 1.5s-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h45.2c2.8 0 5-2.3 5-5v-9.1c.1-3-2.1-5.3-4.9-5.2zm40.2-50.5h-85.5c-1.3 0-2.6.5-3.5 1.5s-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h85.4c2.8 0 5-2.3 5-5.1v-9.1c.1-2.8-2.2-5-4.9-5.1zm0 0" fill="#00c3f7" />
              <path d="m52.8 252.6c-2.5-2.6-5.4-4.6-8.7-6s-6.8-2.1-10.4-2.1c-3.5-.1-6.9.7-10.1 2.2-2.1 1-4 2.4-5.6 4.1v-1.6c0-.8-.3-1.6-.8-2.2s-1.3-1-2.2-1h-11.1c-.8 0-1.6.3-2.1 1-.6.6-.9 1.4-.8 2.2v74.8c0 .8.3 1.6.8 2.2.6.6 1.3.9 2.1.9h11.4c.8 0 1.5-.3 2.1-.9.6-.5 1-1.3.9-2.2v-25.6c1.6 1.8 3.7 3.1 6 3.9 3 1.1 6.1 1.7 9.3 1.7 3.6 0 7.2-.7 10.5-2.1s6.3-3.4 8.8-6c2.6-2.7 4.6-5.9 6-9.4 1.6-3.9 2.3-8.1 2.2-12.3.1-4.2-.7-8.4-2.2-12.4-1.5-3.3-3.5-6.5-6.1-9.2zm-10.2 27.1c-.6 1.6-1.5 3-2.7 4.3-2.3 2.5-5.6 3.9-9 3.9-1.7 0-3.4-.3-5-1.1-1.5-.7-2.9-1.6-4.1-2.8s-2.1-2.7-2.7-4.3c-1.3-3.4-1.3-7.1 0-10.5.6-1.6 1.6-3 2.7-4.2 1.2-1.2 2.6-2.2 4.1-2.9 1.6-.7 3.3-1.1 5-1.1 1.8 0 3.4.3 5.1 1.1 1.5.7 2.9 1.6 4 2.8 1.2 1.2 2 2.6 2.7 4.2 1.2 3.5 1.1 7.2-.1 10.6zm79.6-33.6h-11.3c-.8 0-1.6.3-2.1.9-.6.6-.9 1.4-.9 2.3v1.4c-1.4-1.7-3.2-3-5.1-3.9-3.1-1.5-6.5-2.2-9.9-2.2-7.3 0-14.2 2.9-19.4 8-2.7 2.7-4.8 5.9-6.2 9.4-1.6 3.9-2.4 8.1-2.3 12.4-.1 4.2.7 8.4 2.3 12.4 1.5 3.5 3.5 6.7 6.2 9.4 5.1 5.2 12.1 8.1 19.3 8.1 3.4.1 6.8-.7 9.9-2.2 1.9-1 3.8-2.3 5.2-3.9v1.5c0 .8.3 1.6.9 2.2.6.5 1.3.9 2.1.9h11.3c.8 0 1.6-.3 2.1-.9.6-.6.9-1.4.9-2.2v-50.3c0-.8-.3-1.6-.8-2.2-.6-.7-1.4-1.1-2.2-1.1zm-15.3 33.6c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.5 2.2-4 2.9-3.2 1.5-6.9 1.5-10.1 0-1.5-.7-2.9-1.7-4.1-2.9s-2.1-2.7-2.7-4.3c-1.2-3.4-1.2-7.1 0-10.5.6-1.6 1.5-2.9 2.7-4.2 1.2-1.2 2.5-2.2 4.1-2.9 3.2-1.5 6.9-1.5 10 0 1.5.7 2.9 1.6 4 2.8s2 2.6 2.7 4.2c1.4 3.5 1.4 7.2.1 10.6zm127.9-6.8c-1.6-1.4-3.5-2.6-5.5-3.4-2.1-.9-4.4-1.5-6.6-2l-8.6-1.7c-2.2-.4-3.8-1-4.6-1.7-.7-.5-1.2-1.3-1.2-2.2s.5-1.7 1.6-2.4c1.5-.8 3.1-1.2 4.8-1.1 2.2 0 4.4.5 6.4 1.3 2 .9 3.9 1.8 5.7 3 2.5 1.6 4.7 1.3 6.2-.5l4.1-4.7c.8-.8 1.2-1.8 1.3-2.9-.1-1.2-.7-2.2-1.6-3-1.7-1.5-4.5-3.1-8.2-4.7s-8.4-2.4-13.9-2.4c-3.4-.1-6.7.4-9.9 1.4-2.7.9-5.3 2.2-7.6 3.9-2.1 1.6-3.7 3.6-4.9 6-1.1 2.3-1.7 4.8-1.7 7.3 0 4.7 1.4 8.5 4.2 11.3s6.5 4.7 11.1 5.6l9 2c1.9.3 3.9.9 5.7 1.8 1 .4 1.6 1.4 1.6 2.5 0 1-.5 1.9-1.6 2.7s-2.9 1.3-5.3 1.3-4.9-.5-7.1-1.6c-2.1-1-4-2.3-5.8-3.8-.8-.6-1.6-1.1-2.6-1.5-1-.3-2.3 0-3.6 1.1l-4.9 3.7c-1.4 1-2.1 2.7-1.7 4.3.3 1.7 1.6 3.3 4.1 5.2 6.2 4.2 13.6 6.4 21.1 6.2 3.5 0 7-.4 10.3-1.4 2.9-.9 5.6-2.2 8-4 2.2-1.6 4-3.7 5.2-6.2 1.2-2.4 1.8-5 1.8-7.7.1-2.4-.4-4.8-1.4-7-1-1.6-2.3-3.3-3.9-4.7zm49.4 13.7c-.5-.9-1.4-1.5-2.5-1.7-1 0-2.1.3-2.9.9-1.4.9-3 1.4-4.6 1.5-.5 0-1.1-.1-1.6-.2-.6-.1-1.1-.4-1.5-.8-.5-.5-.9-1.1-1.2-1.7-.4-1-.6-2-.5-3v-20.5h14.6c.9 0 1.7-.4 2.3-1s1-1.3 1-2.2v-8.7c0-.9-.3-1.7-1-2.2-.6-.6-1.4-.9-2.2-.9h-14.7v-14c0-.8-.3-1.7-.9-2.2s-1.3-.8-2.1-.9h-11.4c-.8 0-1.6.3-2.2.9s-1 1.4-1 2.2v14h-6.5c-.8 0-1.6.3-2.2 1-.5.6-.8 1.4-.8 2.2v8.7c0 .8.3 1.6.8 2.2.5.7 1.3 1 2.2 1h6.5v24.4c-.1 2.9.5 5.8 1.7 8.4 1.1 2.2 2.5 4.1 4.4 5.7 1.8 1.5 3.9 2.6 6.2 3.2 2.3.7 4.7 1.1 7.1 1.1 3.1 0 6.3-.5 9.3-1.5 2.8-.9 5.3-2.5 7.3-4.6 1.3-1.3 1.4-3.4.4-4.9zm61.8-40.5h-11.3c-.8 0-1.5.3-2.1.9s-.9 1.4-.9 2.3v1.4c-1.4-1.7-3.1-3-5.1-3.9-3.1-1.5-6.5-2.2-9.9-2.2-7.3 0-14.2 2.9-19.4 8-2.7 2.7-4.8 5.9-6.2 9.4-1.6 3.9-2.4 8.1-2.3 12.3-.1 4.2.7 8.4 2.3 12.4 1.4 3.5 3.6 6.7 6.2 9.4 5.1 5.2 12 8.1 19.3 8.1 3.4.1 6.8-.7 9.9-2.1 2-1 3.8-2.3 5.2-3.9v1.5c0 .8.3 1.6.9 2.1.6.6 1.3.9 2.1.9h11.3c1.7 0 3-1.3 3-3v-50.3c0-.8-.3-1.6-.8-2.2-.5-.7-1.3-1.1-2.2-1.1zm-15.2 33.6c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.5 2.2-4 2.9-1.6.7-3.3 1.1-5.1 1.1s-3.4-.4-5-1.1c-1.5-.7-2.9-1.7-4.1-2.9s-2.1-2.7-2.6-4.3c-1.2-3.4-1.2-7.1 0-10.5.6-1.6 1.5-3 2.6-4.2 1.2-1.2 2.6-2.2 4.1-2.9 1.6-.7 3.3-1.1 5-1.1s3.4.3 5.1 1.1c1.5.7 2.8 1.6 4 2.8s2.1 2.6 2.7 4.2c1.3 3.4 1.3 7.2 0 10.6zm77.2 6.1-6.5-5c-1.2-1-2.4-1.3-3.4-.9-.9.4-1.7 1-2.4 1.7-1.4 1.7-3.1 3.2-4.9 4.5-2 1.1-4.1 1.7-6.3 1.5-2.6 0-5-.7-7.1-2.2s-3.7-3.5-4.5-6c-.6-1.7-.9-3.4-.9-5.1 0-1.8.3-3.5.9-5.3.6-1.6 1.4-3 2.6-4.2s2.5-2.2 4-2.8c1.6-.7 3.3-1.1 5.1-1.1 2.2-.1 4.4.5 6.3 1.6 1.9 1.2 3.5 2.7 4.9 4.5.6.7 1.4 1.3 2.3 1.7 1 .4 2.2.1 3.4-.9l6.5-4.9c.8-.5 1.4-1.3 1.7-2.2.4-1 .3-2.1-.3-3-2.5-3.9-5.9-7.1-10-9.4-4.3-2.4-9.4-3.7-15.1-3.7-4 0-8 .8-11.8 2.3-3.6 1.5-6.8 3.6-9.5 6.3s-4.9 5.9-6.4 9.5c-3.1 7.5-3.1 15.9 0 23.4 1.5 3.5 3.6 6.8 6.4 9.4 5.7 5.6 13.3 8.6 21.3 8.6 5.7 0 10.8-1.3 15.1-3.7 4.1-2.3 7.6-5.5 10.1-9.5.5-.9.6-2 .3-2.9-.4-.8-1-1.6-1.8-2.2zm60.2 11.7-17.9-26.2 15.3-20.2c.7-.9 1-2.2.6-3.3-.3-.8-1-1.6-2.9-1.6h-12.1c-.7 0-1.4.2-2 .5-.8.4-1.4 1-1.8 1.7l-12.2 17.1h-2.9v-40.4c0-.8-.3-1.6-.9-2.2s-1.3-.9-2.1-.9h-11.3c-.8 0-1.6.3-2.2.9s-.9 1.3-.9 2.2v74.5c0 .9.3 1.6.9 2.2s1.4.9 2.2.9h11.3c.8 0 1.6-.3 2.1-.9.6-.6.9-1.4.9-2.2v-19.7h3.2l13.3 20.4c.8 1.5 2.3 2.4 3.9 2.4h12.7c1.9 0 2.7-.9 3.1-1.7.5-1.2.4-2.5-.3-3.5zm-281.8-51.4h-12.7c-1 0-1.9.3-2.6 1-.6.6-1 1.3-1.2 2.1l-9.4 34.8h-2.3l-10-34.8c-.2-.7-.5-1.4-1-2.1-.6-.7-1.4-1.1-2.3-1.1h-12.9c-1.7 0-2.7.5-3.2 1.7-.3 1-.3 2.1 0 3.1l16 49c.3.7.6 1.5 1.2 2 .6.6 1.5.9 2.4.9h6.8l-.6 1.6-1.5 4.5c-.5 1.4-1.3 2.6-2.5 3.5-1.1.8-2.4 1.3-3.8 1.2-1.2 0-2.3-.3-3.4-.7-1.1-.5-2.1-1.1-3-1.8-.8-.6-1.8-.9-2.9-.9h-.1c-1.2.1-2.3.7-2.9 1.8l-4 5.9c-1.6 2.6-.7 4.2.3 5.1 2.2 2 4.7 3.5 7.5 4.4 3.1 1.1 6.3 1.6 9.5 1.6 5.8 0 10.6-1.6 14.3-4.7 3.8-3.4 6.7-7.8 8.1-12.8l18.6-60.6c.4-1.1.5-2.2.1-3.2-.1-.7-.8-1.5-2.5-1.5zm0 0" fill="#011b33" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout;
