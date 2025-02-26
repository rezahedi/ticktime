import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import styles from './Item.module.css'
import { TodoProps } from "../../lib/types";
import { calculateRemainedDays } from '../../lib/dates';
import { useToast } from '../../context/ToastContext';

interface ItemProps {
  todoItem: TodoProps,
  onDoneTodo: (todo: TodoProps) => Promise<boolean>,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function Item({ todoItem, onDoneTodo, onRemoveTodo }: ItemProps) {
  const days = calculateRemainedDays(todoItem.deadline)
  const [toggle, setToggle] = useState<boolean>(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const { success, error } = useToast()

  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }

  const handleDoneClick = async () => {
    if(isCompleted) return;

    const res = await onDoneTodo(todoItem)
    if(!res) return error('Something with marking todo done went wrong.')
  
    success('Todo marked done, Congratulation.')
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
    <div ref={itemRef}>
      <div className={`${styles.item}`} onClick={handleToggle}>
        <div className={styles.icon}>{todoItem.icon}</div>
        <div className={`${styles.content} ${todoItem.temp ? styles.temporary : ''}`}>
          <div className={`${styles.title} ${isCompleted ? styles.completed : ''}`}>
            {todoItem.title}
          </div>
          <div>
            {renderDueLabel()}
          </div>
          {todoItem.description && todoItem.description!=='' && <p className={toggle ? styles.show : ''}>{todoItem.description}</p>}
          <div className={styles.actions}>
            {!isCompleted &&
              <button className={styles.doneBtn} onClick={handleDoneClick}>Done</button>
            }
            <button className={styles.removeBtn} onClick={handleRemoveClick}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item