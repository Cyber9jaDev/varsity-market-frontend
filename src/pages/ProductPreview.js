import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import formatNaira from "format-to-naira";
import './styles/product-preview.scss';
import moment from 'moment';
import ProductService from '../services/ProductService';
import Loading from '../components/Loading'
import Error from '../components/Error'
import schools from '../utilities/schools';
import ChatService from '../services/ChatService';
import { useAppContext } from '../contexts/AppContext';
import { HIDE_CHAT_BOX, SET_CURRENT_CHAT } from '../contexts/Actions';
import axios from 'axios';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const ProductPreview = () => {
  const { category, id } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ product, setProduct ] = useState(null);
  const [ hasError, setHasError ] = useState(false);
  const [ images, setImages ] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { dispatch } =  useAppContext();
  const navigate = useNavigate();

  const findSchool = (value) => {
    const school = schools.find(school => school.value === value );
    if(school){
      return school.label
    }
    return 'University of Ibadan';
  }

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setHasError(false)
      try {
        const { data } = await ProductService.ProductPreview(category, id);
        setProduct(data);
        setImages(data.images);
      } 
      catch (error) { 
        setHasError(true) } 
        setIsLoading(false);
    }

    getProduct();

  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      if(currentIndex === images.length - 1) setCurrentIndex(0)  
      else setCurrentIndex(current => current + 1);
    }, 5000);

    return () => clearInterval(timerId);
    
  }, [currentIndex, images.length]);

  const getSecondUserId = (users) => {
    const secondUserId = users.find(id => id !== currentUser.userId);
    return secondUserId;
  }

  const openChatModal = async () => {
    console.log(product);
    // Ensure user cannot initiate a chat with their advert
    if( product === null || currentUser.userId === product.sellerId){ return }
    
    try {
      const { data:chat } = await ChatService.initiateChat({ firstUser:currentUser.userId, secondUser: product?.sellerId});
      if(chat){
        const secondUserId = getSecondUserId(chat?.users);
        localStorage.setItem('currentChat', JSON.stringify(chat));
        dispatch({ type: SET_CURRENT_CHAT, payload: { chat, receiverId: secondUserId }});
        // const { data:secondUserData } = await UsersService.getUser(secondUserId);
        const { data:secondUserData } = await axios.get(`http://localhost:3000/api/user/${secondUserId}`);
        localStorage.setItem('secondUserData', JSON.stringify(secondUserData));
        localStorage.setItem('hideChatBox', JSON.stringify(false));
        dispatch({ type: HIDE_CHAT_BOX, payload: {value: false}});
        navigate('/chat');
      }
    } catch (error) {
        return error;
    }
  }
  
  return ( 
    <section id="product-preview">
      { isLoading ? <Loading /> : !isLoading && hasError === true ? <Error /> : 
        <div className="container product-preview-wrapper border">
        <div className="left">
          <div className="container product-wrapper">
              
              <div className="address-container">
                <i className="fa-solid fa-location-dot location-icon"></i>
                {product.city && <p className="city">{product.city}</p>}
                <div className="v-bar"></div>
                {product.createdAt && <p className="date">{moment(product.createdAt).format('dddd, Do MMM YYYY')}</p>}
              </div>

              <div className="image-block">
                <div className="icon-container icon-left-container">
                  <i onClick={() => setCurrentIndex(current => currentIndex === 0 ? current : current - 1)} className="fa-solid fa-circle-chevron-left icon"></i>
                </div>

                <div className="lg-product-img-wrapper">
                  <div className="lg-product-img-container">
                    <img className='lg-product-img' src={!isLoading && images[currentIndex].url} alt="product-lg-img" />
                  </div>
                </div>

                <div className="icon-container icon-right-container">
                  <i onClick={() => setCurrentIndex( current => currentIndex === images.length - 1 ? current : current + 1 ) } className="fa-solid fa-circle-chevron-right icon"></i>
                </div>
              </div>

              <div className="sm-product-img-wrapper mb-3">
                { images?.map((image, index) => {
                    return(
                      <div key={index} className="sm-product-img-container">
                        <img onMouseEnter={() => setCurrentIndex(index)} className='sm-product-img' src={image.url} alt="product-sm-img" />
                      </div>
                    )
                })}
              </div>
              
              { product.name && 
                <details open={true} className="name-container">
                  <summary className='name-text fs-5'>Product</summary>
                  <p className="name">{product.name}</p>
                </details> 
              }

              { product.description && 
                <details open={true} className="description-container">
                  <summary className='email-text fs-5'>Seller Email</summary>
                  <p className="email">{product.sellerEmail}</p>
                </details> 
              }
              { product.description && 
                <details open={true} className="description-container">
                  <summary className='description-text fs-5'>Description</summary>
                  <p className="description">{product.description}</p>
                </details> 
              }

              { product.school && 
                <details open={true} className="school-container">
                  <summary className='school-text  fs-5'>School</summary>
                  <p className="school">{findSchool(product.school)}</p>
                </details> 
              }
              
          </div>
        </div>

        <div className="right">
          <div className="price-box-container">
            <div className="clip"> </div>
            <div className="price-box">
              
              {product.price && <div className='box-row'>
                  <p className="price-text">Price</p>
                  <p className="price">{formatNaira(product.price)}</p>
                </div>
              }
              {product.condition && <div className='box-row'>
                  <p className="condition-text">Condition</p>
                  <p className="condition">{product.condition}</p>
                </div>
              }
            </div>
          </div>
          <div className="ad-block">
            <h5>Interested in this ad?</h5>
            <p className='contact-text'>Contact the seller!</p>
            <div className="contact-details-container">
              <a href='tel:08062128170' className="contact-details">
                <div className="phone-icon-container">
                  <i className="fa-solid fa-phone-flip phone-icon"></i>
                </div>
                <span className='call-text'>Call</span>
              </a>
              <span onClick={openChatModal} className="contact-details">
                <div className="message-icon-container">
                <i className="fa-solid fa-message message-icon"></i>
                </div>
                <span className='chat-text'>Chat</span>
              </span>
            </div>
          </div>
        </div>
      </div>   
      }         
    </section>
  );
}

export default ProductPreview;