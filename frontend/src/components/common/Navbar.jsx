import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io";

export const Navbar = () => {

    const {token} = useSelector((state) => state.auth );
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            console.log(result.data.allCategories) 
            setSubLinks(result.data.allCategories);
        }

        catch(err) {
            console.log(err)
        }
    }

    useEffect( () => {
        fetchSubLinks();
    }, [])
 

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            {/* logo image */}
            <Link to={"/"} >
                <img src={logo} width={160} height={42} loading='lazy' alt='logo_Image'/>         
            </Link>

            {/* nav links */}
            <nav>

                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => {
                            return (
                                <li key={index} >
                                    {
                                        link.title === "Catalog" ?
                                         (<div className='group relative flex cursor-pointer items-center gap-1 text-richblack-25'>
                                            <p>{link?.title}</p>
                                            <IoIosArrowDropdownCircle />

                                            <div className=' invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                            flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                                            group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>



                                                <div className=' absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'>
                                                </div> 
                                                
                                                {
                                                    subLinks.length ? (
                                                            subLinks.map( (subLink) => (
                                                                <Link to={`/catalog/${subLink.name}`} key={subLink._id}>
                                                                    <p className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">{subLink.name} </p>
                                                                </Link>
                                                            ))
                                                    ) : (<div></div>)
                                                }


                                            </div>
                                            
                                         </div>) : 
                                         (<Link to={link?.path} >
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link?.title}
                                            </p>
                                         </Link>)
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                
            </nav>

            {/* login / signup / dashboard */}

            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to='/dashboard/cart' className='relative'>
                            <FaShoppingCart className='text-richblack-5' />
                             {
                                totalItems > 0 &&  (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                             }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md  '>
                                Longin
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md  '>
                                Sign up
                            </button>
                        </Link>
                    )
                }
                {
                    token != null && (
                        <ProfileDropDown />
                    )
                }
            </div>


        </div>
    </div>
  )
}
