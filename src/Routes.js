import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PostAd from './pages/PostAd';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProductPreview from './pages/ProductPreview';
import SharedLayout from './pages/SharedLayout';
import PrivateRoute from './pages/PrivateRoute';
import Product from './pages/Product';
import Chat from './pages/Chat';
import About from './pages/About';
import Checkout from './pages/Checkout';

const RouterLinks = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<SharedLayout/>}>
          <Route index element={<Homepage/>} />
          <Route path='about-us' exact element={ <About/> }/>
          <Route exact path='profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path=':category/:id' exact element={<ProductPreview/>}/>
          <Route path='products' exact element={<PrivateRoute> <Product/></PrivateRoute> }/>
        </Route>
        <Route path='/register' exact element={ <Register/> }/>
        <Route path='/login' exact element={ <Login/> }/>
        <Route path='/post-ad' exact element={ <PrivateRoute> <PostAd/> </PrivateRoute> } />
        <Route path='/chat' exact element={<PrivateRoute> <Chat/></PrivateRoute> }/>
        <Route path='/checkout' exact element={<PrivateRoute> <Checkout/></PrivateRoute> }/>

      </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterLinks;