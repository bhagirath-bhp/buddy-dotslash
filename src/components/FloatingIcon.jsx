import React from 'react'

const FloatingIcon = () => {
  return (
    <div className='top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%]'>
      <img src="/images/carrot.png" alt="icon" className='animate-bounce-slow invert h-[60px] w-[60px]' />
      <span className="loader"></span>
    </div>
  )
}

export default FloatingIcon