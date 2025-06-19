import './BoardCard.css'
import { useState } from 'react';

const BoardCard = ({cardImage, cardDescription, upvotes, cardAuthor, cardId, upvoteCard, deleteCard}) => {
    const handleUpvote = () => {
        upvoteCard(cardId);
    }

    const handleDeleteCard = () => {
        deleteCard(cardId);
    }

    return (
        <div className="board-card">
            <p className="board-card-description">{cardDescription}</p>
            <img className="board-card-image" src={cardImage} alt={cardDescription} width="200" height="250"/>
            <p className="board-card-author">Author: {cardAuthor}</p>
            <div className="board-card-buttons">
                <button className="upvote-button" onClick={handleUpvote}>Upvotes: {upvotes}</button>
                <button className="board-card-delete-button" onClick={handleDeleteCard}>Delete</button>
            </div>
        </div>
    )
}

export default BoardCard;