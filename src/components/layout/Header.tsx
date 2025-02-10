import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header>
      <div className='container'>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'1rem 0 2rem 0'}}>
          <Link className={styles.logo} to="/">
            <img src='./public/ticktime.svg' />
            <div>
              <h1>TickTime</h1>
              <span>Time to tick the todos!</span>
            </div>
          </Link>
          <Link to='https://github.com/rezahedi/ticktime' target='_blank' style={{background:'white',color:'black', padding:'.5rem 1.2rem', borderRadius:'3rem'}}>Github</Link>
        </div>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/new'>Add New</NavLink>
          <NavLink to='/about'>About</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header