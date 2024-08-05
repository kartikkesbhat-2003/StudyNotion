import React from 'react'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import { Quote } from '../components/core/AboutPage/Quote'
import { StatsComponent } from '../components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactFormSection } from '../components/core/AboutPage/ContactFormSection'
import { Footer } from '../components/common/Footer'
import FoundingStory from '../assets/Images/FoundingStory.png'

export const About = () => {
  return (
    <div className='text-white '>

        <section className='bg-richblack-800 '>
            <div className='max-w-maxContent mx-auto flex flex-col w-11/12 items-center text-white justify-between gap-5  '>
                <p className='text-center text-lg font-bold text-richblack-300 mt-[100px]'>About us</p>
                <header className='text-center text-4xl font-semibold text-white mt-7 lg:w-[70%]'>
                    Driving Innovation in Online Education for a
                    <HighlightText gradient="blue" text={`Brighter Future`} />
                </header>
                <p className='w-[74%] text-center text-lg font-bold text-richblack-300 mt-4 mb-[250px] '>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
                <div className='absolute bottom-[280px] w-[300px] h-[1px] bg-[#ed8936]-10 shadow-[0px_0px_100px_10px_#ed8936] rounded-[50%]  '></div>
                <div className='absolute -bottom-8 flex justify-between gap-8 '>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
            </div>
                
        </section>

        <section className='border-b border-richblack-300'>
            <div className='flex items-center justify-center '>
                <Quote />
            </div>
        </section>

        <section>
            <div className='flex flex-col gap-[100px] my-20'>
                <div className='max-w-maxContent mx-auto flex gap-10 w-11/12 justify-between items-center text-white'>
                    <div className='flex flex-col gap-3 w-[50%] p-6'>
                        <div className='text-4xl mb-6'>
                            <HighlightText gradient="red" text={`Our Founding Story`} className="text-4xl" />
                        </div>
                        
                        <p className='text-lg font-semibold text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='text-lg font-semibold text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className='w-[50%] p-6'>
                        <img src={FoundingStory} />
                    </div>
                </div>
                <div className='max-w-maxContent mx-auto flex gap-10 w-11/12 justify-between items-center text-white'>
                    <div className='flex flex-col gap-3 w-[50%] p-6'>
                        <div className='text-4xl mb-6'>
                            <HighlightText gradient={`orange`} text={`Our Vision`} />
                        </div>
                        <p className='text-lg font-semibold text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='flex flex-col gap-3 w-[50%] p-6'>
                        <div className='text-4xl mb-6'>
                            <HighlightText gradient={`blue`} text={`Our Mission`} />
                        </div>
                        <p className='text-lg font-semibold text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        <StatsComponent />

        <section className='mx-auto flex flex-col items-center justify-center mb-[140px] '>
            <LearningGrid />
            <ContactFormSection />
        </section>

        <section>
            <div>
                Reviews from other learners
                {/* <ReviewSlider /> */}
            </div>
        </section>

        {/* footer*/}
        <Footer />

    </div>
  )
}
