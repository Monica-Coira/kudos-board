import { useState, useEffect } from "react";
import './NewCardModal.css'
import { API_KEY } from './apiConfig.js'

const NewCardModal = ({cardModalIsOpen, onCardModalClose, createCard}) => {
    const [cardMessage, setCardMessage] = useState("")
    const [cardGiphyLink, setCardGiphyLink] = useState("")
    const [cardAuthor, setCardAuthor] = useState("")
    const [giphySearchQuery, setGiphySearchQuery] = useState("")
    const [possibleGifs, setPossibleGifs] = useState([])

    const fetchPossibleGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${giphySearchQuery}&limit=6`);
            if (!response.ok){
                throw new Error('Not able to fetch GIF data.')
            }
            const data = await response.json();
            setPossibleGifs(data.data);
        }
        catch {
            console.log("Error fetching data.")
        }
    }

    if (!cardModalIsOpen){
        return null;
    }

    const handleNewCardSubmit = (event) => {
        event.preventDefault();
        createCard({ cardMessage, cardGiphyLink, cardAuthor });
        setCardMessage("");
        setCardGiphyLink("");
        setCardAuthor("");
        setGiphySearchQuery("");
        setPossibleGifs([]);
        onCardModalClose();
        onCardModalClose();
    }
    
    const handleCardModalClose = () => {
        setCardMessage("");
        setCardGiphyLink("");
        setCardAuthor("");
        setGiphySearchQuery("");
        setPossibleGifs([]);
        onCardModalClose();
    }

    const selectGif = (obj) => {
        setCardGiphyLink(obj);
    }

    return (
        <div className="new-card-modal">
            <div className="new-card-modal-content">
                <div className="new-card-modal-close-button">
                    <span className="close" onClick={handleCardModalClose}>&times;</span>
                </div>
                <h3>Create a New Card</h3>
                <form onSubmit={handleNewCardSubmit} className="new-card-modal-form">
                    <input type="text" placeholder="Message" value={cardMessage} onChange={(event) => setCardMessage(event.target.value)}/>
                    <input type="text" placeholder="Author (optional)" value={cardAuthor} onChange={(event) => setCardAuthor(event.target.value)}/>
                    <div className="giphy-search">
                        <input type="text" placeholder="Search for a GIF" value={giphySearchQuery} onChange={(event) => setGiphySearchQuery(event.target.value)} className="giphy-search-bar"/>
                        <button type="button" className="giphy-search-button" onClick={fetchPossibleGifs}>Search</button>
                    </div>
                    <div className="giphy-display">
                        {
                            possibleGifs.map((obj) => {
                                return (
                                    <img key={obj.id} src={obj.images.original.url} alt={obj.title} onClick={() => selectGif(obj.images.original.url)} className={cardGiphyLink === obj.images.original.url ? "selected-gif" : ""}/>
                                )
                            })
                        }
                    </div>
                    <div className="new-card-modal-button">
                        <button type="submit" className="new-card-modal-submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCardModal;