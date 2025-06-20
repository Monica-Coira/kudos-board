import { useState } from "react";
import './NewBoardModal.css'

const NewBoardModal = ({boardModalIsOpen, onModalClose, createBoard}) => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")

    if (!boardModalIsOpen){
        return null;
    }
    const handleNewBoardSubmit = (event) => {
        event.preventDefault();
        createBoard({ title, category, author, image });
        setTitle("");
        setCategory("");
        setAuthor("");
        setImage("");
        onModalClose();
    }
    const handleModalClose = () => {
        onModalClose();
    }

    return (
        <div className="new-board-modal">
            <div className="new-board-modal-content">
                <div className="new-board-modal-close-button">
                    <span className="close" onClick={handleModalClose}>&times;</span>
                </div>
                <h3>Create a New Board</h3>
                <form onSubmit={handleNewBoardSubmit} className="new-board-modal-form">
                    <input type="text" placeholder="Board Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    <input type="text" placeholder="Category (Celebration, Thank You, or Inspiration)" value={category} onChange={(event) => setCategory(event.target.value)}/>
                    <input type="text" placeholder="Author (optional)" value={author} onChange={(event) => setAuthor(event.target.value)}/>
                    <input type="text" placeholder="Image" value={image} onChange={(event) => setImage(event.target.value)}/>
                    <div className="new-board-modal-buttons">
                        <button type="submit" className="new-board-modal-submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewBoardModal;