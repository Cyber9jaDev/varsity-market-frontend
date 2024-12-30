import React, { useState } from 'react';
import './styles/profile.scss';
import Sidebar from '../components/profile/Sidebar';
import Content from '../components/profile/Content';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState('settings');
  const [hideActiveMenu, setHideActiveMenu] = useState(true);


  return (
    <section id='profile'>
      <div className="container-row">
        {/* Left  */}
        <Sidebar 
          currentUser={currentUser}
          setActiveMenu={setActiveMenu} 
          hideActiveMenu={hideActiveMenu}
          setHideActiveMenu={setHideActiveMenu}
        />
        {/* Right */}
        <Content
          activeMenu={activeMenu}
          hideActiveMenu={hideActiveMenu}
          setHideActiveMenu={setHideActiveMenu}
          currentUser={currentUser}
        />
      </div>
    </section>
  )
}

export default Profile;