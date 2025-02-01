import { useEffect } from 'react'
import styles from './SelectIcon.module.css'
const ICONS: string[] = [
  '🏃‍➡️',
  '🎉',
  '🍵',
  '😵‍💫',
  '🧪',
  '📖',
  '👨‍🏫',
]

interface SelectIconProps {
  setIcon: (icon: string) => void,
}

function SelectIcon({ setIcon }: SelectIconProps) {
  useEffect(() => {
    setIcon(ICONS[0])
  }, [])

  const handleSelectIcon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIcon(e.target.value)
  }

  return (
    <select className={styles.iconSelector} name='icon' onChange={handleSelectIcon}>
      {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
    </select>
  )
}

export default SelectIcon