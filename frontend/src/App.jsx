import { useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import BoardPage from './BoardPage.jsx';
import './App.css'
import boardData from './data.js'
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import CreateBoard from './CreateBoard';
import BoardList from './BoardList.jsx';

const App = () => {
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<App />}/>
      <Route path='/boardpage' element={<BoardPage />}/>
    </Routes>
  </BrowserRouter>
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Kudos Board</h1>
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
