import Item from "../Todo/Item"
import itemStyles from '../Todo/Item.module.css'
import styles from './TimelineView.module.css'

const fakeData = [
  {
    id: '123456',
    title: 'Buy groceries',
    deadline: new Date('2025-02-10').toDateString(),
    completedAt: '',
    icon: '🛒'
  },
  {
    id: '234567',
    title: 'Finish React assignment',
    deadline: new Date('2025-02-10').toDateString(),
    completedAt: '',
    icon: '💻'
  },
  {
    id: '345678',
    title: 'Call mom',
    deadline: new Date('2025-02-5').toDateString(),
    completedAt: '',
    icon: '📞'
  },
  {
    id: '456789',
    title: 'Gym workout',
    deadline: new Date('2025-02-6').toDateString(),
    completedAt: '',
    icon: '🏋️'
  },
  {
    id: '567890',
    title: "Valentine's dinner",
    deadline: new Date('2025-02-6').toDateString(),
    completedAt: '',
    icon: '🍽️'
  },
]

export const TimelineView = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.timeBlock} style={{borderColor:'#DC3545'}}>
        <h3 style={{color:'#DC3545'}}>
          Past Due
        </h3>
        <div className={styles.timeContent}>
          <div className={itemStyles.item}>
            <span>💀 14 passed due items, click to see them.</span>
          </div>
        </div>
      </div>
      <div className={styles.timeBlock} style={{borderColor:'#28A745'}}>
        <h3 style={{color:'#28A745'}}>
          Today
          <i>3 Mar</i>
        </h3>
        <div className={styles.timeContent}>
          {fakeData.map(todo => 
            <Item key={todo.id} todoItem={todo} onRemoveTodo={async ()=>{await 0;}} />
          )}
        </div>
      </div>
      <div className={styles.timeBlock} style={{borderColor:'#FFD700'}}>
        <h3 style={{color:'#FFD700'}}>
        Coming Up
        </h3>
        <div className={styles.timeContent}>
          {fakeData.map(todo => 
            <Item key={todo.id} todoItem={todo} onRemoveTodo={async ()=>{await 0;}} />
          )}
        </div>
      </div>
    </div>
  )
}

export default TimelineView