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
      <h1>Edit your comment</h1>
      <form id="edit-comment-container" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="edit-comment-page-container-errors">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="edit-comment-elements">
          <div className="edit-comment-page-container-input">
            <input
              type="text"
              name="content"
              placeholder={comment?.content}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="edit-comment-page-container-form-submit">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}



export default EditComment;
