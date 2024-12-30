import React from 'react'
import Menu from '../../utilities/menu';

const Sidebar = ({ screenWidth, setActiveMenu, hideActiveMenu, setHideActiveMenu }) => {
  return (
    <aside className={`sidebar ${screenWidth < 768 && hideActiveMenu ? '' : 'hide'} `}>
      <div className="menu-container">
        {
          Menu().map((item, index) => (
            <div onClick={() => {
              setActiveMenu(item.name);
              setHideActiveMenu(false);
            }} key={index} name={item.name} className="menu-wrapper">
              <div className="icon-wrapper">
                <i className={`${item.icon} icon`}></i>
              </div>
              <span>{item.label}</span>
            </div>
          ))
        }
      </div>
    </aside>

    // <div className={`left-container ${screenWidth < 768 && hideActiveMenu ? '' : 'hide'} `}>
    // <div className="profile-container">
    //   <div className="profile-picture-wrapper">
    //     <img className='profile-picture' src={currentUser.hasDisplayPicture ? currentUser.displayPicture.secure_url : avatar} alt="" />
    //   </div>
    //   <p className="name text-center w-100 my-2">{currentUser.name}</p>
    //   <p className="phone-number text-center w-100 mt-2">{currentUser.phone}</p>
    // </div>
    // <div className="menu-container">
    //   {
    //     Menu().map((item, index) => (
    //       <div onClick={() => {
    //         setActiveMenu(item.name);
    //         setHideActiveMenu(false);
    //       }} key={index} name={item.name} className="menu-wrapper">
    //         <div className="icon-wrapper">
    //           <i className={`${item.icon} icon`}></i>
    //         </div>
    //         <span>{item.label}</span>
    //       </div>
    //     ))
    //   }
    // </div>
    // </div>

  )
}

export default Sidebar