import './App.css'
import boardData from './data.js'
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import CreateBoard from './CreateBoard';
import BoardList from './BoardList.jsx';
import { useState, useEffect } from 'react';

const App = () => {
  const [boardData, setBoardData] = useState([])

  const fetchData = async (parameter) => {
    try {
      const response = await fetch(`http://localhost:3000/${parameter}`);
      if (!response.ok){
        throw new Error('Not able to fetch data.')
      }
      const data = await response.json();
      setBoardData(data);
    }
    catch {
      console.log("Error fetching data.")
    }
  }

  const fetchBoardData = async () => {
    fetchData("boards/");
  }

  useEffect(() => {
    fetchBoardData();
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Kudos Board</h1>
        <section className="header-forms">
          <SearchForm />
          <SortForm />
          <CreateBoard />
        </section>
      </header>

      <main className="app-main">
        <BoardList data={boardData} />
      </main>

      <footer>
        <p>© Monica Coira. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App;
