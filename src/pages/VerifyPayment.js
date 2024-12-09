import React, { useEffect, useState } from 'react';
import "./styles/verify-payment.scss";
import SuccessfulPayment from '../components/SuccessfulPayment';
import FailedPayment from '../components/FailedPayment';

const VerifyPayment = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  return (
    <main id='verify-payment'>
      <SuccessfulPayment />
      {/* <FailedPayment /> */}
    </main>
  )
}

export default VerifyPayment