// profile page component that displays the user's profile
// and allows them to edit their profile information

import React from 'react';
import { useSelector } from 'react-redux';
import { fetchPhotos } from "../../store/photos"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import EditUserModal from '../EditUserModal';
import './ProfilePage.css';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos.photos);
    const userPhotos = photos.filter(photo => photo.user_id === user?.id);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);


    return (
        <div className="profile-page">
            <div className="profile-page-container">
                <div className="profile-page-header">
                    <h1>Profile</h1>
                </div>
                <div className="profile-page-body">
                    <div className="profile-page-body-container">
                        <div className="profile-page-body-container-left">
                            <div className="profile-page-body-container-left-body">
                                <div className="profile-page-body-container-left-body-container">
                                    <div className="profile-page-body-container-left-body-container">
                                        <h3>Email: {user.email}</h3>
                                    </div>
                                </div>
                                <div className="profile-page-body-container-left-body-container">
                                    <div className="profile-page-body-container-left-body-container">
                                        <h3>First Name: {user.first_name}</h3>
                                    </div>
                                </div>
                                <div className="profile-page-body-container-left-body-container">
                                    <div className="profile-page-body-container-left-body-container">
                                        <h3>Last Name: {user.last_name}</h3>
                                    </div>
                                </div>
                                <div className="profile-page-body-container-left-body-container">
                                    <div className="profile-page-body-container-left-body-container">
                                        <h3>Total Photos: {userPhotos.length}</h3>
                                    </div>
                                </div>
                                {/* <div className="profile-page-body-container-left-body-container">
                                    <div className="profile-page-body-container-left-body-container-left">
                                        <h3>Edit User Information: </h3>
                                    </div>
                                    <div className="profile-page-body-container-left-body-container-right">
                                        <EditUserModal user={user} />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="profile-page-body-container-right">
                            <div className="profile-page-body-container-right-header">
                                <h2>Your Photos</h2>
                            </div>
                            <div className="profile-page-body-container-right-body">
                                {userPhotos.map(photo => {
                                    return (
                                        <div className="profile-page-body-container-right-body-container">
                                            <a className="profile-photo-link" href={`/photos/${photo.id}`}>
                                                <h3 className="profile-title">{photo.title}</h3>
                                                <img className="profile-photo" src={photo.url} alt="user-content" />
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

    export default ProfilePage;
