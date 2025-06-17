import { Routes, Route } from 'react-router-dom'
import App from './App'
import BoardPage from './BoardPage'

const AppRoutes = () => {
    return (
    <Routes>
        <Route exact path='/' element={<App />}/>
        <Route path='/boardpage' element={<BoardPage />}/>
    </Routes>
    )
}

export default AppRoutes;