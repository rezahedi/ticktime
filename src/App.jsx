import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'
import { useState } from 'react'

function App() {

  const [todoList, setTodoList] = useState([])

  const addTodo = (newTodo) => {
    setTodoList((prevData) => [...prevData, {id: Date.now(), title: newTodo} ])
  }

  return (
    <div className="container">
      <h1>Tick Time</h1>
      <AddNew onAddNew={addTodo} />
      <List todoList={todoList} />
    </div>
  )
}

export default App
