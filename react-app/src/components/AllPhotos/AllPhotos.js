import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPhotos } from "../../store/photos"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import './AllPhotos.css'

const AllPhotos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    // scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="all-photos-page-container">
            <div className="all-photos-page-title-container">
                <h1 className="all-photos-page-title">All Photos</h1>
            </div>
            <div className="all-photos-page-photos-container">
                {/* if there are no photos, create h2 saying 'No photos to display, otherwise map 5 photos per row */}
                {photos.length === 0 ? (
                    <h2 className="all-photos-page-no-photos-message">
                        No photos to display
                    </h2>
                ) : (
                    <div className="all-photos-gallery">
                        {photos.map(photo => (
                            <div className="all-photos-page-photo-container">
                                <NavLink
                                    to={`/photos/${photo.id}`}
                                    className="all-photos-page-photo-link"
                                >
                                    <img
                                        className="all-photos-page-photo"
                                        src={photo.url}
                                        alt={photo.title}
                                    />
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}
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
    );
};

export default AllPhotos;
