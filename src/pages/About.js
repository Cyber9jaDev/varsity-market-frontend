import React from 'react';
import './styles/about.scss';
import img from '../assets/cyber-monday-retail-sales2.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id='about'>

      <div className="d-flex flex-column position-relative">

        <img className='bg-img' src={img} alt="about-img" />
        <h1>About Us</h1>
      

        <div className="content-wrapper">
          <div className='container'>
          <p className='mb-4'> <Link className='me-2 link' to='/'>Home</Link>{">"}<span className='ms-2'>About Us</span></p>

          <p className='mb-4'>
            The journey of miles starts with a single step’ this is what we had in our minds when we started working on college based marketplace for used items called <strong><em>Unimarket</em></strong>
            <br />
            As we were aware of the shortcomings of searches on different online platforms for used goods so we took an initiative to readdress the used goods online exchange platforms and tried to change it from its basic theme. It will not only change the search pattern but also will support ease of doing business for end users of used goods.
            <br />
          </p>

          <h4 className='mt-4 mb-3'>Our Mission</h4>
          <p><strong>Unimarket</strong> has the core interest in providing instant, reliable and free classified Ads information to users. We have created the unique platform for students from all walks to exchange their used goods for some benefit. One can donate the things for a cause too.</p>

          <h4 className='mt-4 mb-3'>About Company</h4>
          <ul>
            <li>Unimarket Internet Pvt. Ltd. started offering free online classified ad services in 2015 as a free campus-based marketplace Allstudyx in India.</li>
            <li>The official website www.unimarket.com was launched in 2023.</li>
          </ul>

          <h4 className='mt-4 mb-3'>About our online marketplace</h4>
          <ul>
            <li>Buy or sell used products range includes academic books, stationery, mobiles, laptops, gadgets, gym instruments and much more.</li>
            <li>Post multiple products in a single Ad.</li>
            <li>Campus-based exchange platform for used goods.</li>
            <li>Earn quick money.</li>
          </ul>

          <p>So the next time you close a deal for quick money or for some cause, you must be going home with cherished moments.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About