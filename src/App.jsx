import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'
import { useState } from 'react'

function App() {

  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])



  return (
    <div className="container">
      <h1>Tick Time</h1>
      <AddNew onAddNew={setNewTodo} />
      {newTodo &&
        <p style={{color:'lightgreen'}}>
          {newTodo}
        </p>
      }
      <List todoList={todoList} />
    </div>
  )
}

export default App
