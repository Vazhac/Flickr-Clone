import React from 'react'
import './SplashPage.css'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Dashboard from '../Dashboard/Dashboard'
import AllPhotos from '../AllPhotos/AllPhotos'
import { useSelector } from 'react-redux';

const SplashPage = () => {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return (
            <div className='top-level'>
                <div className='splash-page-container'>
                    <div className='splash-page-backgrounds'>
                        <div className='splash-page-background-1'></div>
                        <div className='splash-page-background-2'></div>
                        <div className='splash-page-background-3'></div>
                        <div className='splash-page-background-4'></div>
                        <div className='splash-page-background-5'></div>
                        <div className='splash-page-background-6'></div>
                        <div className='splash-page-background-7'></div>
                        <div className='splash-page-background-8'></div>
                        <div className='splash-page-background-9'></div>
                        <div className='splash-page-background-10'></div>
                    </div>
                    <div className='splash-page'>
                        <div className='splash-page-info'>
                            <h1 className="splash-page-title">Find your inspiration.</h1>
                            <h2 className="splash-page-subtitle">Join the PhotoPickr community, home to tens of billions of photos and 2 million groups.</h2>
                            <div className="splash-page-center-button-container">
                                <a href='/sign-up'><button className='splash-page-center-button'>Start for free</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-contact-info">
                    <div className="github-repo">
                        <AiFillGithub className="github-logo"/><a href="https://github.com/Vazhac/PhotoPickr">Github Repo</a>
                    </div>
                    <div className="github-links">
                        <div className="Link"><AiFillGithub className="github-logo"/><a href="https://github.com/Vazhac">Vazha Chiaberashvili</a></div>
                    </div>
                    <div className="linkedIn-links">
                        <div className="Link"><AiFillLinkedin className="github-logo"/><a href="https://www.linkedin.com/in/vazha-chiaberashvili/">Vazha Chiaberashvili</a></div>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            // <Dashboard />
            <AllPhotos />
        )
    }
}

export default SplashPage;
