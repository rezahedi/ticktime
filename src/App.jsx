import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'
import { useState, useEffect } from 'react'


function App() {

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  )

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])

  const addTodo = (newTodo) => {
    setTodoList((prevData) => [...prevData, {id: Date.now(), title: newTodo} ])
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter( item => item.id !== id )
    setTodoList( newTodoList )
  }

  return (
    <>
      <h1>Tick Time</h1>
      <AddNew onAddNew={addTodo} />
      <List todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  )
}

export default App
