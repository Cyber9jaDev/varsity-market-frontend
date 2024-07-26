import React, { useEffect, useState } from 'react';
import './styles/register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { refresh } from '../utilities/utils';

const Register = () => {
  const { register, currentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await register({...formData});
    setIsLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  useEffect(() => {
    if(currentUser){
      setTimeout(() => {
        navigate('/');
        refresh();
      }, 1000);
    }
  }, [currentUser, navigate]);
  


  return (
    <section id='register'>
      <div className="register-wrapper">
        <form className='form-control' onSubmit={handleSubmit}>
          <h6 className='create-account-text'>Create an account</h6>
          
          <div className="form-group">
            <input placeholder='Name' onChange={handleChange} type="text" name="name" id="name" required />
          </div>
          <div className="form-group">
            <input placeholder='Email' onChange={handleChange} type="email" name="email" id="email" required />
          </div>
          <div className="form-group">
            <input placeholder='Phone number' onChange={handleChange} type="tel" name="phone" id="phone" required />
          </div>
          <div className="form-group">
            <input placeholder='Password' onChange={handleChange} type="password" name="password" id="password" required />
          </div>
          <div className="form-group">
            <input placeholder='Confirm password' onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" required />
          </div>
          <button disabled={isLoading} type="submit" className='submit-btn'> Create Account</button>
          
          
          <p className='login-text'>Already have an account?<Link style={{paddingLeft: '5px'}} to='/login'>Login</Link></p>
        
        </form>


      </div>
    </section>
  )
}

export default Register;