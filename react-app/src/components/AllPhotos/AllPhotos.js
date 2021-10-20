import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPhotos } from "../../store/photos";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import './AllPhotos.css'


export default function AllPhotos() {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch])

    return (
        <div className="all-photos-page-container">
            <h1>All Photos</h1>
            <div className="all-photos-page-content">
                <div className="all-photos-page-photos">
                    {photos?.length === 0 ? (
                        <h2>No photos to display</h2>
                    ) : (
                        photos?.map(photo => (
                            <NavLink to={`/photos/${photo.id}`}>
                                <div className="photo-container" key={photo.id}>
                                    <img src={photo.url} alt={photo.title} />
                                    <h3>{photo.title}</h3>
                                </div>
                            </NavLink>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
