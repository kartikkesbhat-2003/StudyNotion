import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import { CTAButton } from './Button'

export const LearningLanguageSection = () => {
  return (
    <div className=' mb-32 '>
        <div className='flex flex-col gap-5 mt-[150px]'>
            <div className='text-4xl font-inter font-semibold text-center'>
                Your Swiss Knife for 
                <HighlightText gradient="blue" text={"learning any language"} />
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base mt-3 w-[70%] font-medium'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={know_your_progress} alt='knowYourProgressImg' className='object-contain -mr-32'/>
                <img src={compare_with_others} alt='compareWithOthersImg' className='object-contain'/>
                <img src={plan_your_lesson} alt='planYourLessonImg'className='object-contain -ml-36' />
            </div>

            <div className='flex items-center justify-center'>
                <CTAButton active={true} linkto={"/login"} >
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>

        </div>
    </div>
  )
}
