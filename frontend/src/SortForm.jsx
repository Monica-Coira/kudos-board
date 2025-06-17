import './SortForm.css'

const SortForm = () => {
    return (
        <div>
            <select name="sort" className="sort-dropdown">
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