import { useState } from "react"
import { calculateRemainedDays } from "../../lib/dates"
import { TodoProps } from "../../lib/types"
import Item from "../Todo/Item"
import itemStyles from '../Todo/Item.module.css'
import styles from './TimelineView.module.css'

interface ListProps {
  todoList: TodoProps[],
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

export const TimelineView = ({ todoList, onRemoveTodo }: ListProps) => {
  const [showPastDue, setShowPastDue] = useState<boolean>(false)
  const [showCompleted, setShowCompleted] = useState<boolean>(false)

  const pastDueTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return !todo.completedAt && days<0
  })

  const todayTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return !todo.completedAt && days===0
  })

  const completedTodayTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return todo.completedAt && days===0
  })

  const comingTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return !todo.completedAt && days>=1
  })

  const allCompletedTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return todo.completedAt
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.timeBlock} style={{borderColor:'#DC3545'}}>
        <h3 style={{color:'#DC3545'}}>
          Past Due
        </h3>
        <div className={styles.timeContent}>
          {!showPastDue &&
            <div className={itemStyles.item} onClick={() => setShowPastDue(true)}>
              <span>💀 {pastDueTodos.length} passed due items, click to see them.</span>
            </div>
          }
          {showPastDue &&
            <>
              {pastDueTodos.map(todo => 
                <Item key={todo.id} todoItem={todo} onRemoveTodo={async ()=>{await 0;}} />
              )}
            </>
          }
        </div>
      </div>
      <div className={styles.timeBlock} style={{borderColor:'#28A745'}}>
        <h3 style={{color:'#28A745'}}>
          Today
          <i>3 Mar</i>
        </h3>
        <div className={styles.timeContent}>
          {todayTodos.map(todo => 
            <Item key={todo.id} todoItem={todo} onRemoveTodo={async ()=>{await 0;}} />
          )}
          {completedTodayTodos.length>0 &&
            <p>{completedTodayTodos.length} todos done.</p>
          }
        </div>
      </div>
      <div className={styles.timeBlock} style={{borderColor:'#FFD700'}}>
        <h3 style={{color:'#FFD700'}}>
        Coming Up
        </h3>
        <div className={styles.timeContent}>
          {comingTodos.map(todo => 
            <Item key={todo.id} todoItem={todo} onRemoveTodo={async ()=>{await 0;}} />
          )}
        </div>
      </div>
      <div className={styles.timeBlock} style={{borderColor:'#B0BEC5'}}>
        <h3 style={{color:'#B0BEC5'}}>
        Completed
        </h3>
        <div className={styles.timeContent}>
          {!showCompleted && 
            <div className={itemStyles.item} onClick={()=>setShowCompleted(true)}>
              <span>🎉 {allCompletedTodos.length} todos done so far, click to see them.</span>
            </div>
          }
          {showCompleted && 
            <>
              {allCompletedTodos.map(todo => 
                <Item key={todo.id} todoItem={todo} onRemoveTodo={async ()=>{await 0;}} />
              )}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default TimelineView