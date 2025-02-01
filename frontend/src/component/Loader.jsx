import React from 'react'

export default function Loader() {
  return (
    <div className='flex items-center h-[calc(100vh-120px)] w-full justify-center'>
      <div className='w-10 h-10 border-2 border-red-500 border-solid rounded-full animate-spin border-t-transparent'>

      </div>
    </div>
  )
}
