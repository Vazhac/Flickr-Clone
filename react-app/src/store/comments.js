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

const removeCommentAction = (id) => {
  return {
    type: REMOVE_COMMENT,
    payload: id,
  }
};

const setComments = comments => ({
  type: SET_COMMENTS,
  payload: comments,
});

export const createComment = (newComment) => async dispatch => {
  const response = await fetch(`/api/photos/${newComment.photo_id}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
  const comment = await response.json();
  dispatch(createCommentAction(comment));
};

export const fetchComments = (id) => async dispatch => {
  const response = await fetch(`/api/photos/${id}/comments/`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(setComments(comments));
  }
};

// get a specific comment from the state by id and return it as a comment object at API route /api/songs/:id/comments/:id
export const fetchComment = (id, commentId) => async dispatch => {
  const response = await fetch(`/api/photos/${id}/comments/${commentId}`);

  if (response.ok) {
    const comment = await response.json();
    dispatch(setComment(comment));
  }
};

// edit a comment by id and return the new state
export const editComment = (comment) => async dispatch => {
  const response = await fetch(
    `/api/photos/${comment.songId}/comments/${comment.id}/`,
    {
      method: 'PUT',
      include: 'user',
      body: JSON.stringify(comment),
    }
  );
  const data = await response.json();
  dispatch(editCommentAction(data));
};

// delete the comment by id and return the new state with the comment removed
export const deleteComment = (id, commentId) => async dispatch => {
  const response = await fetch(
    `/api/photos/${id}/comments/${commentId}/`,
    {
      method: 'DELETE',
    }
  );
  const data = await response.json();
  dispatch(removeCommentAction(data.commentId));
  dispatch(fetchComments(id));
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
      break;
    case EDIT_COMMENT:
      newState.comments = state.comments.map(comment => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });
      return newState;
    case REMOVE_COMMENT:
      newState.comments = state.comments.filter(comment => comment.id !== action.payload);
      return newState;
    case SET_COMMENTS:
      newState.comments = action.payload;
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
