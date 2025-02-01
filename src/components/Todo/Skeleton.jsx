import styles from './Skeleton.module.css'
import PropTypes from 'prop-types'

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
Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}