import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
      const data = await dispatch(signUp(firstName, lastName, email, password));
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
    <form className="sign-up-form" onSubmit={onSignUp}>
      <div className="sign-up-first-name-container">
        <input className="sign-up-first-name-input"
          type='text'
          name='first-name'
          placeholder='First Name'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div className="sign-up-last-name-container">
        <input className="sign-up-last-name-input"
          type='text'
          name='last-name'
          placeholder='Last Name'
          onChange={updateLastName}
          value={lastName}
        ></input>
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
          <div className="already-started-container">
            <span className="already-started-text">Already started?</span>
            <br></br>
            <span className="already-started-text">
              <a href='/login' className="already-started-link">Log in to complete your application</a>
            </span>
          </div>
        </div>
      </div>
      <div className="sign-up-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
    </form>
  );
};

export default SignUpForm;
