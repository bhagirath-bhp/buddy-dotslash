import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
function App() {
  
  return (
    <BrowserRouter className='app-container'>
      <Routes>
        <Route path='/chat' element={<ChatPage/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
