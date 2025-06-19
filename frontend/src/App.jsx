import './App.css'
import boardData from './data.js'
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import CreateBoard from './CreateBoard';
import BoardList from './BoardList.jsx';
import { useState, useEffect } from 'react';

const App = () => {
  const [boardData, setBoardData] = useState([])
  const [deletedBoard, setDeletedBoard] = useState([])

  const fetchData = async (parameter, dataSetter, crudMethod = "GET") => {
    try {
      const response = await fetch(`http://localhost:3000/${parameter}`, {
        method: crudMethod
      });
      if (!response.ok){
        throw new Error('Not able to fetch data.')
      }
      const data = await response.json();
      dataSetter(data);
    }
    catch {
      console.log("Error fetching data.")
    }
  }

  const fetchBoardData = async () => {
    fetchData("boards/", setBoardData);
  }

  const fetchSearchData = async (searchQuery) => {
    fetchData(`boards/search?title=${searchQuery}`, setBoardData);
  }

  const fetchSortData = async (chosenCategory) => {
    if (chosenCategory === "All"){
      fetchBoardData();
      return;
    }
    fetchData(`boards/sort?category=${chosenCategory}`, setBoardData);
  }

  const deleteBoard = async (boardId) => {
    await fetchData(`boards/${boardId}`, setDeletedBoard, "DELETE");
    fetchBoardData();
  }

  useEffect(() => {
    fetchBoardData();
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Kudos Board</h1>
        <section className="header-forms">
          <SearchForm fetchSearchData={fetchSearchData} fetchBoardData={fetchBoardData}/>
          <SortForm fetchSortData={fetchSortData}/>
          <CreateBoard />
        </section>
      </header>

      <main className="app-main">
        <BoardList data={boardData} deleteBoard={deleteBoard} />
      </main>

      <footer>
        <p>© Monica Coira. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App;
