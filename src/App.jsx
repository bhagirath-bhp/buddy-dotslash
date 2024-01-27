import { useState } from 'react'
import './App.css'
import ProductSearch from './components/ProductSearch'
import ChatItem from './components/ChatItem'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <main className='app-container'>
      <div className="msgcontainer w-screen">
          <ChatItem type="recieved" name="Jai Shree Ram" time="11:30 AM" message=" That's awesome. I think our users will really appreciate the improvements." imageURL="/images/dummy.jpg"/>
          <ChatItem type="sent" name="Jai Shree Ram" time="11:30 AM" message=" That's awesome. I think our users will really appreciate the improvements." imageURL="/images/dummy.jpg"/>
      </div>
    </main>
  )
}

export default App
