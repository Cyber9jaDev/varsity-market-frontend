import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.scss";
import img from "../assets/profile.png";
import { useAppContext } from "../contexts/AppContext";
import { refresh } from "../utilities/utils";

const Navbar = ({ toggleDropdown, setToggleDropdown }) => {
  const { currentUser } = useAppContext();

  const logout = () => {
    localStorage.clear();
    refresh()
  }

  return (
    <header id="navbar">
      <div className="navbar-wrapper">
        <div className="logo-container">
          <Link className="logo-link" to=""><strong>U<span>nimarket</span></strong></Link>
        </div>

        <nav>
          <ul>
            { currentUser && <li onClick={() => setToggleDropdown(!toggleDropdown)} className="profile toggle">
                <span to="/profile" className="nav-link"> {" "} 
                  <img className="profile-image toggle" src={currentUser.hasDisplayPicture ? currentUser.displayPicture.url : img} alt="profile-img" />
                </span>
              </li>
            }

            {!currentUser && <li className="login"> <Link to="/login" className="nav-link"> Login </Link> </li> }
          </ul>

          { toggleDropdown && 
            <div className="dropdown-container">
              <div className="dropdown-wrapper">
                <li > <Link onClick={() => setToggleDropdown(false)} className='profile-link toggle' to='/profile'>Profile</Link> </li>
                <li className="logout" > <span className='profile-link logout' onClick={logout}>Logout</span> </li>
              </div>
            </div>
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
