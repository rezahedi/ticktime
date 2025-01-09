import './App.css'
import { Routes, Route } from 'react-router-dom'
import Main from './pages'
import New from './pages/New'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </>
  )
}

export default App
