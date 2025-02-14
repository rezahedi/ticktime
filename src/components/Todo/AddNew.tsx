import { useState, useEffect } from 'react'
import styles from './AddNew.module.css'
import { useData } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import SelectIcon from './SelectIcon'

function AddNew() {
  const {onAddNew, onAddError} = useData()
  const navigate = useNavigate()

  const todayDate = new Date().toLocaleDateString("en-CA"); // en-CA return yyyy-mm-dd format that input type date needs!
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [deadline, setDeadline] = useState(todayDate)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await onAddNew({
      title,
      description,
      icon,
      deadline,
    })
    if(res) {
      navigate('/')
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmission}>
        <div className={styles.mainRow}>
          <SelectIcon setIcon={setIcon} />
          <input type="text" value={title} maxLength={40} onChange={e=>setTitle(e.target.value)} required={true} placeholder="Ex: Do cleaning ..." />
        </div>
        <textarea name="description" rows={4} onChange={e=>setDescription(e.target.value)} placeholder='Describe your todo ...'>{description}</textarea>
        <div className={styles.extension}>
          <label>
            Due on <input name='deadline' value={deadline} type='date' onChange={e=>setDeadline(e.target.value)} />
          </label>
        </div>
        <div className={styles.actions}>
          <button type="submit">Create</button>
          <button onClick={()=>navigate('/')}>Cancel</button>
        </div>
      </form>
      {onAddError && <p className='error'>{onAddError}</p>}
    </>
  )
}

export default AddNew