import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header style={{width:'100%', borderBottom:'1px solid white', backgroundColor:'#131314'}}>
      <div className='container' style={{padding:'0 1rem'}}>
        <h1>
          <Link to="/">Tick Time</Link>
        </h1>
        <nav style={{display:'flex', gap:'1rem'}}>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/new'>Add New</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header