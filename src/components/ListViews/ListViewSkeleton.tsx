import Skeleton from "../Todo/Skeleton"

export const ListViewSkeleton = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'1.7rem'}}>
      <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
      <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
      <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
      <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
      <Skeleton style={{height:'3rem', borderRadius:'1rem'}} />
    </div>
  )
}
