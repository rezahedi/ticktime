import styles from './Item.module.css'
import { TodoProps } from "../../lib/types";

const convertDateFormat = (date: string): string => {
  const [year, month, day] = date.split('-')
  return `${month}/${day}/${year}`
}

/**
 * @param {string} date format 'mm/dd/yyyy'
 * @returns number
 */
export const calculateRemainedDays = (date: string): number => {
  const currentDate: Date = new Date()
  const inputDate: Date = new Date( convertDateFormat(date) + ' 11:59:59' )

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return 0;
  }
  
  const differenceInMs: number = inputDate.getTime() - currentDate.getTime()
  const differenceInDays: number = Math.round(differenceInMs / (24 * 60 * 60 * 1000));
  return differenceInDays
}

interface ItemProps {
  todoItem: TodoProps,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function Item({ todoItem, onRemoveTodo }: ItemProps) {
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

export default Item