import { useState, useEffect, useRef } from 'react'
import styles from './SelectIcon.module.css'
const ICONS: string[] = [
  '🧘‍♂️', '🏃‍➡️', '🚴', '🛒', '🎉',
  '👨‍💻', '🧪', '📖', '👨‍🏫', '🍕',
  '🛠️', '🎨', '🌱', '🍿', '🎮',
  '🔧', '💞', '🏊', '🥛', '⏰',
]

interface SelectIconProps {
  name: string,
}

function SelectIcon({ name }: SelectIconProps) {
  const [selectedIcon, setSelectedIcon] = useState<string>(ICONS[0])
  const [show, setShow] = useState<boolean>(false)
  const emojisPanel = useRef<HTMLDivElement>(null);

  // Handle Outside click or Esc key pressed for closing the emoji popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojisPanel.current && !emojisPanel.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    setShow(true);
  }

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    setSelectedIcon(e.currentTarget.textContent || ICONS[0]);
    setShow(false);
  }

  return (
    <div className={styles.select} ref={emojisPanel}>
      <input type='hidden' name={name} defaultValue={selectedIcon} />
      <button className={styles.selectBox} onClick={handleOpen}>{selectedIcon}</button>
      <div className={styles.selectOptions} style={{display:`${show?'grid':'none'}`}}>
        {ICONS.map(i=><button key={i} onClick={handleSelect}>{i}</button>)}
      </div>
    </div>
  )
}

export default SelectIcon