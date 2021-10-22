import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditPhoto.css';
import { fetchPhoto, editPhoto } from '../../store/photos'
import { useHistory } from "react-router-dom";

//ask for title and description and url for song
function EditForm({ photo, setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const id = photo?.id;
    const [title, setTitle] = useState(photo?.title);
    const [description, setDescription] = useState(photo?.description);
    const [url, setUrl] = useState(photo?.url);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const photo = {
            title,
            description,
            url,
            id,
            userId: sessionUser.id
        }
        setErrors([]);
        if (title === "" || url === "") {
            setErrors(["Please fill out all required fields"]);
        } else {
            dispatch(editPhoto(photo))
            setTitle(photo.title);
            setDescription(photo.description);
            setUrl(photo.url);
            dispatch(fetchPhoto(id))
            setShowModal(false);
            return history.push(`/photos/${photo.id}`);
        }
    };

    return (
        <div className="edit-form-page-container">
            <h1>Edit your photo</h1>
            <form className="edit-form" onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul className="edit-form-page-container-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )}
                <div className="edit-form-elements">
                    <div className="edit-form-elements-title">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="edit-form-elements-title">
                        <label htmlFor="title">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="edit-form-elements-url">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="edit-form-submit">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}



export default EditForm;
