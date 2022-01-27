import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/SplashPage/SplashPage';
import AllPhotos from './components/AllPhotos/AllPhotos';
import Favorites from './components/Favorites/Favorites';
import CurrentPhoto from './components/CurrentPhoto/CurrentPhoto';
import NavBar from './components/NavBar/NavBar';
import UploadPhoto from './components/UploadPhoto/UploadPhoto';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { fetchPhotos } from './store/photos';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(fetchPhotos());
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
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/upload' exact={true} >
          <UploadPhoto />
        </ProtectedRoute>
        <ProtectedRoute path='/photos' exact={true}>
          <AllPhotos />
        </ProtectedRoute>
        <ProtectedRoute path='/favorites' exact={true}>
          <Favorites />
        </ProtectedRoute>
        <ProtectedRoute path='/photos/:id' exact={true}>
          <CurrentPhoto />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true}>
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
