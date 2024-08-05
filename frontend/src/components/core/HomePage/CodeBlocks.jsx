import React from 'react'
import { HighlightText } from './HighlightText'
import { CTAButton } from './Button'
import { FaArrowCircleRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


export const CodeBlocks = ({
  position, heading, subheading , ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`relative flex flex-row ${position} my-20 justify-between gap-10 `}>

        {/* section 1 */}
        <div className='w-[50%] flex flex-col gap-8 '>
          {heading}
          <div className='text-richblack-300 font-bold'>
            {subheading}
          </div>
          <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
              </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                {ctabtn2.btnText}
            </CTAButton>
          </div>
        </div>

        {/* section 2 - code block */}

        <div className={`absolute w-[300px] h-[200px] rounded-[50%] shadow-[0px_0px_60px_20px_#f65e5e70] bg-[#f65e5e70] ${backgroundGradient}`}></div>

        <div className=' w-[100%] h-fit flex flex-row text-10[px] py-4 lg:w-[500px] bg-white/10 backdrop-blur-md border-2 border-white/30'>
          {/* HW - Background gradient */}


          <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold '>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>4</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          <div className={`flex flex-col gap-2 w-[90%] font-bold font-mono ${codeColor} pr-2`}>
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              style={
                {
                  whiteSpace: "pre-line",
                  display: "block"
                }
              }
              omitDeletionAnimation={true}
            />
          </div>

        </div>

    </div>
  )
}
