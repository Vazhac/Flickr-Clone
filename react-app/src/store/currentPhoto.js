/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_CURRENT_PHOTO = 'SET_CURRENT_PHOTO';
const EDIT_CURRENT_PHOTO = 'EDIT_CURRENT_PHOTO';
const DELETE_CURRENT_PHOTO = 'DELETE_CURRENT_PHOTO';

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setCurrentPhoto = photo => ({
    type: SET_CURRENT_PHOTO,
    photo
});

const editCurrentPhoto = photo => ({
    type: EDIT_CURRENT_PHOTO,
    photo
});

const deleteCurrentPhoto = () => ({
    type: DELETE_CURRENT_PHOTO
});

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const fetchCurrentPhoto = (photoId) => dispatch => {
    return fetch(`api/photos/${photoId}`)
        .then(res => res.json())
        .then(photo => dispatch(setCurrentPhoto(photo)))
        .catch(err => console.log(err));
};

export const editPhoto = (photoId, photo) => dispatch => {
    return fetch(`api/photos/${photoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(photo)
    })
        .then(res => res.json())
        .then(photo => dispatch(editCurrentPhoto(photo)))
        .catch(err => console.log(err));
}

export const deletePhoto = (photoId) => dispatch => {
    return fetch(`${API_BASE_URL}/photos/${photoId}`, {
        method: 'DELETE'
    })
        .then(() => dispatch(deleteCurrentPhoto()))
        .catch(err => console.log(err));
}

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {
    currentPhoto: {}
};

const currentPhotoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PHOTO:
            return {
                ...state,
                currentPhoto: action.photo
            };
        case EDIT_CURRENT_PHOTO:
            return {
                ...state,
                currentPhoto: action.photo
            };
        case DELETE_CURRENT_PHOTO:
            return {
                ...state,
                currentPhoto: {}
            };
        default:
            return state;
    }
}

export default currentPhotoReducer;
