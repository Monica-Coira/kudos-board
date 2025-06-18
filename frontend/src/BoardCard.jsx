import './BoardCard.css'

const BoardCard = ({cardImage, cardDescription, upvotes, cardAuthor}) => {
    return (
        <div className="board-card">
            <p className="board-card-description">{cardDescription}</p>
            <img className="board-card-image" src={cardImage} alt={cardDescription} width="200" height="250"/>
            <p className="board-card-author">Author: {cardAuthor}</p>
            <div className="board-card-buttons">
                <button className="upvote-button">Upvotes: {upvotes}</button>
                <button className="board-card-delete-button">Delete</button>
            </div>
        </div>
    )
}

export default BoardCard;