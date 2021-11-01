
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUser from './EditUser';
// import './EditUser.css'

function EditUserModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-user-button" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal>
          <EditUser user={user} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditUserModal;
