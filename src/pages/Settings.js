import React from 'react';
import './styles/settings.scss'
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = () => {
  return (
    <div id='settings'>
      <header>
        <div className="logo-container">
          <Link to='/'>
            UniMarket
          </Link>
        </div>

        <div className="picture-container">

        </div>
      </header>

      <div className="items-wrapper">

          <Link to='/profile/settings/contact-details' className="item-container link">
            <p className='item'>Personal details</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to='/' className="item-container link">
            <p className='item'>Change phone number</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to='/' className="item-container link">
            <p className='item'>Change email</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to='/' className="item-container link">
            <p className='item'>Manage notifications</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to='/' className="item-container link">
            <p className='item'>Change Password</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to='/' className="item-container link">
            <p className='item'>Delete my account permanently</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to='/' className="item-container link">
            <p className='item'>Logout</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
    </div>
  )
}

export default Settings;