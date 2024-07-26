import React from 'react';
import './styles/empty.scss';

const Empty = () => {
  return (
    <section id='empty'>
      <div className="empty-container">
        <div className="bg-img-wrapper"></div>
        <h2 className='text-center'>No Items Found</h2>
        <p className='text-center'>We can't find any item matching your search.</p>
      </div>
    </section>
  )
}

export default Empty;