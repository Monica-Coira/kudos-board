import './App.css'
import boardData from './data.js'
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import CreateBoard from './CreateBoard';
import BoardList from './BoardList.jsx';
import { useState, useEffect } from 'react';
import NewBoardModal from './NewBoardModal.jsx';

const App = () => {
  const [boardData, setBoardData] = useState([])
  const [deletedBoard, setDeletedBoard] = useState([])
  const [upvotedCard, setUpvotedCard] = useState([])
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false)

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
          <CreateBoard setBoardModalIsOpen={setBoardModalIsOpen}/>
        </section>
      </header>

      <main className="app-main">
        <NewBoardModal boardModalIsOpen={boardModalIsOpen} onModalClose={onModalClose} createBoard={createBoard}/>
        <BoardList data={boardData} deleteBoard={deleteBoard} />
      </main>

      <footer>
        <p>© Monica Coira. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App;
