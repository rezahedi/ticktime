import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'
import { useState, useEffect } from 'react'
import Skeleton from './components/Todo/Skeleton'


function App() {

  const [todoList, setTodoList] = useState(
    /*JSON.parse(localStorage.getItem('savedTodoList')) ||*/ []
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve( JSON.parse(localStorage.getItem('savedTodoList')) || [] )
      }, 2000)
    })
    myPromise.then((result) => {
      setTodoList(result)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if(!isLoading)
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
      {isLoading && <Skeleton />}
      {!isLoading &&
        <List todoList={todoList} onRemoveTodo={removeTodo} />
      }
    </>
  )
}

export default App
