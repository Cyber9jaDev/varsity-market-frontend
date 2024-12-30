import React, { useCallback, useEffect, useState } from 'react'
import ComingSoon from './ComingSoon'
import Settings from './Settings'
import UserAds from './UserAds'
import UsersService from '../../services/UsersService'

const Content = ({ hideActiveMenu, setHideActiveMenu, currentUser, activeMenu }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
      const [userAds, setUserAds] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleScreenResize = () => { setScreenWidth(window.innerWidth); }
    window.addEventListener('resize', handleScreenResize);
    return () => { window.removeEventListener('resize', handleScreenResize) }
  }, []);

    const getUserAds = useCallback(async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const { data } = await UsersService.getUserAds(currentUser.id);
        setUserAds(data);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    }, []);
  
    useEffect(() => {
      getUserAds();
    }, [getUserAds]);

  return (
    <div className={`content ${screenWidth < 768 && !hideActiveMenu ? '' : 'hide'}`}>
      {screenWidth < 768 && <div className="arrow-icon-wrapper my-3">
        <i class="fa-solid fa-circle-chevron-left" onClick={() => setHideActiveMenu(true)}></i>
      </div>}
      {activeMenu === 'adverts' && <UserAds hideActiveMenu={hideActiveMenu} activeMenu={activeMenu} screenWidth={screenWidth} isLoading={isLoading} hasError={hasError} userAds={userAds} />}
      {activeMenu === 'settings' && <Settings hasError={hasError} isLoading={isLoading} currentUser={currentUser} />}
      {activeMenu === 'feedback' && <ComingSoon hasError={hasError} isLoading={isLoading} currentUser={currentUser} />}
      {activeMenu === 'performance' && <ComingSoon hasError={hasError} isLoading={isLoading} currentUser={currentUser} />}
      {activeMenu === 'notifications' && <ComingSoon hasError={hasError} isLoading={isLoading} currentUser={currentUser} />}
    </div>
  )
}

export default Content