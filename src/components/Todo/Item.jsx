import styles from './Item.module.css'
import PropTypes from 'prop-types'
import { todoObjType } from '../../propTypes'

const convertDateFormat = (date) => {
  const [year, month, day] = date.split('-')
  return `${month}/${day}/${year}`
}

/**
 * 
 * @param {string} date format 'mm/dd/yyyy'
 * @returns number
 */
const calculateRemainedDays = (date) => {
  const inputDate = new Date( convertDateFormat(date) + ' 11:59:59' )
  const currentDate = new Date()
  const differenceInMs = inputDate - currentDate
  const differenceInDays = Math.round(differenceInMs / (24 * 60 * 60 * 1000));
  return differenceInDays
}

function Item({ todoItem, onRemoveTodo }) {
  const days = calculateRemainedDays(todoItem.deadline)
  const deadlineMessage = days > 0 ? `${days} days remained` : `${Math.abs(days)} days passed`


  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }
  
  return (
    <div className={styles.item}>
      <span className={todoItem.temp ? styles.temporary : ''}>
        <span className={todoItem.completedAt && styles.completed}>
          {todoItem.icon}
          {todoItem.title}
        </span>
        {(days>0 || days<0) && !todoItem.completedAt &&
          <i className={days>0 ? styles.remainedDeadline : styles.passedDeadline}>{deadlineMessage}</i>
        }
      </span>
      <button onClick={handleRemoveClick}>x</button>
    </div>
  )
}
Item.propTypes = {
  todoItem: PropTypes.shape(todoObjType).isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}
export default Item