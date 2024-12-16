import { useState } from 'react'
import './style.css'
import InputWithLabel from '../InputWithLabel'

function AddNew( props ) {
  const { onAddNew } = props

  const [title, setTitle] = useState('')

  const handleFormSubmission = (e) => {
    e.preventDefault()

    onAddNew( title )
    setTitle('')
  }

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value
    setTitle( newTodoTitle )
  }

  return (
    <form className="add-new" onSubmit={handleFormSubmission}>
      <InputWithLabel title={title} handleTitleChange={handleTitleChange}>
        <b>Title</b>
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddNew