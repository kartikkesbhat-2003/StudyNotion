import React from 'react'

const stats = [
    {
        count: "5K",
        label : "Active Students"
    },
    {
        count: "10+",
        label : "Mentors"
    },
    {
        count: "200+",
        label : "Courses"
    },
    {
        count: "50+",
        label : "Awards"
    }
]

export const StatsComponent = () => {
  return (
    <section className='bg-richblack-800 py-20'>
        <div className='max-w-maxContent mx-auto flex items-center justify-center w-11/12'>
            <div className='w-full flex justify-between items-center '>
                {
                    stats.map( (data, index) => (
                        <div key={index} className='flex flex-col gap-4 items-center w-[25%] '>
                            <h1 className='text-3xl font-semibold'>{data.count}</h1>
                            <h2 className='text-md font-semibold text-richblack-300'>{data.label}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}
