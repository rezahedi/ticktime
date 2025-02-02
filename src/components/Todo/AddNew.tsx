import { useState, useEffect } from 'react'
import styles from './AddNew.module.css'
import InputWithLabel from '../InputWithLabel'
import { useData } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import SelectIcon from './SelectIcon'

interface AddNewProps {
  extended?: boolean,
  navigateToHome?: boolean,
}

function AddNew({ extended=false, navigateToHome=false }: AddNewProps) {
  const {onAddNew, onAddError} = useData()
  const navigate = useNavigate()

  const todayDate = new Date().toLocaleDateString('en-CA');
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')
  const [deadline, setDeadline] = useState(todayDate)
  const [isExtended, setIsExtended] = useState(extended)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await onAddNew({
      title,
      icon,
      deadline,
    })
    if(res) {
      setTitle('')
      if(navigateToHome)
        navigate('/')
    }

  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle( e.target.value )
  }

  useEffect(() => {
    setIsExtended(title!=='' || extended)
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
      {onAddError && <p className='error'>{onAddError}</p>}
    </>
  )
}

export default AddNew