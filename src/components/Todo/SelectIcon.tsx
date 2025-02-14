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
  name: string,
}

function SelectIcon({ name }: SelectIconProps) {

  const handleSelectIcon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setIcon(e.target.value)
  }

  return (
    <select className={styles.iconSelector} name={name} onChange={handleSelectIcon}>
      {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
    </select>
  )
}

export default SelectIcon