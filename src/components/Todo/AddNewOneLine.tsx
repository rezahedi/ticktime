import styles from './AddNew.module.css'
import { useData } from '../../context/DataContext'
import SelectIcon from './SelectIcon'
import { useToast } from '../../context/ToastContext'

function AddNewOneLine() {
  const {onAddNew, onAddError} = useData()
  const { error, success } = useToast()

  const todayDate = new Date().toLocaleDateString("en-CA"); // en-CA return yyyy-mm-dd format that input type date needs!
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Using formData API, controlled components cause re-render
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData( formElement );
    const {title, icon} = Object.fromEntries(formData.entries()) as { [key: string]: string }

    const res = await onAddNew({
      title,
      icon,
      description:'',
      deadline: todayDate,
    })
    if(!res) return error('Something went wrong, try again.')

    success('Todo created with due date today.')
    formElement.reset();
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmission}>
        <div className={styles.mainRow}>
          <SelectIcon name='icon' />
          <input name='title' type="text" maxLength={40} required={true} placeholder="Ex: Do cleaning ..." />
          <button type="submit">Create</button>
        </div>
      </form>
      {onAddError && <p className='error'>{onAddError}</p>}
    </>
  )
}

export default AddNewOneLine