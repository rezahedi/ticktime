import styles from './Sort.module.css'
import { useSearchParams } from 'react-router-dom'

interface SortProps {
  title: string,
}

const Sort = (props: SortProps) => {
  const { title } = props
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || ''
  const [ field, order ] = sort.split(',')

  const isActive = field.toLocaleLowerCase() === title.toLocaleLowerCase()
  const isAscending = order === 'asc'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isActive) {
      setSearchParams({ sort: `${field},${isAscending ? 'desc' : 'asc'}` })
    } else {
      setSearchParams({ sort: `${title.toLocaleLowerCase()},asc` })
    }
  }

  return (
    <button className={isActive ? styles.btnActive :  styles.btn} onClick={handleClick}>
      {title}
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={isActive && isAscending ? styles.active : styles.inactive}>
          <polygon points="50,15 95,75 5,75" strokeWidth={5} strokeLinejoin='round' />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={isActive && !isAscending ? styles.active : styles.inactive}>
          <polygon points="5,15 95,15 50,75" strokeWidth={5} strokeLinejoin='round' />
        </svg>
      </div>
    </button>
  )
}

export default Sort