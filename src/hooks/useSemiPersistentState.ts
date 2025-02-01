import { useState, useEffect } from 'react'

const useSemiPersistentState = () => {

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  )

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])

  return [todoList, setTodoList]
}

export default useSemiPersistentState