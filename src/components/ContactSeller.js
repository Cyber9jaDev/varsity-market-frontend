const ContactSeller = ({ openChatModal }) => {
  return (
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
  )

}

export default ContactSeller