import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ data }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className="gallery-item" onClick={() => toggleModal()}>
        <img
          src={data.webformatURL}
          alt={data.tags}
          className="imageGalleryItem-image"
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={data.webformatURL} alt={data.tag} />
        </Modal>
      )}
    </>
  );
}
