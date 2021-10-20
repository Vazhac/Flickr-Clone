import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/SplashPage/SplashPage';
import AllPhotos from './components/AllPhotos/AllPhotos';
import NavBar from './components/NavBar/NavBar';
import UploadPhoto from './components/UploadPhoto/UploadPhoto';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/upload' exact={true} >
          <UploadPhoto />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <ProtectedRoute path='/photos'>
          <AllPhotos />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
