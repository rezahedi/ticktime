import styles from './Sort.module.css'
interface SortProps {
  title: string,
}

const Sort = (props: SortProps) => {
  const { title } = props

  return (
    <button className={styles.btn}>
      {title}
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.active}>
          <polygon points="50,15 95,75 5,75" stroke='gray' strokeWidth={5} strokeLinejoin='round' />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.inactive}>
          <polygon points="5,15 95,15 50,75" stroke='gray' strokeWidth={5} strokeLinejoin='round' />
        </svg>
      </div>
    </button>
  )
}

export default Sort