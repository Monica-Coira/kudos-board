import { useNavigate } from 'react-router-dom';
import BoardCard from './BoardCard';
import boardData from './data';
import './BoardPage.css'
import CreateCard from './CreateCard';

const BoardPage = () => {
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate('/'); 
    };

    return (
        <div className="board-page">
            <header>
                <button className="back-button" onClick={handleBackButton}>{"←"}</button>
                <h1 className="board-page-title">{boardData[0].title}</h1>
            </header>
            <main>
                <div className="board-page-container">
                    <CreateCard />
                    {
                        boardData[0].cards.map(obj => {
                            return (
                                <BoardCard cardImage={obj.cardImage} cardTitle={obj.cardTitle} cardDescription={obj.cardDescription} />
                            )
                        })
                    }
                </div>
            </main>
            <footer>
                <p>© Monica Coira. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default BoardPage;