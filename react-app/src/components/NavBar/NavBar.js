
import { useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
// import UploadAlbumModal from '../UploadAlbumModal';
// import SearchBar from '../SearchBar/SearchBar';
import {MdCloudUpload} from 'react-icons/md';
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
                  <NavLink className='sign-up-navbar-link' to='/' exact={true} activeClassName='active'>
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
            <div className='user-actions-container'>
              <div className="user-actions-left">
                {/* <NavLink to='/' className="home-button" exact={true} activeClassName='active'>Home</NavLink> */}
                <NavLink to='/photos' className="photos-button" exact={true} activeClassName='active'>Photos</NavLink>
              </div>
              <div className="user-actions-right">
                {/* <NavLink to='/upload' className="upload-button" exact={true} activeClassName='active'> */}
                <NavLink to='/upload' exact={true} activeClassName='active'>
                  <MdCloudUpload className="upload-button-icon" />
                </NavLink>
                <NavLink to='/profile' className="profile-button" exact={true} activeClassName='active'>Profile</NavLink>
                <LogoutButton className="logout-button"/>
              </div>
            </div>
        }
      </nav>
    );
  }
}

export default NavBar;
