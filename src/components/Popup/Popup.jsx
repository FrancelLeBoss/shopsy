import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const Popup = ({orderPopup, setOrderPopup}) => {
  return (
    <>
        {
            orderPopup && (
                <div className='popup'>
                    <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm z-50'>
                        <div className='fixed top-1/2 left-1/2 -translate-y-1/2 p-4 shadow-md bg-white
                         dark:bg-gray-900 rounded-md duration-200 w-[300px]'> 
                        {/* Header */}
                            <div className='flex items-center justify-between'>
                                <h1 className=''>Order Now</h1>
                                <div>
                                    <IoCloseOutline className='text-2xl cursor-pointer' onClick={()=>setOrderPopup()}/>
                                </div>
                            </div>
                            <div className='mt-4'>
                            <input type="text" 
                            placeholder='Name'
                            className='w-full rounded-2xl border border-gray-300 dark:border-gray-500
                            dark:bg-gray-800 px-3 py-2 focus:outline-primary/20 focus:outline-1 mb-4'/>
                            <input type="text" 
                            placeholder='Email'
                            className='w-full rounded-2xl border border-gray-300 dark:border-gray-500
                            dark:bg-gray-800 px-3 py-2 focus:outline-primary/20 focus:outline-1 mb-4'/>
                            <input type="text" 
                            placeholder='Address'
                            className='w-full rounded-2xl border border-gray-300 dark:border-gray-500
                            dark:bg-gray-800 px-3 py-2 focus:outline-primary/20 focus:outline-1 mb-4'/>
                            </div>
                            <div className='flex items-center justify-center group'>
                                <button onClick={()=>setOrderPopup()} className='text-white rounded-xl px-3 py-2 bg-primary hover:scale-105 
                                '>Order now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Popup