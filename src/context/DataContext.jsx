import { useEffect, createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [onAddError, setOnAddError] = useState('')

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])

  const fetchData = async () => {
    setIsLoading(true)
    setError('')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
      url: `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?sort[0][field]=completedAt&sort[0][direction]=asc&sort[1][field]=deadline&sort[1][direction]=asc`,
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
          icon: item.fields.icon,
          deadline: item.fields.deadline,
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

  const onRemoveTodo = async (todo) => {
    const backupTodoList = todoList
    // Optimistic remove from UI
    const newTodoList = todoList.filter( item => item.id !== todo.id )
    setTodoList( newTodoList )

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
      url: `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?records[]=${todo.id}`,
    }

    try {
      const response = await fetch(options.url, options)
      if ( !response.ok ) {
        throw new Error(`Error: ${response.status}`)
      }

    } catch (error) {
      // Recover removed item
      setTodoList(backupTodoList)

      // setError("Something went wrong with the API")
      console.error(error)
    }
  }

  const onAddNew = async (todo) => {
    setOnAddError('')
    // Make optimistic UI update to show the new todo
    const newTodoOptimisticObject = {
      id: Date.now(),
      ...todo,
      temp: true,
    }
    setTodoList((prevData) => [{...newTodoOptimisticObject}, ...prevData ])
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      url: `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
    }

    // Create the new Todo's object in fetch's body payload
    options.body = JSON.stringify({
      records: [{
        fields: todo
      }]
    })

    try {
      const response = await fetch(options.url, options)
      if ( !response.ok ) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      const createdTodo = data.records[0]

      // Remove optimistic
      const newTodoList = todoList.filter( item => item.id !== newTodoOptimisticObject.id )
      setTodoList( newTodoList )
      // Add real one
      setTodoList((prevData) => [{id:createdTodo.id, ...createdTodo.fields}, ...prevData ])

      return true;

    } catch (error) {
      // Remove optimistic
      const newTodoList = todoList.filter( item => item.id !== newTodoOptimisticObject.id )
      setTodoList( newTodoList )
      setOnAddError("Something went wrong, try again")
      console.error(error)
      
      return false;
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{todoList, isLoading, error, onRemoveTodo, onAddNew, onAddError}}>
      {children}
    </DataContext.Provider>
  )
}