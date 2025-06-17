import './BoardCard.css'

const BoardCard = ({cardImage, cardTitle, cardDescription}) => {
    return (
        <div className="board-card">
            <h3 className="board-card-title">{cardTitle}</h3>
            <p className="board-card-description">{cardDescription}</p>
            <img className="board-card-image" src={cardImage} alt={cardTitle} width="200" height="250"/>
            <div className="board-card-buttons">
                <button className="upvote-button">Upvote</button>
                <button className="board-card-delete-button">Delete</button>
            </div>
        </div>
    )
}

export default BoardCard;