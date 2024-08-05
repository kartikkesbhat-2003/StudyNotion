import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

export const Quote = () => {
  return (
    <div className='max-w-maxContent mx-auto text-center mt-[200px] mb-[100px] font-inter font-semibold text-4xl text-richblack-50'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText gradient="blue" text={`combines technology`} />,
        <span className='text-[#fb7500]'>expertise</span>
        , and community to create an 
        <HighlightText gradient="orange" text={`unparalleled educational experience.`} />
    </div>
  )
}

