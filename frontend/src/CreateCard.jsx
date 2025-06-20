import './CreateCard.css'

const CreateCard = ({ setCardModalIsOpen, onDarkMode }) => {
    const handleCardModalOpen = () => {
        setCardModalIsOpen(true);
    }

    return (
        <button className={onDarkMode ? "create-card-button-dark" : "create-card-button"} onClick={handleCardModalOpen}>Create a Card</button>
    )
}

export default CreateCard;