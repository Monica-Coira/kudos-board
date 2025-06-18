import './CreateBoard.css'
import { useState, useEffect } from 'react'

const CreateBoard = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleCreateBoard = () => {
        setIsFormOpen(true);
        if(isFormOpen){
            return (
                <form>
                    <label>Create a New Board</label>
                    <label>Enter title:
                        <input type="text" title="title" />
                    </label>
                    <label>Enter description:
                        <input type="text" description="description" />
                    </label>
                    <label>Enter category:
                        <input type="text" category="category" />
                    </label>
                    <label>Enter image URL:
                        <input type="text" image="image"/>
                    </label>
                    <label>Enter author:
                        <input type="text" author="author" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            );
        }
    }

    return (
        <button className="create-board-button" onClick={handleCreateBoard}>Create a New Board</button>
    )
}

export default CreateBoard;