import React from 'react';
import img from '../../assets/campus4.jpg';
import formatNaira from "format-to-naira";
import UsersService from '../../services/UsersService';
import { convertDate, displayAlert, refresh } from '../../utilities/utils';
import Loading from '../Loading';
import Error from '../Error';

const UserAds = ({ userAds, isLoading, hasError, screenWidth }) => {
  const deleteAdvert = async (id) => {
    try {
      await UsersService.deleteAd(id);
      displayAlert('success', 'Advert successfully deleted');
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id='adverts' className={`${screenWidth <= 768 ? '' : '' }`}>
      <header className="top-header-container">
        <div className="header-text-wrapper">
        </div>
        <div className="data-wrapper d-flex justify-content-between align-items-center">
          <div className="all adverts-wrapper">
            <div className="icon-wrapper d-flex align-items-center">
              <i class="fa-regular fa-circle-check icon"></i>
            </div>
            <span className="text">Active</span>
            <div className="count-wrapper">
              <span className="count">{ userAds.length || 0 }</span>
            </div>
          </div>
        </div>
      </header>

      <div className="ads-container">
        { 
        isLoading ? <Loading /> 
          : !isLoading && hasError ? <Error /> 
          : 
          userAds
            .filter(ad => ad.quantity > 0)
            .map(ad => {
              return(
                <div key={ad.id} className="ad-wrapper">
                  <div className="img-container">
                    <div className="img-wrapper">
                      <img src={ad ? ad.images[0].secure_url : img } alt="product image" className="img" />
                    </div>
                  </div>
                  <div className="info-container px-3">
                    <span className='name'>{ad.name}</span>
                    <span className="price">{formatNaira(ad.price)}</span>
                    <span className="date">{convertDate(ad.createdAt).date}</span>
                  </div>

                  <div className="action-container">
                    <div className="action-wrapper delete">
                      <button onClick={() => deleteAdvert(ad.id)} className='btn'>
                        {/* <i class="fa-solid fa-trash-can icon"></i>  */}
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
        }
      </div>
    </section>
  )
}

export default UserAds