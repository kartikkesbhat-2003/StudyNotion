import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({children, active, linkto, shadow}) => {
  return (
    <Link to={linkto}>

        <div className={`shadow-[inset_-2px_-2px_0px_0px_#404650] text-center text-[13px] px-6 py-3 rounded-md font-bold hover:shadow-none
            ${active ? "bg-yellow-50 text-black" : "bg-richblack-800" } hover:scale-95 transition-all duration-200`}>
            {children}
        </div>

    </Link>
  )
}
