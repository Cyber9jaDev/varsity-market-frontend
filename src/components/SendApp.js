import React from 'react';
import './styles/sendapp.scss';
import { Link } from 'react-router-dom'


const SendApp = () => {
  return (
    <section id='send-app'>

      <h2>Send me the App</h2>
      <p>Enter your phone number and we'll send you a link to download the free app</p>

      <div>
        <input type="text" placeholder='Enter your phone number' />
        <button htmlFor="">Get App</button>
      </div>

      <div className="download-wrapper mt-5">
        <Link to=''><img className='store-img me-4' src='https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg' alt="play-store-badge" /></Link>
        <Link to=''><img className='store-img ms-4' src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg' alt="apple-store-badge" /></Link>
      </div>
    </section>
  )
}

export default SendApp