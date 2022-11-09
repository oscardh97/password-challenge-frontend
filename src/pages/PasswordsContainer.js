import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

import PasswordCard from '../components/Card';
import DeleteModal from '../components/Modals/DeleteModal';
import CardModal from '../components/Modals/CardModal';
import { getCards } from '../api/Card';
import Form from 'react-bootstrap/Form';

function PasswordsContainer() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [card, setCard] = useState({});
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchCards = () => {
    getCards(filter).then((_cards) => {
      setCards(_cards.data)
    })
  };

  const handleCloseDeleteModal = (update) => {
    if (update === true) {
      fetchCards();
    }
    setShowDeleteModal(false);
  };
  const handleCloseCardModal = (update) => {
    if (update === true) {
      fetchCards();
    }
    fetchCards();
    setShowCardModal(false);
  };

  useEffect(() => {
    fetchCards();
  }, [filter]);

  const openDeleteModal = (_card) => {
    setCard(_card);
    setShowDeleteModal(true);
  };
  const openCardModal = (_card) => {
    setCard(_card);
    setShowCardModal(true);
  };

  const handleFilterChange = (event) => {
    if (event.target.value.length >= 3) {
      setFilter(event.target.value);
    } else {
      setFilter('');
    }
  };
  
  return (
    <Container>
        <Row>
            <Button onClick={() => openCardModal({})}> New Card </Button>
        </Row>
        <Row>
              <Form.Control onChange={handleFilterChange} name="url" type="text" placeholder="Enter URL" />
        </Row>
        <Row>
          {cards.map(_card => (
            <Col xs={4}><PasswordCard showDeleteModal={ openDeleteModal } openCardModal={ openCardModal } card={ _card }/></Col>
          ))}
            
            
        </Row>
        <DeleteModal show={showDeleteModal} card={ card } handleClose={ handleCloseDeleteModal }/>
        <CardModal show={showCardModal} card={ card } handleClose={ handleCloseCardModal }/>
    </Container>
  );
}

export default PasswordsContainer;
