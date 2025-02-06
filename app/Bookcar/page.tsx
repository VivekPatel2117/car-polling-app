import Footer from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import React from 'react'

export default function () {
  return (
    <>
    <Navbar/>
        <div className='grid mt-6 mb-6 grid-cols-3 gap-4 grid-flow-row w-[80vw] place-content-center justify-self-center justify-center'>
        {Array.from({ length: 18 }).map((_, index) => (
            <div key={index} className='h-[50vh] w-full bg-gray-200'>

            </div>
        ))}
        </div>
    <Footer/>
    </>
  )
}
