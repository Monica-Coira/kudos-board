import './CreateBoard.css'

const CreateBoard = ({ setBoardModalIsOpen, onDarkMode }) => {
    const handleCreateBoard = () => {
        setBoardModalIsOpen(true);
    }

    return (
        <button className={onDarkMode ? "create-board-button-dark" : "create-board-button"} onClick={handleCreateBoard}>Create a New Board</button>
    )
}

export default CreateBoard;