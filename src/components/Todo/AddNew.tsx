import styles from './AddNew.module.css'
import { useData } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import SelectIcon from './SelectIcon'

function AddNew() {
  const {onAddNew, onAddError} = useData()
  const navigate = useNavigate()

  const todayDate = new Date().toLocaleDateString("en-CA"); // en-CA return yyyy-mm-dd format that input type date needs!
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Using formData API, controlled components cause re-render
    const formData = new FormData( e.target as HTMLFormElement );
    const {title, description, icon, deadline} = Object.fromEntries(formData.entries()) as { [key: string]: string }

    const res = await onAddNew({
      title,
      description,
      icon,
      deadline,
    })
    res && navigate('/')
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmission}>
        <div className={styles.mainRow}>
          <SelectIcon name='icon' />
          <input name='title' type="text" maxLength={40} required={true} placeholder="Ex: Do cleaning ..." />
        </div>
        <textarea name="description" rows={4} placeholder='Describe your todo ...'></textarea>
        <div className={styles.extension}>
          <label>
            Due on <input name='deadline' defaultValue={todayDate} type='date' />
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