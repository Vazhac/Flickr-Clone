const CREATE_COMMENT = 'photos/CREATE_COMMENT';
const SET_COMMENT = 'photos/SET_COMMENT';
const EDIT_COMMENT = 'photos/EDIT_COMMENT';
const REMOVE_COMMENT = 'photos/REMOVE_COMMENT';
const SET_COMMENTS = 'photos/SET_COMMENTS';

const createCommentAction = (comment) => {
  return {
    type: CREATE_COMMENT,
    payload: comment,
  }
};

const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  }
};

const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    payload: comment,
  }
};

const editCommentAction = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  }
};

const removeCommentAction = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    payload: commentId,
  }
};

export const createComment = (newComment) => async dispatch => {
  const response = await fetch(
    `/api/photos/${newComment.photo_id}/comments/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    }
  );
  const data = await response.json();
  dispatch(createCommentAction(data.newComment));
  dispatch(fetchComments(data.photo_id));
};

export const fetchComments = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}/comments/`);
  const data = await response.json();
  const comments = data.comments;
  dispatch(setComments(comments));
};

// get a specific comment from the state by id and return it as a comment object at API route /api/songs/:id/comments/:id
export const fetchComment = (comment) => async dispatch => {
  console.log('fetch comment 1: ', comment);
  const response = await fetch(`/api/photos/${comment.photo_id}/comments/${comment.id}/`);
  console.log('fetch comment 2: ', response);
  const data = await response.json();
  dispatch(setComment(data));
};

// edit a comment by id and return the new state
export const editComment = (comment) => async dispatch => {
  const response = await fetch(`/api/photos/${comment.photo_id}/comments/${comment.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  const data = await response.json();
  dispatch(editCommentAction(data));
  dispatch(fetchComments(data.photo_id));
};

// delete the comment by id and return the new state with the comment removed
export const deleteComment = (photoId, commentId) => async dispatch => {
  const response = await fetch(
    `/api/photos/${photoId}/comments/${commentId}/`,
    {
      method: 'DELETE',
    }
  );
  dispatch(removeCommentAction(commentId));
  dispatch(fetchComments(photoId));
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_COMMENT:
      // add the new comment to the state and return the new state
      newState.comment = action.payload;
      return newState;
    case SET_COMMENT:
      newState.comment = action.payload;
      return newState;
    case EDIT_COMMENT:
      newState.comment = action.payload;
      return newState;
    case REMOVE_COMMENT:
      newState.comment = null;
      return newState;
    case SET_COMMENTS:
      newState.comments = action.payload;
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
