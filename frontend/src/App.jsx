import './App.css'
import boardData from './data.js'
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import CreateBoard from './CreateBoard';
import BoardList from './BoardList.jsx';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NewBoardModal from './NewBoardModal.jsx';

const App = () => {
  const [boardData, setBoardData] = useState([])
  const [deletedBoard, setDeletedBoard] = useState([])
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false)
  const [onDarkMode, setOnDarkMode] = useState(false)
  const location = useLocation();
  const { modeData } = location.state || {};
  const initialRender = useRef(true);

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

  const onModalClose = () => {
    setBoardModalIsOpen(false);
  }

  const createBoard = async (newBoardData) => {
    try {
      const response = await fetch("http://localhost:3000/boards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBoardData)
      });
      if (!response.ok){
        throw new Error("Not able to create new card.")
      }
      const data = await response.json();
    }
    catch {
      console.log("Error creating a new card.")
    }
    fetchBoardData();
  }

  const handleChangeMode = () => {
    if (!onDarkMode){
      setOnDarkMode(true);
    }
    else {
      setOnDarkMode(false);
    }
  }

  useEffect(() => {
    fetchBoardData();
  }, [])

  useEffect(() => {
    if (initialRender.current){
      initialRender.current = false;
      return;
    }
    setOnDarkMode(modeData);
  }, [location.state])

  useEffect(() => {
    localStorage.setItem('onDarkMode', onDarkMode);
  }, [onDarkMode])

  return (
    <div className={onDarkMode ? "app-dark" : "app"}>
      <header className={onDarkMode ? "app-header-dark" : "app-header"}>
        <button className={onDarkMode ? "mode-button-dark" : "mode-button"} onClick={handleChangeMode}>💡</button>
        <h1 className="app-title">Kudos Board</h1>
        <section className="header-forms">
          <SearchForm fetchSearchData={fetchSearchData} fetchBoardData={fetchBoardData} onDarkMode={onDarkMode}/>
          <SortForm fetchSortData={fetchSortData}/>
          <CreateBoard setBoardModalIsOpen={setBoardModalIsOpen} onDarkMode={onDarkMode}/>
        </section>
      </header>

      <main className="app-main">
        <NewBoardModal boardModalIsOpen={boardModalIsOpen} onModalClose={onModalClose} createBoard={createBoard}/>
        <BoardList data={boardData} deleteBoard={deleteBoard} onDarkMode={onDarkMode} setOnDarkMode={setOnDarkMode}/>
      </main>

      <footer className={onDarkMode ? "app-footer-dark" : "app-footer"}>
        <p>© Monica Coira. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App;
