import { useContext } from 'react'
import List from '../components/Todo/List'
import AddNew from '../components/Todo/AddNew'
import Skeleton from '../components/Todo/Skeleton'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Main = () => {

  const {todoList, isLoading, error, onRemoveTodo} = useContext(DataContext)

  return (
    <>
      <Link to="/new">
        <button>Add New</button>
      </Link>
      <AddNew navigateToHome={false} />
      {isLoading && 
        <div style={{display:'flex', flexDirection:'column', gap:'1.7rem'}}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      }
      {error && <p className='error'>{error}</p>}
      {!isLoading &&
        <List todoList={todoList} onRemoveTodo={onRemoveTodo} />
      }
    </>
  )
}

export default Main