import './SortForm.css'
import { useState, useEffect } from 'react';

const SortForm = ({ fetchSortData }) => {
    const [chosenCategory, setChosenCategory] = useState("")

    const handleSortChange = (event) => {
        setChosenCategory((prev) => event.target.value);
    }

    useEffect(() => {
        fetchSortData(chosenCategory);
    }, [chosenCategory])

    return (
        <div className="sort-dropdown">
            <select name="sort" onChange={handleSortChange}>
                <option disabled selected>Sort By Category</option>
                <option value="All">All</option>
                <option value="Recent">Recent</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
            </select>
        </div>
    );
}

export default SortForm;