import './KudosBoard.css'
import { useNavigate } from 'react-router-dom'; 

const KudosBoard = ({id, image, title, category, author}) => {
    const navigate = useNavigate();

    const handleViewBoard = () => {
        navigate('/boardpage');
    }

    return (
        <div className="kudos-board">
            <div className="kudos-board-id">{id}</div>
            <img className="kudos-board-image" src={image} alt={title} width="200" height="250"/>
            <h3 className="kudos-board-title">{title}</h3>
            <p className="kudos-board-category">{category}</p>
            <div className="kudos-board-buttons">
                <button className="view-board-button" onClick={handleViewBoard}>View Board</button>
                <button className="delete-board-button">Delete Board</button>
            </div>
        </div>
    )
}

export default KudosBoard;