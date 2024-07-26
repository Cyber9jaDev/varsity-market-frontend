import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import img from '../assets/campus4.jpg';
import { useAppContext } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const SharedLayout = () => {
  const { filterModalIsOpen } = useAppContext();
  const [toggleDropdown, setToggleDropdown] = useState(false)


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('logout')) return;
      else if (toggleDropdown === true && !e.target.classList.contains('toggle')) {
        setToggleDropdown(false);
      }
    }
    window.addEventListener('mousedown', handleOutsideClick);
    return () => { window.removeEventListener('mousedown', handleOutsideClick) }
  }, [toggleDropdown]);


  return (
    <main id='main'>
      {filterModalIsOpen === false && <Navbar toggleDropdown={toggleDropdown} setToggleDropdown={setToggleDropdown} />}
      {filterModalIsOpen === false && <img src={img} className="main-img" alt="main-img" />}
      <Outlet />
      {filterModalIsOpen === false && <Footer />}
    </main>
  )
}

export default SharedLayout