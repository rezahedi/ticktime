import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Tick Time</Link>
      </h1>
    </header>
  )
}

export default Header