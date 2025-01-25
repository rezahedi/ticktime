import { useState, useContext } from 'react'
import styles from './AddNew.module.css'
import InputWithLabel from '../InputWithLabel'
import { DataContext } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'

function AddNew({ navigateToHome }) {
  const {onAddNew} = useContext(DataContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  const handleFormSubmission = async (e) => {
    e.preventDefault()
    setTitle(prev => '')
    const res = await onAddNew(title)
    if(!res)
      setTitle(prev => title)

    if(navigateToHome)
      navigate('/')
  }

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value
    setTitle( newTodoTitle )
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmission}>
        <InputWithLabel title={title} handleTitleChange={handleTitleChange}>
          Title
        </InputWithLabel>
        <button type="submit">
          Add
        </button>
      </form>
      {/* {error && <p className='error'>{error}</p>} */}
    </>
  )
}

export default AddNew