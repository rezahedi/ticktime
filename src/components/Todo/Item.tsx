import { useState } from 'react'
import styles from './Item.module.css'
import { TodoProps } from "../../lib/types";
import { calculateRemainedDays } from '../../lib/dates';

interface ItemProps {
  todoItem: TodoProps,
  onDoneTodo: (todo: TodoProps) => Promise<void>,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function Item({ todoItem, onDoneTodo, onRemoveTodo }: ItemProps) {
  const days = calculateRemainedDays(todoItem.deadline)
  const [toggle, setToggle] = useState<boolean>(false)


  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }

  const handleDoneClick = async () => {
    if(isCompleted) return;
    
    await onDoneTodo(todoItem)
    console.log('done', todoItem)
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const isCompleted = todoItem.completedAt

  const renderDueLabel = () => {
    if(isCompleted) return;

    if( days < 0 )
      return <i className={styles.passedDeadline}>{Math.abs(days)} days passed</i>

    return <i className={styles.remainedDeadline}>{days>0 ? `${days} days remained` : `Due today`}</i>
  }

  return (
    <div className={styles.item} onClick={handleToggle}>
      <div className={styles.icon}>{todoItem.icon}</div>
      <div className={`${todoItem.temp ? styles.temporary : ''} ${styles.content}`}>
        <div className={`${isCompleted ? styles.completed : ''} ${styles.title}`}>
          {todoItem.title}
        </div>
        <div>
          {renderDueLabel()}
        </div>
        <p className={toggle ? styles.show : ''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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