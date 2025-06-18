import { useNavigate, useParams } from 'react-router-dom';
import BoardCard from './BoardCard';
import boardData from './data';
import './BoardPage.css'
import CreateCard from './CreateCard';
import { useState, useEffect } from 'react';

const BoardPage = () => {
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([])
    const {boardId} = useParams();

    const handleBackButton = () => {
        navigate('/'); 
    };

    const fetchData = async (parameter, dataSetter) => {
        try {
        const response = await fetch(`http://localhost:3000/${parameter}`);
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

    useEffect(() => {
        fetchCardData();
    })

    return (
        <div className="board-page">
            <header>
                <button className="back-button" onClick={handleBackButton}>{"←"}</button>
                <h1 className="board-page-title">{boardData[0].title}</h1>
            </header>
            <main>
                <div className="board-page-container">
                    <CreateCard />
                    <div className="board-page-cards">
                    {
                        cardData.map(obj => {
                            return (
                                <BoardCard cardDescription={obj.message} cardImage={obj.giphyLink} upvotes={obj.upvotes} cardAuthor={obj.author} />
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