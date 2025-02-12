import styles from './Item.module.css'
import { TodoProps } from "../../lib/types";
import { calculateRemainedDays } from '../../lib/dates';

interface ItemProps {
  todoItem: TodoProps,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function Item({ todoItem, onRemoveTodo }: ItemProps) {
  const days = calculateRemainedDays(todoItem.deadline)
  const deadlineMessage = days > 0 ? `${days} days remained` : days===0 ? `Due today` : `${Math.abs(days)} days passed`


  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }

  const handleDoneClick = () => {
    // TODO: call onDoneTodo()
    console.log('done', todoItem)
  }

  const isCompleted = todoItem.completedAt

  const renderDueLabel = () => {
    if(isCompleted) return;

    if( days < 0 )
      return <i className={styles.passedDeadline}>{Math.abs(days)} days passed</i>

    return <i className={styles.remainedDeadline}>{days>0 ? `${days} days remained` : `Due today`}</i>
  }

  return (
    <div className={styles.item}>
      <div className={styles.icon}>{todoItem.icon}</div>
      <div className={`${todoItem.temp ? styles.temporary : ''} ${styles.content}`}>
        <div className={`${isCompleted ? styles.completed : ''} ${styles.title}`}>
          {todoItem.title}
        </div>
        <div>
          {renderDueLabel()}
        </div>
        {todoItem.description && todoItem.description!=='' && <p>s{todoItem.description}</p>}
        <div className={styles.actions}>
          {!isCompleted &&
            <button className={styles.doneBtn} onClick={handleDoneClick}>Done</button>
          }
          <button className={styles.removeBtn} onClick={handleRemoveClick}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Item