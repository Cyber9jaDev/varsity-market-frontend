import React from 'react'

const SendEmail = () => {
  const sendEmail = (e) => {
    e.preventDefault();

  }

  return (
    <div className='container'>
      <form className='form' onSubmit={sendEmail}>
        <div className="row">
          <textarea name="" placeholder='Message'></textarea>
          <input type="text" placeholder='Your Email'/>
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  )
}

export default SendEmail