import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PasswordCard({showDeleteModal, openCardModal, card = {}}) {
    const { id, name, url, username } = card;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{ name }</Card.Title>
            <Card.Text> { url } </Card.Text>
            <Card.Text> { username } </Card.Text>
            <Button variant="primary" onClick={() => openCardModal(card)}>Edit</Button>
            <Button variant="danger" onClick={() => showDeleteModal(card)}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default PasswordCard;