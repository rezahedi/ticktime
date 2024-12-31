import { useState } from 'react'
import './style.css'
import InputWithLabel from '../InputWithLabel'

function AddNew( props ) {
  const { onAddNew, onRemoveTodo } = props

  const [title, setTitle] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const postNewTodo = async () => {
    setError('')
    // Make optimistic UI rendering about adding the new todo
    const newTodoOptimisticObject = {
      id: Date.now(),
      title: title
    }
    onAddNew(newTodoOptimisticObject)
    setTitle('')
    // As Optimistic rendering happens instantly, we don't really need a loading indicator
    // setIsLoading(true);

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
        fields: {
          title: title,
        }
      }]
    })

    try {
      const response = await fetch(options.url, options)
      if ( !response.ok ) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      const createdTodo = data.records[0]

      // Replace the temp todo with the API fetched todo
      onRemoveTodo( newTodoOptimisticObject.id )
      onAddNew({
        id: createdTodo.id,
        title: createdTodo.fields.title,
        completedAt: createdTodo.fields.completedAt,
      })

      // setIsLoading(false);

    } catch (error) {
      // setIsLoading(false)
      onRemoveTodo( newTodoOptimisticObject.id )
      setTitle( newTodoOptimisticObject.title )
      setError("Something went wrong, try again")
      console.error(error)
    }
  }

  const handleFormSubmission = async (e) => {
    e.preventDefault()
    await postNewTodo()
  }

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value
    setTitle( newTodoTitle )
  }

  return (
    <>
      <form className="add-new" onSubmit={handleFormSubmission}>
        <InputWithLabel title={title} handleTitleChange={handleTitleChange}>
          Title
        </InputWithLabel>
        <button type="submit">
          Add
        </button>
      </form>
      {error && <p className='error'>{error}</p>}
    </>
  )
}

export default AddNew