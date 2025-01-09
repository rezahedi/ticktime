import './App.css'
import { Routes, Route } from 'react-router-dom'
import Main from './pages'
import New from './pages/New'
import { Header, Footer } from './components/layout'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<New />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
