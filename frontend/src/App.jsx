import { useState } from 'react'
import './App.css'
import boardData from './data.js'
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import CreateBoard from './CreateBoard';
import BoardList from './BoardList.jsx';

const App = () => {
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
        <BoardList data={boardData}/>
      </main>

      <footer>
        <p>© Monica Coira. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App;
