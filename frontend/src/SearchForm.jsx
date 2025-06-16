const SearchForm = () => {
    return (
        <div className="search-bar">
            <input type="text" id="searchInput" placeholder="Search boards..."></input>
            <button className="search-button">Search</button>
            <button className="clear-button">Clear</button>
        </div>
    );
}

export default SearchForm;