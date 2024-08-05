import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import apiConnector from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import contryCodes from '../../data/countrycode.json';

export const ContactUsForm = () => {

    const [leading, setLeading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState : { errors , isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("LOGGING DATA -> ",data);
        try {
            // const res = await apiConnector("POST", ContactUsEndpoint.CONTACT_US_API, data);
            // console.log("lOGGING RESPONSE -> ",res);
            setLeading(false)
        } 

        catch (error) {
            console.error(error.message);
            setLeading(false)
        }
    }


    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email : "",
                firstName : "",
                lastName : "",
                message: "",
                phoneNumber: "",
            });
        }
    }, [reset, isSubmitSuccessful]);




  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex flex-col gap-6'>
        {/* NAME */}
        <div className="flex justify-between gap-5 ">
          {/* FIRST NAME */}
          <div className="flex flex-col w-full">
            <label htmlFor="firstName"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
            }}
              className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("firstName", { required: true })}
            />
            {errors.firstname && <span>Please enter your first name</span>}
          </div>

          {/* LAST NAME */}
          <div className="flex flex-col w-full">
            <label htmlFor="lastName"
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
              }}
              className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              placeholder="Enter last name"
              {...register("lastName")}
            />
            {errors.firstname && <span>Please enter your last name</span>}
          </div>
        </div>

        {/* EMAIL ADDRESS */}
        <div className='flex flex-col'>
          <label htmlFor="email"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email</span>}
        </div>

        {/* PHONE NUMBER */}
        <div className='flex flex-col gap-2'>

            <label htmlFor="phoneNumber"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Phone Number
            </label>

            <div className='flex flex-row gap-1 text-black'>
                    <select 
                        name="dropDown" 
                        id="dropDown"
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
                        }}
                        className="w-[80px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        {
                            ...register("countryCode", { required: true })
                        }>
                        {
                            contryCodes.map( (element, index) => {
                                return <option key={index} value={element.code} 
                                            className='text-black flex '
                                            >
                                            {element.code} - {element.country }
                                        </option>
                            
                            })
                        }
                    </select>

                    <input 
                        type="number" 
                        name='phoneNumber' 
                        id='phoneNumber' 
                        placeholder='Enter phone number'
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        {
                            ...register("phoneNumber",
                                { 
                                    required: {value: true, message: "Please enter your phone number" }, 
                                    maxLength: {value: 10, message: "Invalid Phone number" },
                                    minLength: {value: 8, message: "Invalid Phone number"}
                                }
                            )
                        }
                    />
            </div>
            {
                errors.phoneNumber && <span>{errors.phoneNumber.message}</span>
            }
        </div>

        {/* MESSAGE */}
        <div className='flex flex-col'>
          <label htmlFor="message" 
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            placeholder="Enter your message"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please enter your message</span>}
        </div>

        <button 
            type="submit"
            className='bg-yellow-50 px-6 text-[16px] font-bold text-black py-3 text-center border rounded-md'>
            Send message
        </button>
      </div>
    </form>
  );
}
