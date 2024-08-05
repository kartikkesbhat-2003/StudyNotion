import React from 'react'
import { ContactUsForm } from '../../common/ContactUsForm'

export const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
        <h1 className='text-[1.875rem] font-semibold text-richblack-5 text-center'>Get in Touch</h1>
        <p className='font-medium text-richblack-100 text-center mt-3'>
            We’d love to here for you, Please fill out this form.
        </p>

        <div className='mt-[50px]'>
            <ContactUsForm />
        </div>

    </div>
  )
}
