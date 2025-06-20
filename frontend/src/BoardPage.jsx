import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BoardCard from './BoardCard';
import './BoardPage.css'
import CreateCard from './CreateCard';
import { useState, useEffect } from 'react';
import NewCardModal from './NewCardModal';

const BoardPage = () => {
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([])
    const [boardTitle, setBoardTitle] = useState([])
    const {boardId} = useParams();
    const [deletedCard, setDeletedCard] = useState([])
    const [cardModalIsOpen, setCardModalIsOpen] = useState(false)
    const location = useLocation();
    const { modeData } = location.state || {};
    const [onDarkMode, setOnDarkMode] = useState(modeData);

    const handleBackButton = () => {
        navigate('/', {state: {modeData: onDarkMode}}); 
    };

    const fetchData = async (parameter, dataSetter, crudMethod = "GET") => {
        try {
        const response = await fetch(`http://localhost:3000/${parameter}`, {
            method: crudMethod
        });
        if (!response.ok){
            throw new Error('Not able to fetch data.')
        }
        const data = await response.json();
        dataSetter(data);
        }
        catch {
        console.log("Error fetching data.")
        }
    }

    const fetchCardData = async () => {
        fetchData(`cards/${boardId}`, setCardData);
    }

    const fetchBoardTitle = () => {
        fetchData(`cards/getTitle/${boardId}`, setBoardTitle);
    }

    const upvoteCard = async (cardId) => {
        await fetchData(`cards/upvote/${boardId}/${cardId}`, setCardData, "PUT");
    }

    const pinCard = async (cardId) => {
        await fetchData(`cards/pin/${boardId}/${cardId}`, setCardData, "PUT");
    }

    const unpinCard = async (cardId) => {
        await fetchData(`cards/unpin/${boardId}/${cardId}`, setCardData, "PUT");
    }

    const createCard = async ({cardMessage, cardGiphyLink, cardAuthor}) => {
        try {
            const newCardData = {
                board_id: Number(boardId),
                message: cardMessage,
                giphyLink: cardGiphyLink,
                author: cardAuthor,
                upvotes: 0,
                pinned: false
            }
            const response = await fetch("http://localhost:3000/cards/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(newCardData)
            });
            if (!response.ok){
                throw new Error("Not able to create new card.")
            }
            const data = await response.json();
        }
        catch {
            console.log("Error creating a new card.")
        }
        fetchCardData();
    }

    const onCardModalClose = () => {
        setCardModalIsOpen(false);
    }

    const deleteCard = async (cardId) => {
        await fetchData(`cards/${cardId}`, setDeletedCard, "DELETE");
        fetchCardData();
    }

    const handleChangeMode = () => {
        if (!onDarkMode){
            setOnDarkMode(true);
        }
        else {
            setOnDarkMode(false);
        }
    }

    useEffect(() => {
        fetchCardData();
        fetchBoardTitle();
    }, [])

    return (
        <div className={onDarkMode ? "board-page-dark" : "board-page"}>
            <header className="board-page-header">
                <button className={onDarkMode ? "back-button-dark" : "back-button"} onClick={handleBackButton}>{"←"}</button>
                <button className={onDarkMode ? "mode-button-dark" : "mode-button"} onClick={handleChangeMode}>💡</button>
                <h2 className="board-page-kudos-header">Kudos Board</h2>
                <div className="board-page-second-header">
                    <h1 className="board-page-title">{boardTitle[0] ? boardTitle[0].title : "Loading..."}</h1>
                    <CreateCard setCardModalIsOpen={setCardModalIsOpen} onDarkMode={onDarkMode}/>
                </div>
            </header>
            <main>
                <div className="board-page-container">
                    <NewCardModal cardModalIsOpen={cardModalIsOpen} onCardModalClose={onCardModalClose} createCard={createCard}/>
                    <div className="board-page-cards">
                    {
                        cardData.map(obj => {
                            return (
                                <BoardCard cardDescription={obj.message} cardImage={obj.giphyLink} upvotes={obj.upvotes} cardAuthor={obj.author} cardId={obj.id} cardPinned={obj.pinned} upvoteCard={upvoteCard} deleteCard={deleteCard} pinCard={pinCard} unpinCard={unpinCard} onDarkMode={onDarkMode}/>
                            )
                        })
                    }
                    </div>
                </div>
            </main>
            <footer className={onDarkMode ? "app-footer-dark" : "app-footer"}>
                <p>© Monica Coira. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default BoardPage;