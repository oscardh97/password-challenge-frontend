import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { createCard, updateCard } from '../../api/Card';
import { useEffect, useState } from 'react';

function CardModal({ card = {}, show=false, handleClose  }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccesCb, setShowSuccesCb] = useState(false);
  const [cardData, setCardData] = useState({});
  const {id, name, url, username, password } = cardData || {};
  
  useEffect(() => {
    if (card.id) {
      setCardData({...card});
    } else {
      setCardData({name: '', url: '', username: '', password: ''});
    }
    setShowSuccesCb(false);
  }, [card]);

  const handleChange = (event) => {
    setCardData({
      ...cardData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {showSuccesCb && <Alert key={'success'} variant={'success'}>
        Password copied to clipboard.
      </Alert>}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={name} onChange={handleChange} type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control name="url" value={url} onChange={handleChange} type="text" placeholder="Enter URL" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={username} onChange={handleChange} type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <div>
              <Form.Control className="password-input" name="password" value={password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" />
              <Button onClick={() => {
                navigator.clipboard.writeText(password);
                setShowSuccesCb(true);
              }}>
                Copy to Clipboard
              </Button>
            </div>
            <Form.Check type="checkbox" label="Show password" checked={showPassword} onChange={(ev) => setShowPassword(ev.target.checked)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            {showError && <Form.Text muted>All the fields are required</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={async () => {
          if (!name || !url || !username || !password) {
            return setShowError(true);
          }
          if (!id) {
            await createCard({name, url, username, password});
          } else {
            await updateCard(id, {name, url, username, password});
          }
          setShowError(false);
          handleClose(true);
        }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;