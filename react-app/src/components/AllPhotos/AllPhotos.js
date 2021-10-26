import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPhotos } from "../../store/photos"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import './AllPhotos.css'

const AllPhotos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

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
        </div>
    );
};

export default AllPhotos;
