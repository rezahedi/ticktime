import Skeleton from "../Todo/Skeleton"
import styles from './TimelineView.module.css'

export const TimelineViewSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.timeBlock} style={{border:'none'}}>
        <Skeleton style={{width:'100px',height:'3rem', borderRadius:'1rem'}} />
        <div className={styles.timeContent}>
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
        </div>
      </div>
      <div className={styles.timeBlock} style={{border:'none'}}>
        <Skeleton style={{width:'100px',height:'3rem', borderRadius:'1rem'}} />
        <div className={styles.timeContent}>
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
        </div>
      </div>
      <div className={styles.timeBlock} style={{border:'none'}}>
        <Skeleton style={{width:'100px',height:'3rem', borderRadius:'1rem'}} />
        <div className={styles.timeContent}>
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
          <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
        </div>
      </div>
    </div>
  )
}
