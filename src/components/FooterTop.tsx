import React from 'react';
import './styles/footer.scss';
import Link from 'next/link';


const FooterTop = () => {
  return (
    <section id='footer-top'>
      <div className="footer-top-container">
        <div className="container">
          <div><strong>U<span>nimarket</span></strong></div>
          <p className="text text-2">Unimarket is a one stop platform to sell and buy all your used products at your comfort. This online exchange platform provides you ease of doing business within or around your college boundaries. All you need to do is Post your used products for exchange and you will find buyers in your campus only. You can also take the privilege of giving things for free.</p>
          <div className='footer-links-container mt-4'>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-regular fa-address-card"></i> About us</Link></div>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-regular fa-registered"></i> Register</Link></div>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-regular fa-address-book"></i> Contact</Link></div>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-solid fa-plus"></i> Post a Free Ad</Link></div>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-solid fa-question"></i> FAQs</Link></div>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-solid fa-person-chalkboard"></i> How it works</Link></div>
            <div className="link-wrapper"><Link href='' className="link"><i className="fa-solid fa-blog"></i>Blog</Link></div>
          </div>
          </div>
        </div>
    </section>
  )
}

export default FooterTop
