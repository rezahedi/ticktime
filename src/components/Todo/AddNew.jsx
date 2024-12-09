import { useState } from 'react'
import './style.css'

function AddNew({ onAddNew }) {

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
      <label htmlFor="myInput">Add new todo</label>
      <div>
        <input
          id="myInput" type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Ex: Do cleaning ..."
        />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddNew