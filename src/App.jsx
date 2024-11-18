import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'
import { useState } from 'react'

function App() {

  const [newTodo, setNewTodo] = useState('')



  return (
    <div className="container">
      <h1>Tick Time</h1>
      <AddNew onAddNew={setNewTodo} />
      <p>{newTodo}</p>
      <List />
    </div>
  )
}

export default App
