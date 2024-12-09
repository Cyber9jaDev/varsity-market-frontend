import React from 'react'

const SuccessfulPayment = () => {
  return (
    <div className='successful-payment'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
        <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
        </svg>
      </div>
      <h1>Payment Successful</h1>
      <h4>Thank you for your order</h4>
      <div>
        <div className="row">
          <div className="col">
            <span>Time/Date</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Reference Number</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Payment Method</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Buyer Name</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Amount</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Quantity</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Total</span>
          </div>
          <div className="col">
              <span>January</span>
          </div>
        </div>
      </div>
      <form>
        <button>Print</button>
      </form>
      </div>
  )
}

export default SuccessfulPayment