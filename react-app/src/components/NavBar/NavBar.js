
import { useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
// import UploadAlbumModal from '../UploadAlbumModal';
// import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css'

const NavBar = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/sign-up';

  const session = useSelector(state => state.session);

  if (isLoginPage || isSignUpPage) {
    return null
  } else {
    return (
      <nav className="nav-outer-container">
        {
          !session.user ?
            (
              <>
                <div className="user-actions-container">
                  <NavLink to='/' exact={true} activeClassName='active'>
                  PHOTOPICKR
                  </NavLink>
                  <div className="user-actions-right">
                    <div className="user-actions-right-login">
                      <NavLink className="login-button" to='/login' exact={true} activeClassName='active'>
                        Login
                      </NavLink>
                    </div>
                    <div className="user-actions-right-signup">
                      <button className="sign-up-button" onClick={() => window.location.href = '/sign-up'}>
                        Sign Up
                      </button>
                      </div>
                  </div>
                </div>
              </>
            )
            :
            <div className='nav-content-container'>
              <NavLink to='/' className="home-button" exact={true} activeClassName='active'>Home</NavLink>
              <NavLink to='/photos' className="photos-button" exact={true} activeClassName='active'>Photos</NavLink>
              <NavLink to='/upload' className="upload-button" exact={true} activeClassName='active'>Upload</NavLink>
              {/* <SearchBar /> */}
              {/* <UploadAlbumModal /> */}
              <LogoutButton />
            </div>
        }
      </nav>
    );
  }
}

export default NavBar;
