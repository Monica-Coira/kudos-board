import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate('/'); 
    };

    return (
        <div>
            <p>New Page</p>
            <button onClick={handleBackButton}>Back to Home</button>
        </div>
    );
}

export default BoardPage;