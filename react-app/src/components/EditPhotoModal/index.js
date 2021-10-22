import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPhoto from './EditPhoto';
import '../CurrentPhoto/CurrentPhoto.css'

function EditPhotoModal({ photo }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="edit-photo-button" onClick={() => setShowModal(true)}>
                Edit Details
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPhoto photo={photo} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditPhotoModal;
