import React from 'react';
import { Link } from 'react-router-dom';
import './styles/herobanner.scss';

const HeroBanner = () => {
  return (
    <section id='herobanner'>
      <div className="herobanner-container">
        <h1 className='herobanner-header'>Buy and Sell Used Products Within Your College Campus</h1>
        <p className='herobanner-text'>Find out your college needs and start buying and selling on UniMarket!.</p>
        <Link to='post-ad' className='post-free-ad-link'><button className="btn">Post Free Ad</button> </Link>
      </div>
    </section>
  )
}

export default HeroBanner;