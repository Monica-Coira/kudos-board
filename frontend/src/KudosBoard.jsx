import './KudosBoard.css'

const KudosBoard = ({id, image, title, category, author}) => {
    return (
        <div className="kudos-board">
            <div className="kudos-board-id">{id}</div>
            <img className="kudos-board-image" src={image} alt={title} width="200" height="250"/>
            <h3 className="kudos-board-title">{title}</h3>
            <p className="kudos-board-category">{category}</p>
            <div className="kudos-board-buttons">
                <button className="view-board-button">View Board</button>
                <button className="delete-board-button">Delete Board</button>
            </div>
        </div>
    )
}

export default KudosBoard;