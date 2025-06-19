import './CreateBoard.css'
import { useState, useEffect } from 'react'

const CreateBoard = ({ setBoardModalIsOpen }) => {
    const handleCreateBoard = () => {
        setBoardModalIsOpen(true);
    }

    return (
        <button className="create-board-button" onClick={handleCreateBoard}>Create a New Board</button>
    )
}

export default CreateBoard;