import axios from 'axios';

export const deleteCard = async (cardId) => {
    return await axios.delete(`http://localhost:5050/api/password-cards/${cardId}`);
};

export const createCard = async (card) => {
    return await axios.post(`http://localhost:5050/api/password-cards/`, card);
};

export const updateCard = async (id, card) => {
    return await axios.put(`http://localhost:5050/api/password-cards/${id}`, card);
};

export const getCards = async (filter) => {
    return await axios.get(`http://localhost:5050/api/password-cards/?filter=${filter}`);
};