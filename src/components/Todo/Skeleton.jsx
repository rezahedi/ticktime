/* eslint-disable react/prop-types */
import styles from './Skeleton.module.css'

export default function Skeleton({
  width = 'auto',
  height = 'auto'
}) {
  return (
    <div style={{width, height}}>
      <div className={styles.skeleton}></div>
    </div>
  )
}
