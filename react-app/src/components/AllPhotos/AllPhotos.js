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
            <h1>All Photos</h1>
            <div className="all-photos-page-content">
                <div className="all-photos-page-photo-container">
                    {photos?.length === 0 ? (
                        <h2>No photos to display</h2>
                    ) : (
                        photos?.map(photo => (
                            <div className="all-photos-page-photos">
                                <NavLink to={`/photos/${photo.id}`}>
                                    <img
                                        className="all-photos-page-photo"
                                        src={photo.url}
                                        alt={photo.title}
                                    />
                                </NavLink>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPhotos;
