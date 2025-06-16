const SortForm = () => {
    return (
        <div className="sort-dropdown">
            <select name="sort">
                <option disabled selected>Sort By Category</option>
                <option value="all">All</option>
                <option value="recent">Recent</option>
                <option value="celebration">Celebration</option>
                <option value="thankYou">Thank You</option>
                <option value="inspiration">Inspiration</option>
            </select>
        </div>
    );
}

export default SortForm;