import React from 'react'

const FailedPayment = () => {
  return (
    <div className='failed-payment'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
          <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
          <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
        </svg>
      </div>
      <h1>Payment Failed</h1>
      <h5>Unfortunately, payment was rejected</h5>
      <h6>You will be redirected to the homepage or click the button below</h6>
      <form>
        <button>Home</button>
      </form>
      </div>
  )
}

export default FailedPayment