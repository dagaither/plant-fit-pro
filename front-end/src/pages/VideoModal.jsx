import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const VideoModal = ({ show, handleClose, videoUrl }) => {

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const videoUrl = "https://www.youtube.com/watch?v=3YFW5HoAeKo"
  
    return (
  
  <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Video Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          width="100%"
          height="315"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoModal;
