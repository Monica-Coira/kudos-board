import './SearchForm.css'

const SearchForm = () => {
    return (
        <div className="search-bar">
            <input type="text" id="searchInput" className="search-input" placeholder="Search boards..."></input>
            <button className="search-button">Search</button>
            <button className="clear-button">Clear</button>
        </div>
    );
}

export default SearchForm;