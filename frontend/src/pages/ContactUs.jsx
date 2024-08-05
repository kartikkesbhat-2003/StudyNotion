import React from 'react'
import { ContactUsForm } from '../components/common/ContactUsForm'
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { Footer } from '../components/common/Footer';

export const ContactUs = () => {
  return (
    <div className='text-white w-full'>

        <div className='flex items-start mt-[100px] gap-10 w-11/12 max-w-maxContent mx-auto justify-between mb-[150px]'>

            <div className='flex flex-col justify-start gap-[50px] p-10 w-[40%] bg-richblack-800 rounded-xl'>

                <div className='flex gap-3'>
                    <IoIosChatboxes className='text-3xl text-richblack-300' />
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-semibold'>Chat on us</h2>
                        <p className='font-medium text-md text-richblack-300'>Our friendly team is here to help.</p>
                        <p className='font-semibold text-md text-richblack-300'>@mail address</p>
                    </div>
                </div>

                <div className='flex gap-3'>
                    <FaEarthAfrica className='text-2xl text-richblack-300' />
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-semibold'>Visit us</h2>
                        <p className='font-medium text-md text-richblack-300'>Come and say hello at our office HQ.</p>
                        <p className='font-semibold text-md text-richblack-300'>Here is the location/ address</p>
                    </div>
                </div>

                <div className='flex gap-3'>
                    <IoCall className='text-2xl text-richblack-300' />
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-semibold'>Call us</h2>
                        <p className='font-medium text-md text-richblack-300'>Mon - Fri From 8am to 5pm</p>
                        <p className='font-semibold text-md text-richblack-300'>+123 456 7890</p>
                    </div>
                </div>

            </div>

            <div className='flex flex-col w-[50%] p-12 border border-richblack-600 rounded-lg'>
                <h1 className='text-[1.875rem] font-semibold text-richblack-5 w-[80%]'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='font-medium text-richblack-100 mt-3 mb-8'>Tall us more about yourself and what you’re got in mind.</p>
                <ContactUsForm />
            </div>

        </div>

        <Footer />
    </div>
  )
}
