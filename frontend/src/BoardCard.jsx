import './BoardCard.css'
import { useState } from 'react';

const BoardCard = ({cardImage, cardDescription, upvotes, cardAuthor, cardId, cardPinned, upvoteCard, deleteCard, pinCard, unpinCard}) => {
    const handleUpvote = () => {
        upvoteCard(cardId);
    }

    const handleDeleteCard = () => {
        deleteCard(cardId);
    }

    const handlePin = () => {
        if (!cardPinned){
            pinCard(cardId);
        }
        else {
            unpinCard(cardId);
        }
    }

    return (
        <div className="board-card">
            <p className="board-card-description">{cardDescription}</p>
            <img className="board-card-image" src={cardImage} alt={cardDescription} width="150" height="190"/>
            <p className="board-card-author">Author: {cardAuthor}</p>
            <div className="board-card-buttons">
                <button className="upvote-button" onClick={handleUpvote}>Upvote: {upvotes}</button>
                <button className="board-card-delete-button" onClick={handleDeleteCard}>Delete</button>
                <button className={cardPinned ? "pinned-button" : "pin-button"} onClick={handlePin}>Pin</button>
            </div>
        </div>
    )
}

export default BoardCard;