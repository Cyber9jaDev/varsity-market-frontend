import React from 'react';
import './styles/WhyWeAreUnique.scss';


const WhyWeAreUnique = () => {
  return (
    <section className='why-we-are-unique'>
      <h4>What makes us unique</h4>
      <p>We are dedicated to give that effortless platform where only student RULES. <br /> Student, student and ONLY student.</p>
      <div className='mt-5 container unique-details'>
        <div className="details-wrapper">
          <i className="fa fa-solid fa-briefcase icon-1"></i>
          <h4 className='my-3'>Make deals within your campus</h4>
          <span className='text-center'>You don't need to go far from your college campus.</span>
        </div>
        <div className="details-wrapper">
          <i className="fa fa-solid fa-handshake icon-2"></i>
          <h4 className='my-3'>Trusted Purchase</h4>
          <span className='text-center'>Awesome! You are dealing with your college mate or any other near you.</span>
        </div>
        <div className="details-wrapper">
          <i className="fa fa-solid fa-boxes-stacked icon-3"></i>
          <h4 className='my-3'>Multiple Products in a Single Ad.</h4>
          <span className='text-center'>You have books, notes, stationery, bikes to sell. Don't worry you can add these all items in a Single Ad.</span>
        </div>
        
      </div>
      
    </section>
  )
}

export default WhyWeAreUnique