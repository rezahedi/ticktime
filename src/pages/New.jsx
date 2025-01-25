import { Link } from 'react-router-dom'
import AddNew from '../components/Todo/AddNew'

const New = () => {
  return (
    <>
      <Link to="/">Back to Main</Link>
      <AddNew navigateToHome />
    </>
  )
}

export default New