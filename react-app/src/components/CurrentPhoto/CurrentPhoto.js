import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./CurrentPhoto.css"
import { fetchPhoto, deletePhoto } from '../../store/photos'
import { createComment, fetchComments, deleteComment } from '../../store/comments'
import EditPhotoModal from '../EditPhotoModal'
import EditCommentModal from '../EditCommentModal'

const CurrentPhoto = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const photoId = parseInt(id)
    const [content, setContent] = useState('')
    const photo = useSelector(state => state.photos?.photo)
    const comments = useSelector(state => state.comments?.comments)
    const currentUser = useSelector(state => state.session?.user)
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(fetchPhoto(photoId))
        dispatch(fetchComments(photoId))
    }, [dispatch, photoId])

    const handleDelete = () => {
        dispatch(deletePhoto(photoId))
        history.push('/photos')
    }

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(photoId, commentId))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newComment = {
            content: content,
            photo_id: photoId,
            user_id: currentUser.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        // if content is empty, return error
        if (content.length === 0) {
            setErrors(["Comment can't be empty"])
        } else {
            setContent('')
            dispatch(createComment(newComment))
            dispatch(fetchComments(photoId))
        }
        // set content to empty string
    }

    return (
        <div className="photo-page">
                <div className="photo-page-container">
                    <img className="photo-page-photo" src={photo?.url} alt="photo" />
                    <div className="photo-page-info-and-photo-controls">
                        <h1 className="photo-page-title">Title: {photo?.title}</h1>
                        <h3 className="photo-page-author">By: {photo?.user?.first_name} {photo?.user?.last_name}</h3>
                        <h3 className="photo-page-description">Description: {photo?.description ? photo?.description : 'None'}</h3>
                        <div className="photo-page-controls-container">
                            <div className="photo-page-controls">
                                <div className="photo-page-back-button-container">
                                    <button className="photo-page-back-button" onClick={() => history.push("/photos")}>Back</button>
                                </div>
                            {(currentUser?.id === photo?.user?.id) ? (
                                <div className="photo-page-controls-optional">
                                    <div>
                                        <EditPhotoModal photo={photo} />
                                    </div>
                                    <div>
                                        <button className="photo-page-delete-photo-button" onClick={handleDelete}>Delete</button>
                                    </div>
                                </div>
                            ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photo-page-comment-title-and-input-form-container">
                    <div className="photo-page-comment-title-and-input-form">
                        <div className="photo-page-comments-title-container">
                            <h1 className="photo-page-comments-title">Comments</h1>
                        </div>
                        <div className="comment-errors">
                            {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className="photo-page-comment-input-container">
                            <form className="photo-page-comment-input" onSubmit={handleSubmit} >
                                <textarea
                                    className="enter-comment-textarea"
                                    rows="5"
                                    cols="60"
                                    placeholder="Write a comment"
                                    name="content"
                                    value={content}
                                    // limit the amount of characters to 255
                                    onChange={e => setContent(e.target.value.slice(0, 255))}
                                />
                            </form>
                        </div>
                        <div className="post-button-outer-container">
                            <div className="post-button-inner-container">
                                <button href="#" onClick={handleSubmit} className="post-button">Post a comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                < div className="photo-page-comments-body-container" >
                    <div className="photo-page-comments-body">
                    {comments?.length === 0 ? (
                        <h2 className="photo-page-comments-subtitle">No comments to display</h2>
                    ) : (
                        comments?.map(comment => (
                            <div className="photo-page-comment-container" key={comment.id}>
                                <div className="photo-page-comment">
                                    <div className="photo-page-comment-user-and-body">
                                        <div className="photo-page-comment-user-container">
                                            <p className="photo-page-comment-user">{comment?.user?.first_name} {comment?.user?.last_name}:</p>
                                        </div>
                                        <div className="photo-page-comment-body-container">
                                            <p className="photo-page-comment-body">{comment?.content}</p>
                                        </div>
                                    </div>
                                    <div className="date-info-and-comment-controls">
                                        <div className="date-info-container">
                                            <h5 classNAme="date-info-createdAt">Posted On: {comment?.createdAt}</h5>
                                        </div>
                                        {(currentUser?.id === comment?.user?.id) ? (
                                                <div className="photo-page-comment-controls">
                                                    <EditCommentModal comment={comment} />
                                                    <button className="delete-comment-button" onClick={() => handleDeleteComment(comment?.id)}>Delete</button>
                                                </div>
                                            ) : null}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    </div>
                </div>

        </div>
    );
}
export default CurrentPhoto;
