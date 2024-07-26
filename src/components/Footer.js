import React from 'react';
import { Link } from 'react-router-dom';
import './styles/footer.scss';

const Footer = () => {
  return (
    <section id='footer'>
        <footer className='container'>
          <div className="icons-container">
            <a className="icon-wrapper" href="https://www.facebook.com"><i className="fa-brands fa-facebook-f icon"></i></a>
            <a className="icon-wrapper" href="https://www.twitter.com"><i className="fa-brands fa-twitter icon"></i></a>
            <a className="icon-wrapper" href="https://www.instagram,.com"><i className="fa-brands fa-instagram icon"></i></a>
            <a className="icon-wrapper" href="https://www.linkedin.com"><i className="fa-brands fa-linkedin-in icon"></i></a>
            <a className="icon-wrapper" href="https://www.youtube.com"><i className="fa-brands fa-youtube icon"></i></a>
          </div>
          <p className="copyright">&copy; Unimarket Private Limited, {new Date().getFullYear()}.</p> 
          <div className='terms-wrapper d-flex flex-row justify-content-center'>
            <Link to='' className='terms'>Terms and Conditions </Link>
            <span className='mx-2'> | </span>
            <Link to='' className='terms'> Privacy Policy </Link>
          </div>
        </footer>
    </section>
  )
}

export default Footer