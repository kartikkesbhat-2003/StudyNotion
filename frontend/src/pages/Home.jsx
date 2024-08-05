import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";
import { HighlightText } from '../components/core/HomePage/HighlightText';
import { CTAButton } from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import {CodeBlocks} from "../components/core/HomePage/CodeBlocks"
import { TimelineSection } from '../components/core/HomePage/TimelineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';
import {Footer} from '../components/common/Footer';

export const Home = () => {
  return (
    <div>
        {/* SECTION 1 */}

        <div className=' max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between gap-5'> 

            <Link to={"/signup"}>
                <div className='shadow-[0px_1px_0px_0px_#ffffff4f] group mt-16 p-[3px] mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 hover:shadow-none w-fit'> 
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[8px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowCircleRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7 '>
                Empower Your Future with
                <HighlightText gradient="blue" text={"Coding Skills"} />
            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className=' relative mx-3 my-12 shadow-[5px_-7px_42px_0px_#63b3ed]'>
                <video
                muted 
                loop 
                autoPlay className='shadow-[20px_20px_0px_0px_#ffffff]'>
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>

            {/* Code section 1 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    backgroundGradient={"right-20"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Unlock your
                            <HighlightText gradient="blue" text={"coding potential "} />
                             with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            active:true,
                            linkto:"/signup",
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            active:false,
                            linkto:"/login",
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    />
            </div>

            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    backgroundGradient={"left-20"}
                    heading={
                        <div className='text-4xl font-bold w-[40%]'>
                            Start
                            <HighlightText gradient="blue" text={"coding in seconds"} />
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            active:true,
                            linkto:"/login",
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            active:false,
                            linkto:"/signup",
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    />
            </div>

            <ExploreMore />

        </div>

        {/* SECTION 2 */}

        <div className='bg-pure-greys-5'>

            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-1 justify-between mx-auto'>
                    <div className='h-[250px]'></div>
                    <div className='flex flex-row gap-7 text-white'>

                        <CTAButton active={true} linkto={"/signup"} >
                            <div className='flex items-center gap-2'>
                                Explore Full Catalog
                                <FaArrowCircleRight />
                            </div>
                            
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"} >
                                Learn More
                        </CTAButton>
                    </div>
                </div>



            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between '>

                <div className='flex flex-row gap-5 mb-10 mt-10 justify-between'>

                    <div className='font-inter font-semibold text-4xl w-[45%] '>
                        Get the Skills you need for a
                        <HighlightText gradient="blue" text={"Job that is in demand"} />
                    </div>

                    
                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                        <CTAButton active={true} linkto={'/login'} >
                            Learn More
                        </CTAButton>
                    </div>

                </div>

                <TimelineSection />
             
                <LearningLanguageSection />

            </div>

            

        </div>

        {/* SECTION 3 */}

        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between bg-richblack-900 gap-8 first-letter text-white '>
            <InstructorSection />
            <h2 className='text-center text-4xl mt-10 font-semibold'>Review from other learners.</h2>
            {/* <ReviewSlider /> */}
        </div>


        {/* FOOTER */}

        <Footer/>

        

    </div>
  )
}
