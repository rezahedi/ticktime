import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'

function App() {

  return (
    <div className="container">
      <h1>Tick Time</h1>
      <AddNew />
      <List />
    </div>
  )
}

export default App
