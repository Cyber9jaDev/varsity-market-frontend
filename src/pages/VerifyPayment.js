import React, { useEffect, useState } from 'react';
import "./styles/verify-payment.scss";
import SuccessfulPayment from '../components/SuccessfulPayment';
import FailedPayment from '../components/FailedPayment';
import ReactLoading from 'react-loading';
import PaymentService from '../services/PaymentService';
import { useSearchParams } from 'react-router-dom';

const VerifyPayment = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');

  useEffect(() => {
    const verifyPayment = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const { data } = await PaymentService.verifyTransaction(reference);
        setPaymentData({ ...data });
      }
      catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    }

    if(reference){
      verifyPayment();
    }
  }, [reference]);

  return (
    <main id='verify-payment'>
      {
        isLoading ? <ReactLoading color='#01A185' height={'20%'} width={'20%'} /> 
          : !isLoading && !hasError ? <SuccessfulPayment paymentData={paymentData}/> : <FailedPayment />
      }
    </main>
  )
}

export default VerifyPayment;