import React from 'react';
import Categories from '../components/Categories';
import HeroBanner from '../components/HeroBanner';
import WhyWeAreUnique from '../components/WhyWeAreUnique';
import FooterTop from '../components/FooterTop';

const Homepage = () => {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <WhyWeAreUnique />
      <FooterTop />
    </div>
  )
}

export default Homepage