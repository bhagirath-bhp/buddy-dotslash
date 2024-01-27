import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

function App() {
  
  return (
    <BrowserRouter className='app-container'>
      <Routes>
        <Route path='/chat' element={<ChatPage/>} ></Route>
        <Route index element={<HomePage/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
