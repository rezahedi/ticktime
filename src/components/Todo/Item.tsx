import styles from './Item.module.css'
import { TodoProps } from "../../lib/types";
import { calculateRemainedDays } from '../../lib/dates';

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