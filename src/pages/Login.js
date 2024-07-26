import React, { useEffect, useRef, useState } from 'react';
import './styles/register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { refresh } from '../utilities/utils';


const Login = () => {
  const { login, currentUser } = useAppContext();
  const [ isLoading, setIsLoading ] = useState(false)

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    await login({ email: emailRef.current.value, password: passwordRef.current.value })
    setIsLoading(false);
  }

  useEffect(() => {
    if(currentUser){
      return setTimeout(() => {
        navigate('/');
        refresh();
      }, 1000);      
    }
    
  }, [currentUser]);

  return (
    <section id='register'>
    <div className="register-wrapper">

      <form className='form-control' onSubmit={handleLogin}>
      <h6 className='create-account-text'>Login</h6>


        <div className="form-group">
          <input placeholder='Email' ref={emailRef} type="email" name="email" id="email" required />
        </div>
        <div className="form-group">
          <input placeholder='Password' ref={passwordRef} type="password" name="password" id="password" required />
        </div>
        <button disabled={isLoading} type="submit" className='submit-btn'> Login </button>

        <p className='login-text'>Don't have an account?<Link style={{paddingLeft: '5px'}} to='/register'>Register</Link></p>

      </form>
    </div>
  </section>
  )
}

export default Login;