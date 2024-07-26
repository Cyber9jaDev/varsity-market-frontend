import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-range-slider-input/dist/style.css';
import { AppProvider } from './contexts/AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <App />
    </AppProvider>
);