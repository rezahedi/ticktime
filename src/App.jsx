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
  const [error, setError] = useState('')

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
      url: `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
    }

    try {
      const response = await fetch(options.url, options)
      if ( !response.ok ) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()

      const todos = data.records.map((item) => {
        return {
          id: item.id,
          title: item.fields.title,
          completedAt: item.fields.completedAt,
        }
      })
      setTodoList(todos)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      setError("Something went wrong with the API")
      console.error(error)
    }
  }


  useEffect(() => {
    (async ()=>{
      await fetchData()
    })()
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
      {isLoading && 
        <div style={{display:'flex', flexDirection:'column', gap:'1.7rem'}}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      }
      {error && <p className='error'>{error}</p>}
      {!error && !isLoading &&
        <List todoList={todoList} onRemoveTodo={removeTodo} />
      }
    </>
  )
}

export default App
