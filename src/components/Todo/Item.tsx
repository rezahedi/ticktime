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
  const [isHiding, setIsHiding] = useState<boolean>(false)

  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }

  const handleDoneClick = async () => {
    if(isCompleted) return;

    setIsHiding(true)
    // Wait time for 300s hiding animation
    await setTimeout(()=>onDoneTodo(todoItem), 300)
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
    <div className={`${styles.item} ${isHiding ? styles.hidingAnimation : ''}`} onClick={handleToggle}>
      <div className={styles.icon}>{todoItem.icon}</div>
      <div className={`${styles.content} ${todoItem.temp ? styles.temporary : ''}`}>
        <div className={`${styles.title} ${isCompleted ? styles.completed : ''}`}>
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