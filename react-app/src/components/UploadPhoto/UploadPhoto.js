import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UploadPhoto.css';
import { createPhoto, fetchPhotos } from '../../store/photos'
import { useHistory } from "react-router-dom";

//ask for title and description and url for song
function UploadForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [album, setAlbum] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const photo = {
            title,
            description,
            url,
            userId: user.id
        }
        setErrors([]);
        if (title === "" || url === "") {
            setErrors(["Please fill out all required fields"]);
        } else {
            dispatch(createPhoto(photo))
            dispatch(fetchPhotos());
            setTitle("");
            setDescription("");
            setUrl("");
            return history.push("/photos");
        }
    };

    return (
        <div className="upload-form">
            <div className="new-upload-form-container">
                <h1>Upload a new photo</h1>
                <form className="new-upload-form" onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className="new-upload-form-page-container-errors">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    <div className="new-upload-form-elements">
                        <div className="new-upload-form-title">
                            <label htmlFor="title">Title</label>
                            <input
                                className="new-upload-form-title-input"
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="new-upload-form-description">
                            <label htmlFor="title">Description</label>
                            <input
                                className="new-upload-form-description-input"
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="new-upload-form-url">
                            <label htmlFor="url">URL</label>
                            <input
                                className="new-upload-form-url-input"
                                type="text"
                                name="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div className="new-upload-form-submit">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}



export default UploadForm;
