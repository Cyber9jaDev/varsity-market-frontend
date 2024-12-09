// import React from 'react';
// import formatNaira from 'format-to-naira';
// import { convertDate } from '../utilities/utils';


// const SuccessfulPayment = ({ paymentData }) => {
//   const { date, time } = convertDate(paymentData.verifiedAt);

//   const printReceipt = (e) => {
//     e.preventDefault();
//     window.print();
//   }

//   return (
//     <div className='successful-payment'>
//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
//         <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
//         </svg>
//       </div>
//       <h1>Payment Successful</h1>
//       <h4>Thank you for your order</h4>
//       <div>
//         <div className="row">
//           <div className="col"> <span>Time/Date</span></div>
//           <div className="col"><span>{`${time}, ${date}`}</span></div>
//         </div>
//         <div className="row">
//           <div className="col"><span>Reference Number</span></div>
//           <div className="col"><span>{paymentData.reference}</span></div>
//         </div>
//         <div className="row">
//           <div className="col"><span>Product</span></div>
//           <div className="col"><span>{paymentData.product.name}</span></div>
//         </div>
//         <div className="row">
//           <div className="col"><span>Buyer Name</span></div>
//           <div className="col"><span>{paymentData.buyer.name}</span></div></div>
//         <div className="row">
//           <div className="col"><span>Amount</span></div>
//           <div className="col"><span>{paymentData.amount}</span></div>
//         </div>
//         <div className="row">
//           <div className="col"><span>Quantity</span></div>
//           <div className="col"><span>{paymentData.quantity}</span></div>
//         </div>
//         <div className="row">
//           <div className="col"><span>Total</span></div>
//           <div className="col"><span>{formatNaira(paymentData.total)}</span></div>
//         </div>
//       </div>
//       <form onSubmit={printReceipt}>
//         <button >Print</button>
//       </form>
//       </div>
//   )
// }

// export default SuccessfulPayment



import React, { useRef } from 'react';
import formatNaira from 'format-to-naira';
import { convertDate } from '../utilities/utils';

const SuccessfulPayment = ({ paymentData }) => {
  const { date, time } = convertDate(paymentData.verifiedAt);
  const componentRef = useRef();

  const printReceipt = (e) => {
    e.preventDefault();
    
    // Store original styles
    const originalStyles = {
      body: document.body.style.cssText,
      html: document.documentElement.style.cssText
    };

    // Add print-specific styles
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-content,
        #print-content * {
          visibility: visible;
        }
        #print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        @page {
          size: A4;
          margin: 20mm;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Add print-specific class to component
    componentRef.current.id = 'print-content';

    // Print
    window.print();

    // Cleanup
    document.head.removeChild(style);
    componentRef.current.id = '';
    document.body.style.cssText = originalStyles.body;
    document.documentElement.style.cssText = originalStyles.html;
  };

  return (
    <div className='successful-payment' ref={componentRef}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path>
          <path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
        </svg>
      </div>
      <h1>Payment Successful</h1>
      <h4>Thank you for your order</h4>
      <div className="receipt-details">
        <div className="row">
          <div className="col"><span>Time/Date</span></div>
          <div className="col"><span>{`${time}, ${date}`}</span></div>
        </div>
        <div className="row">
          <div className="col"><span>Reference Number</span></div>
          <div className="col"><span>{paymentData.reference}</span></div>
        </div>
        <div className="row">
          <div className="col"><span>Product</span></div>
          <div className="col"><span>{paymentData.product.name}</span></div>
        </div>
        <div className="row">
          <div className="col"><span>Buyer Name</span></div>
          <div className="col"><span>{paymentData.buyer.name}</span></div>
        </div>
        <div className="row">
          <div className="col"><span>Amount</span></div>
          <div className="col"><span>{paymentData.amount}</span></div>
        </div>
        <div className="row">
          <div className="col"><span>Quantity</span></div>
          <div className="col"><span>{paymentData.quantity}</span></div>
        </div>
        <div className="row">
          <div className="col"><span>Total</span></div>
          <div className="col"><span>{formatNaira(paymentData.total)}</span></div>
        </div>
      </div>
      <form onSubmit={printReceipt} className="no-print">
        <button type="submit">Print Receipt</button>
      </form>
    </div>
  );
};

export default SuccessfulPayment;
