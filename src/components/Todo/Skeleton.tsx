import styles from './Skeleton.module.css'

interface SkeletonProps {
  style?: React.CSSProperties,
}

export default function Skeleton({
  style = {},
}: SkeletonProps) {
  return (
    <div style={style} className={styles.skeleton}></div>
  )
}