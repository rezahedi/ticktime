import { useState, useContext, useEffect } from 'react'
import styles from './AddNew.module.css'
import InputWithLabel from '../InputWithLabel'
import { DataContext } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import SelectIcon from './SelectIcon'

// eslint-disable-next-line react/prop-types
function AddNew({ extended=false, navigateToHome=false }) {
  const {onAddNew} = useContext(DataContext)
  const navigate = useNavigate()

  const todayDate = new Date().toLocaleDateString('en-CA');
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')
  const [deadline, setDeadline] = useState(todayDate)
  const [isExtended, setIsExtended] = useState(extended)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  const handleFormSubmission = async (e) => {
    e.preventDefault()
    setTitle(prev => '')
    const res = await onAddNew({
      title,
      icon,
      deadline,
    })
    if(!res)
      setTitle(prev => title)

    if(navigateToHome)
      navigate('/')
  }

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value
    setTitle( newTodoTitle )
  }

  useEffect(() => {
    setIsExtended(title!=='')
  }, [title])

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmission} onClick={()=>setIsExtended(true)}>
        <div className={styles.mainRow}>
          <InputWithLabel title={title} handleTitleChange={handleTitleChange}>
            Title
          </InputWithLabel>
          <button type="submit">
            Add
          </button>
        </div>
        {isExtended && <div className={styles.extention}>
          <label>
            Icon
            <SelectIcon setIcon={setIcon} />
          </label>
          <label>
            Complete by
            <input name='deadline' defaultValue={todayDate} type='date' onChange={(e) => setDeadline(e.target.value)} />
          </label>
        </div>}
      </form>
      {/* {error && <p className='error'>{error}</p>} */}
    </>
  )
}

export default AddNew