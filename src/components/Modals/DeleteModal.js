import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteCard } from '../../api/Card';

function DeleteModal({ card = {}, show=false, handleClose  }) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete { card?.name }? </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={async () => {
            await deleteCard(card.id);
            handleClose(true);
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default DeleteModal;