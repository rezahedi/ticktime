import { ListView } from '../components/ListViews'
import { TimelineView } from '../components/ListViews'
import AddNew from '../components/Todo/AddNew'
import Skeleton from '../components/Todo/Skeleton'
import { useData } from '../context/DataContext'

const Main = () => {

  const {todoList, isLoading, error, onRemoveTodo} = useData()

  return (
    <>
      <AddNew navigateToHome={false} />
      {isLoading && 
        <div style={{display:'flex', flexDirection:'column', gap:'1.7rem'}}>
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
        </div>
      }
      {error && <p className='error'>{error}</p>}
      <TimelineView todoList={todoList} onRemoveTodo={onRemoveTodo} />
      {!isLoading &&
        <ListView todoList={todoList} onRemoveTodo={onRemoveTodo} />
      }
    </>
  )
}

export default Main