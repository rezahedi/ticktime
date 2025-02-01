import { useEffect } from 'react'
import styles from './SelectIcon.module.css'
const ICONS = [
  '🏃‍➡️',
  '🎉',
  '🍵',
  '😵‍💫',
  '🧪',
  '📖',
  '👨‍🏫',
]
import PropTypes from 'prop-types'

function SelectIcon({ setIcon }) {
  useEffect(() => {
    setIcon(ICONS[0])
  }, [])

  const handleSelectIcon = (e) => {
    setIcon(e.target.value)
  }

  return (
    <select className={styles.iconSelector} name='icon' onChange={handleSelectIcon}>
      {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
    </select>
  )
}
SelectIcon.propTypes = {
  setIcon: PropTypes.func.isRequired
}

export default SelectIcon