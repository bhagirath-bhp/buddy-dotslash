import React from 'react'

const FloatingIcon = () => {
  return (
    <div className='top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%]'>
      <img src="/images/carrot.png" alt="icon" className='animate-bounce-slow invert h-[40px] w-[40px]' />
    </div>
  )
}

export default FloatingIcon