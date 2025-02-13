import { useEffect, createContext, useState, useContext } from "react";
import { AirTableDefaultType, NewTodoProps, TodoProps } from "../lib/types";
import { useSearchParams } from 'react-router-dom'

interface DataContextType {
  todoList: TodoProps[],
  isLoading: boolean,
  error: string,
  onDoneTodo: (todo: TodoProps) => Promise<boolean>,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
  onAddNew: (todo: NewTodoProps) => Promise<boolean>,
  onAddError: string,
  setSort: React.Dispatch<React.SetStateAction<SortType>>,
}

interface SortType {
  field: string,
  order: string,
}

export const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const sortParams = searchParams.get('sort') || ','
  const [ field, order ] = sortParams.split(',')

  const [todoList, setTodoList] = useState<TodoProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [onAddError, setOnAddError] = useState<string>('')
  const [sort, setSort] = useState<SortType>({ field, order })

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])

  useEffect(() => {
    if (todoList.length === 0) return
    
    setTodoList([...todoList.sort( sortCallback() )]);
  }, [sort])

  const fetchData = async () => {
    setIsLoading(true)
    setError('')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
    }
    
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?`

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
          description: item.fields.description,
          completedAt: item.fields.completedAt,
          icon: item.fields.icon,
          deadline: item.fields.deadline,
        }
      })
      setTodoList( todos.sort( sortCallback() ) )
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      setError("Something went wrong with the API")
      console.error(error)
    }
  }

  const sortCallback = () => {
    const sortField = sort.field as keyof TodoProps;
    return (a: TodoProps, b: TodoProps) => {
      if (!a[sortField] || !b[sortField]) return 0;
      if (a[sortField] < b[sortField]) return sort.order === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sort.order === 'asc' ? 1 : -1;
      return 0;
    }
  }

  const onDoneTodo = async (todo: TodoProps) => {
    // Destructure todo to `id` and the rest of the fields as `todoFields` {id, ...rest} = obj = {id, name, blah, blah, blah}
    const {id: todoId, ...todoFields} = todo
    const completedAt = new Date().toLocaleDateString('en-US')
    // Optimistic UI update
    setTodoList(todoList.map(item =>
      item.id === todoId ? { ...item, completedAt} : item
    ))


    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Create the updated Todo's object in fetch's body payload
      body: JSON.stringify({
        records: [{
          id: todoId,
          fields: { ...todoFields, completedAt}
        }]
      }),
    }
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options)
      if ( !response.ok ) {
        throw new Error(`Error: ${response.status}`)
      }

      // Updated? do nothing as UI updated optimistically
      // const data = await response.json()
      // const updatedTodo = data.records[0]
      return true;

    } catch (error) {
      // Undo optimistic update
      const newTodoList = todoList.map(item =>
        item.id === todoId ? todo : item
      )
      setTodoList( newTodoList )

      setOnAddError("Something went wrong, try again")
      console.error(error)
      
      return false;
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
    <DataContext.Provider value={{todoList, isLoading, error, onDoneTodo, onRemoveTodo, onAddNew, onAddError, setSort}}>
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