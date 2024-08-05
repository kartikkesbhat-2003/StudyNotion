import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

export const TimelineSection = () => {

    const timeline = [
        {
            logo:logo1,
            heading:"Leadership",
            Description:"Fully commited to the succes commity"
        },
        {
            logo:logo2,
            heading:"Leadership",
            Description:"Fully commited to the succes commity"
        },
        {
            logo:logo3,
            heading:"Leadership",
            Description:"Fully commited to the succes commity"
        },
        {
            logo:logo4,
            heading:"Leadership",
            Description:"Fully commited to the succes commity"
        },
    ]

  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            <div className='relative w-[45%] flex flex-col gap-12 -z-0'>
                <div className=' absolute h-full border-l-2 border-dotted border-blue-200 left-6 -z-10'></div>
                {
                    timeline.map( (element, index) => {
                        return (
                            <div className='flex flex-row gap-7 ' key={index}>

                                <div className='w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center shadow-[0px_1px_2px_0px_#63b3ed] '>
                                    <img src={element.logo}/>
                                </div>

                                <div className=''>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>

                            </div>
                        )
                    })
                }
                
            </div>

            <div className='relative shadow-blue-200'>
                <img src={TimelineImage} alt='timeline image' className='shadow-white object-cover h-fit ' />

                <div className=' absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-6 left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                    <div className='flex flex-row gap-5 items-center border-r-2 border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className=' text-caribbeangreen-300 text-md '>Years of Experience</p>
                    </div>

                    <div className='flex items-center gap-5 px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className=' text-caribbeangreen-300 text-md '>Type of courses</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
