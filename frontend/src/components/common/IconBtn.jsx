import React from "react";
import { BsPencilSquare } from "react-icons/bs";


export const IconBtn = ({
    text, 
    onClick,
    children, 
    disabled, 
    outline=false,
    customClasses,
    type,
}) => {
    return (
        <button
            className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50" } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
            disabled={disabled}
            onClick={onClick}
            type={type}
            
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-yellow-50"}`}>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
            <>
            {
                text === "Edit" && <BsPencilSquare />
            }
            </>
        </button>
    )
}
