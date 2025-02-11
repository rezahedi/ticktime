import { Link } from "react-router-dom"

const Empty = () => {
  return (
    <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'100%', height: '250px', fontSize: 'large', backgroundColor: '#131314', borderRadius: '1rem'}}>
      <p>Welcome, todo list is empty!</p>
      <Link to='/new'>Create a todo</Link>
    </div>
  )
}

export default Empty