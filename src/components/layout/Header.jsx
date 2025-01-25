import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header style={{margin: '2rem auto', width:'100%', borderBottom:'1px solid white'}}>
      <h1>
        <Link to="/">Tick Time</Link>
      </h1>
      <nav style={{display:'flex', gap:'1rem'}}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/new'>Add New</NavLink>
      </nav>
    </header>
  )
}

export default Header