import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
    } else {
      const data = ["Passwords: Passwords must match"]
      setErrors(data)
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='top-level'>
      <div className='sign-up-page-background-1'>
        <div className='sign-up-navbar-outer'>
          <div className='sign-up-navbar-inner'>
            <a href='/' className='sign-up-navbar-link'>PHOTOPICKR</a>
          </div>
        </div>
        <div className='sign-up-page-container'>
          <div className="sign-up-form-container">
            <div className="sign-up-form-header">
              {/* <svg className="sign-up-form-header-logo" viewBox="0 0 100 100"/> */}
              <h6 className="sign-up-form-header-title">Sign up for PhotoPickr</h6>
            </div>
            <form className="sign-up-form" onSubmit={onSignUp}>
              <div className="sign-up-form-first-name-container">
                <div className="sign-up-form-first-name">
                  <input className="sign-up-first-name-input"
                    type='text'
                    name='first-name'
                    placeholder='First Name'
                    onChange={updateFirstName}
                    value={firstName}
                    required={true}
                  ></input>
                </div>
              </div>
              <div className="sign-up-form-last-name-container">
                <div className="sign-up-form-last-name">
                  <input className="sign-up-last-name-input"
                    type='text'
                    name='last-name'
                    placeholder='Last Name'
                    onChange={updateLastName}
                    value={lastName}
                    required={true}
                  ></input>
                </div>
              </div>
              <div className="sign-up-form-email-container">
                <div className="sign-up-form-email">
                  <input
                    className="sign-up-email-input"
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={updateEmail}
                    value={email}
                    required={true}
                    ></input>
                </div>
              </div>
              <div className="sign-up-form-password-container">
                <div className="sign-up-form-password">
                  <input
                    className="sign-up-password-input"
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={updatePassword}
                    value={password}
                    required={true}
                    ></input>
                </div>
              </div>
              <div className="sign-up-form-confirm-password-container">
                <div className="sign-up-form-confirm-password">
                  <input
                    className="sign-up-confirm-password-input"
                    type='password'
                    name='repeat_password'
                    placeholder='Repeat Password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                    ></input>
                </div>
              </div>
              <div className="sign-up-form-button-outer-container">
                <div className="sign-up-form-button-inner-container">
                  <div className={`sign-up-form-button-container`}>
                    <button className={`sign-up-form-button`} type='submit'>
                      <span className="sign-up-form-button-inner-container">
                        <span className="sign-up-form-button-inner">
                          <span className="sign-up-form-button-label">Continue</span>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="sign-up-errors">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                  ))}
              </div>
              <div className="already-started-container">
                <span className="already-started-text">Already a PhotoPickr member?</span>
                <br></br>
                <span className="already-started-text">
                  <a href='/login' className="already-started-link">Log in here.</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
