import React from 'react'
// import './SplashPage.css'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Dashboard from '../Dashboard/Dashboard'
import { useSelector } from 'react-redux';

const SplashPage = () => {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return (
            <div className='top-level'>
                <div className='splash-page-container'>
                    <div className='splash-page-text'>
                        <h1>This is the Splash Page</h1>
                        <div className='splash-page-icons'>
                        </div>
                    </div>
                </div>
                <div className="footer-contact-info">
                    <div className="github-repo">
                        <AiFillGithub /><a href="https://github.com/Vazhac/PhotoPickr">Github Repo</a>
                    </div>
                    <div className="github-links">
                        <div className="Link"><AiFillGithub /><a href="https://github.com/Vazhac">Vazha Chiaberashvili</a></div>
                    </div>
                    <div className="linkedIn-links">
                        <div className="Link"><AiFillLinkedin /><a href="https://www.linkedin.com/in/vazha-chiaberashvili/">Vazha Chiaberashvili</a></div>
                    </div>

                </div>

            </div>
        )
    } else {
        return (
            <Dashboard />
        )
    }
}

export default SplashPage;
