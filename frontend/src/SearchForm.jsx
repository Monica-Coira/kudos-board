import './SearchForm.css'
import { useState } from 'react'

const SearchForm = ({ fetchSearchData, fetchBoardData, onDarkMode }) => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = () => {
        fetchSearchData(searchQuery);
    }

    const handleClear = () => {
        setSearchQuery("")
        fetchBoardData();
    }

    const handleEnterKey = (event) => {
        if (event.key === 'Enter'){
            handleSearch();
        }
    }

    return (
        <div className="search-bar">
            <input type="text" value={searchQuery} onChange={handleSearchChange} onKeyDown={handleEnterKey} id="searchInput" className="search-input" placeholder="Search boards..."></input>
            <button className={onDarkMode ? "search-button-dark" : "search-button"} onClick={handleSearch}>Search</button>
            <button className={onDarkMode ? "clear-button-dark" : "clear-button"} onClick={handleClear}>Clear</button>
        </div>
    );
}

export default SearchForm;