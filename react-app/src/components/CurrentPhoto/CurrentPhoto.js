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
        dispatch(createComment(newComment))
        dispatch(fetchComments(photoId))
    }

    return (
        <div className="photo-page">
            <div className="photo-page-header">
                <div className="photo-page-header-left">
                    <div className="photo-page-header-left-photo-name">
                        <h1 className="photo-page-title">{photo?.title}</h1>
                        <img className="photo-page-photo" src={photo?.url} alt="photo" />
                        <h2 className="photo-page-author">By: {photo?.user?.first_name} {photo?.user?.last_name}</h2>
                        <h3 className="photo-page-description">Description: {photo?.description}</h3>
                        <div className="photo-page-container">
                            <div className="photo-page-container-left">
                                {/* <button onClick={() => history.push("/photos")}>Back to photos</button> */}
                                {(currentUser?.id === photo?.user?.id) ? (
                                    <div className="photo-page-container-right-edit">
                                        <EditPhotoModal photo={photo} />
                                        <div className="photo-page-container-right-delete">
                                            <button onClick={handleDelete}>Delete</button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="photo-page-comments-container">
                            <div className="photo-page-comments-left">
                                <div className="photo-page-comments-left-header">
                                    <h1>Comments</h1>
                                </div>
                                <div className="photo-page-comments-left-comments">
                                    <form className="enter-comment-form" onSubmit={handleSubmit} >
                                        <textarea
                                            rows="5"
                                            cols="40"
                                            placeholder="Write a comment"
                                            name="content"
                                            value={content}
                                            onChange={(e) => { setContent(e.target.value) }}
                                        />
                                    </form>
                                    <div className="post-button">
                                        <a href="#" onClick={handleSubmit} className="btn btn-white btn-animate">Post a comment</a>
                                    </div>
                                    < div className="photo-page-body-left-lyrics-comments" >
                                        {comments?.length === 0 ? (
                                            <h2>No comments to display</h2>
                                        ) : (
                                            comments?.map(comment => (
                                                <div className="photo-page-body-left-lyrics-comments-comment" key={comment.id}>
                                                    <div className="photo-page-body-left-lyrics-comments-comment-user">
                                                        <h2>{comment?.user?.first_name} {comment?.user?.last_name}:</h2>
                                                        <div className="photo-page-body-left-lyrics-comments-comment-body">
                                                            <h3>{comment?.content}</h3>
                                                            <div className="date-info"></div>
                                                            <h5>{comment?.createdAt}</h5>
                                                            {/* <h5>Editted on: {comment?.updatedAt}</h5> */}
                                                        </div>
                                                        {(currentUser?.id === comment?.user?.id) ? (
                                                            <div className="photo-page-body-left-lyrics-comments-comment-user-edit">
                                                                <EditCommentModal comment={comment} />
                                                                <button onClick={() => handleDeleteComment(comment?.id)}>Delete</button>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CurrentPhoto;
