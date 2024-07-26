import React from 'react';
import './styles/herobanner.scss';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <section id='herobanner'>
      <div className="herobanner-container">
        <h1 className='herobanner-header'>Buy and Sell Used Products Within Your College Campus</h1>
        <p className='herobanner-text'>Find out your college needs and start buying and selling on UniMarket!.</p>
        <Link href='post-ad' className='post-free-ad-link'><button className="btn">Post Free Ad</button> </Link>
      </div>
    </section>
  )
}

export default HeroBanner;