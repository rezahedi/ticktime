import { useEffect, createContext, useState, useContext } from "react";
import { AirTableDefaultType, NewTodoProps, TodoProps } from "../lib/types";

interface DataContextType {
  todoList: TodoProps[],
  isLoading: boolean,
  error: string,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
  onAddNew: (todo: NewTodoProps) => Promise<boolean>,
  onAddError: string,
}

export const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<TodoProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [onAddError, setOnAddError] = useState<string>('')

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
    }
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?sort[0][field]=completedAt&sort[0][direction]=asc&sort[1][field]=deadline&sort[1][direction]=asc`

    try {
      const response = await fetch(url, options)
      if ( !response.ok ) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()

      const todos = data.records.map((item: AirTableDefaultType) => {
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

  const onRemoveTodo = async (todo: TodoProps) => {
    const backupTodoList = todoList
    // Optimistic remove from UI
    const newTodoList = todoList.filter( item => item.id !== todo.id )
    setTodoList( newTodoList )

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
    }
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?records[]=${todo.id}`

    try {
      const response = await fetch(url, options)
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

  const onAddNew = async (todo: NewTodoProps) => {
    setOnAddError('')
    // Make optimistic UI update to show the new todo
    const newTodoOptimisticObject = {
      id: Date.now().toString(),
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
      // Create the new Todo's object in fetch's body payload
      body: JSON.stringify({
        records: [{
          fields: todo
        }]
      }),
    }
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options)
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

export const useData = (): DataContextType => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}