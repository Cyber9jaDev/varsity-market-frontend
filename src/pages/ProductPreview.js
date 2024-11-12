import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/product-preview.scss';
import moment from 'moment';
import ProductService from '../services/ProductService';
import Loading from '../components/Loading'
import Error from '../components/Error'
import schools from '../utilities/schools';
import ChatService from '../services/ChatService';
import { useAppContext } from '../contexts/AppContext';
import { HIDE_CHAT_BOX, SET_CURRENT_CHAT } from '../contexts/Actions';
import ProductDetails from '../components/ProductDetails';
import ContactSeller from '../components/ContactSeller';
import PriceBox from '../components/PriceBox';


const ProductPreview = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { dispatch, currentUser } = useAppContext();
  const navigate = useNavigate();


  const findSchool = (value) => {
    const school = schools.find(school => school.value === value);
    if (school) {
      return school.label
    }
    return 'University of Ibadan';
  }

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const { data } = await ProductService.ProductPreview(id);
        setProduct(data);
        setImages(data.images);
      }
      catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    }

    getProduct();

  }, [id]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (currentIndex === images.length - 1) setCurrentIndex(0)
      else setCurrentIndex(current => current + 1);
    }, 5000);

    return () => clearInterval(timerId);

  }, [currentIndex, images.length]);

  const getSecondParticipantId = (participants) => {
    const participant = participants.find(participant => participant.participantId !== currentUser.id);
    return participant.participantId;
  }

  const openChatModal = async () => {
    // Ensure user cannot initiate a chat with their advert
    if (product === null || currentUser.id === product.sellerId) { return }

    try {
      const { data: chat } = await ChatService.initiateChat({
        user1: currentUser.id,
        user2: product?.sellerId
      });

      if (chat) {
        const second_participant_id = getSecondParticipantId(chat?.participants);

        localStorage.setItem('currentChat', JSON.stringify(chat));

        dispatch({
          type: SET_CURRENT_CHAT,
          payload: { chat, receiverId: second_participant_id }
        });

        const { data: secondUserData } = await ChatService.secondChatParticipant(second_participant_id);
        localStorage.setItem('secondUserData', JSON.stringify(secondUserData));
        localStorage.setItem('hideChatBox', JSON.stringify(false));
        dispatch({ type: HIDE_CHAT_BOX, payload: { value: false } });
        navigate('/chat');
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <section id="product-preview">
      {isLoading ? <Loading /> : !isLoading && hasError === true ? <Error /> :
        <div className="container product-preview-wrapper border">
          <div className="left">
            <div className="container product-wrapper">

              <div className="address-container">
                <div>
                  <i className="fa-solid fa-location-dot location-icon"></i>
                </div>
                {product.location && <p className="city">{findSchool(product.location)}</p>}
                <div className="v-bar"></div>
                {product.createdAt && <p className="date">{moment(product.createdAt).format('dddd, Do MMM YYYY')}</p>}
              </div>

              <div className="image-block">
                <div className="icon-container icon-left-container">
                  <i onClick={() => setCurrentIndex(current => currentIndex === 0 ? current : current - 1)} className="fa-solid fa-circle-chevron-left icon"></i>
                </div>

                <div className="lg-product-img-wrapper">
                  <div className="lg-product-img-container">
                    <img className='lg-product-img' src={!isLoading && images[currentIndex].secure_url} alt="product-lg-img" />
                  </div>
                </div>

                <div className="icon-container icon-right-container">
                  <i onClick={() => setCurrentIndex(current => currentIndex === images.length - 1 ? current : current + 1)} className="fa-solid fa-circle-chevron-right icon"></i>
                </div>
              </div>

              <div className="sm-product-img-wrapper mb-3">
                {images?.map((image, index) => {
                  return (
                    <div key={index} className="sm-product-img-container">
                      <img onMouseEnter={() => setCurrentIndex(index)} className='sm-product-img' src={image.secure_url} alt="product-sm-img" />
                    </div>
                  )
                })}
              </div>
              <ProductDetails product={product} />
            </div>
          </div>

          <div className="right">
            <PriceBox product={product} />
            <ContactSeller openChatModal={openChatModal} />
          </div>
        </div>
      }
    </section>
  );
}

export default ProductPreview;