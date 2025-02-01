import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: string,
  height?: string,
}

export default function Skeleton({
  width = 'auto',
  height = 'auto'
}: SkeletonProps) {
  return (
    <div style={{width, height}}>
      <div className={styles.skeleton}></div>
    </div>
  )
}