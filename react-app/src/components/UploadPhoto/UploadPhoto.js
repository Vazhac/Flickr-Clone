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
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const photo = {
            title,
            description,
            image,
            userId: user.id
        }
        setErrors([]);
        if (title === "" || image === "") {
            setErrors(["Please fill out all required fields"]);
        } else {
            dispatch(createPhoto(photo))
            dispatch(fetchPhotos());
            setTitle("");
            setDescription("");
            setImage("");
            return history.push("/photos");
        }
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

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
                            <label htmlFor="url">Select a file</label>
                            <input
                                className="new-upload-form-url-input"
                                type="file"
                                accept="image/*"
                                onChange={updateImage}
                                required={true}
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
