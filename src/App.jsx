import { Routes, Route } from 'react-router-dom'
import Main from './pages'
import New from './pages/New'
import { Header, Footer } from './components/layout'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <>
      <Header />
      <DataProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </DataProvider>
      <Footer />
    </>
  )
}

export default App
