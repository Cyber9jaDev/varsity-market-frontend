import React, { useEffect, useState } from 'react';
import './styles/register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { refresh } from '../utilities/utils';
import { BankList } from '../utilities/banks';

const Register = () => {
  const { register, currentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: "BUYER",
    accountNumber: null,
    bankCode: null,
    businessName: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await register({ ...formData });
    setIsLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({...prevFormData, [name]: value }));
  }

  useEffect(() => {
    if (currentUser) {
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
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Name' onChange={handleChange} type="text" name="name" id="name" required />
              </div>
              <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Email' onChange={handleChange} type="email" name="email" id="email" required />
              </div>
              <div className="col-lg-6 col-sm-12 my-3">
                <select onChange={handleChange} defaultValue="BUYER" name="userType" id="userType">
                  <option value="BUYER">Buyer</option>
                  <option value="SELLER">Seller</option>
                </select>
              </div>
              <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Phone number (8062128170)' onChange={handleChange} type="tel" name="phone" id="phone" required />
              </div>
              {formData.userType === "SELLER" && <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Account number' onChange={handleChange} type="text" name="accountNumber" id="accountNumber" required />
              </div>}
              {formData.userType === "SELLER" && <div className="col-lg-6 col-sm-12 my-3">
                <select onChange={handleChange} defaultValue="044" name="bankCode" id="bankCode">
                  {BankList.map(bank => <option value={bank.code} key={bank.slug}>{bank.name}</option>)}
                </select>
              </div>}
              {formData.userType === "SELLER" && <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Business name e.g Arike pre-order' onChange={handleChange} type="text" name="businessName" id="businessName" required />
              </div>}
              <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Password' onChange={handleChange} type="password" name="password" id="password" required />
              </div>
              <div className="col-lg-6 col-sm-12 my-3">
                <input placeholder='Confirm password' onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" required />
              </div>
            </div>
          </div>

          <button disabled={isLoading} type="submit" className='submit-btn'> Create Account</button>

          <p className='login-text'>Already have an account?<Link style={{ paddingLeft: '5px' }} to='/login'>Login</Link></p>

        </form>


      </div>
    </section>
  )
}

export default Register;