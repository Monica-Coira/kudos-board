import './CreateCard.css'

const CreateCard = ({ setCardModalIsOpen }) => {
    const handleCardModalOpen = () => {
        setCardModalIsOpen(true);
    }

    return (
        <button className="create-card-button" onClick={handleCardModalOpen}>Create a Card</button>
    )
}

export default CreateCard;