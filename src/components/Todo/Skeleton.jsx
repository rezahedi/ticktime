/* eslint-disable react/prop-types */
import './Skeleton.css'

export default function Skeleton({
  width = 'auto',
  height = 'auto'
}) {
  return (
    <div style={{width, height}}>
      <div className='loading-skeleton'></div>
    </div>
  )
}
