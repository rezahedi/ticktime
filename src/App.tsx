import { Routes, Route } from 'react-router-dom'
import Main from './pages'
import New from './pages/New'
import About from './pages/About'
import { Header, Footer } from './components/layout'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/new" element={<New />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </DataProvider>
      </div>
      <Footer />
    </>
  )
}

export default App
