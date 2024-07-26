import React from 'react';
import ReactLoading from 'react-loading';
import './styles/loading.scss';


const Loading = () => {
  return (
    <section id="loading">
      <div className="loading-container">
        <ReactLoading color='rgb(6, 129, 243)' height={'20%'} width={'20%'} />
      </div>
    </section>
  );
}

export default Loading