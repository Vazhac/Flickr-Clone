import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { BiErrorCircle } from 'react-icons/bi';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  // set the email and password to the demo user

  const onDemoLogin = async (e) => {
    const demoEmail = 'test@test.com'
    const demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="page-container">
      <div className="log-in-form-container">
        <form className="log-in-form" onSubmit={onLogin}>
          <div className="log-in-form-elements">
            <h3>Photo-Pickr</h3>
            <div className='log-in-form-email'>
              <label htmlFor='email'>Email</label>
              <input
                className={`log-in-form-email-input`}
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
                required={true}
              />
            </div>
            <div className='log-in-form-password'>
              <label htmlFor='password'>Password</label>
              <input
                className={`log-in-form-password-input`}
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
                required={true}
              />
            </div>
            <div className="log-in-form-error-container">
              {errors.length > 0 &&
                <div className='log-in-form-error'>
                  <BiErrorCircle className='log-in-form-error-icon' />
                  <h5 className='log-in-form-error-message'>Unable to log in with provided credentials.</h5>
                </div>
              }
            </div>
            <div className="log-in-buttons-container">
              <div className="log-in-form-button-container">
                <button
                  className={`log-in-form-button`}
                  type='submit'
                >Sign In
                </button>
              </div>
              <div className="demo-user-button-container">
                <button className={`demo-user-button`} onClick={() => {
                  onDemoLogin();
                }}>Demo User
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
