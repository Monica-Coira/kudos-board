import { useNavigate, useParams } from 'react-router-dom';
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
    const [upvotedCard, setUpvotedCard] = useState([])
    const [cardModalIsOpen, setCardModalIsOpen] = useState(false)

    const handleBackButton = () => {
        navigate('/'); 
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
        await fetchData(`cards/upvote/${cardId}`, setCardData, "PUT");
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

    useEffect(() => {
        fetchCardData();
        fetchBoardTitle();
    }, [])

    return (
        <div className="board-page">
            <header>
                <button className="back-button" onClick={handleBackButton}>{"←"}</button>
                <h1 className="board-page-title">{boardTitle[0] ? boardTitle[0].title : "Loading..."}</h1>
            </header>
            <main>
                <div className="board-page-container">
                    <CreateCard setCardModalIsOpen={setCardModalIsOpen} />
                    <NewCardModal cardModalIsOpen={cardModalIsOpen} onCardModalClose={onCardModalClose} createCard={createCard}/>
                    <div className="board-page-cards">
                    {
                        cardData.map(obj => {
                            return (
                                <BoardCard cardDescription={obj.message} cardImage={obj.giphyLink} upvotes={obj.upvotes} cardAuthor={obj.author} cardId={obj.id} upvoteCard={upvoteCard} />
                            )
                        })
                    }
                    </div>
                </div>
            </main>
            <footer>
                <p>© Monica Coira. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default BoardPage;