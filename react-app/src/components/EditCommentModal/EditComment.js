import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditComment.css';
import { editComment, fetchComment } from '../../store/comments'
import { useParams, useHistory } from "react-router-dom";

//ask for title and description and url for comment
function EditComment({comment, setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const photoId = parseInt(id);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  // useEffect(() => {
  //   dispatch(fetchComment(comment));
  // }, [dispatch, comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedComment = {
      photo_id: photoId,
      content: content,
      id: comment?.id,
      userId: sessionUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setErrors([]);
    if (content === "") {
      setErrors(["Please fill out all required fields"]);
    } else {
      dispatch(editComment(editedComment))
      setShowModal(false);
    }
  };

  return (
    <div className="edit-comment-page">
      <form className="edit-comment-form-container" onSubmit={handleSubmit}>
        <div className="edit-comment-container">
          <div className="edit-comment-label-container">
            <label className="edit-comment-label">Edit your comment.</label>
          </div>
          <div className="edit-comment-page-input-container">
            <textarea
              className="edit-comment-page-input"
              rows="5"
              cols="60"
              type="text"
              name="content"
              placeholder={comment?.content}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {errors.length > 0 && (
          <div className="edit-comment-page-container-errors">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
          <div className="edit-comment-page-submit-button-container">
            <button type="submit">Submit</button>
        </div>
          </div>
      </form>
    </div>
  );
}



export default EditComment;
