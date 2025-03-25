import React from 'react'
import Logo from "../../assets/logo.png"
import { IoMdCart, IoMdSearch } from 'react-icons/io'
import DarkMode from './DarkMode'
import { FaRegCaretSquareDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Menu = [
    {
        id:1,
        name:"Home",
        link:"/"
    },
    {
        id:2,
        name:"Top Rated",
        link:"/top-rated"
    },
    {
        id:3,
        name:"Kids Wear",
        link:"/kids-wear"
    },
    {
        id:4,
        name:"Mens Wear",
        link:"/mens-wear"
    },
    {
        id:5,
        name:"Electronics",
        link:"/electronics"
    },
//     {
//         id:6,
//         name:"Trending Product",
//         link:"/#"
//     }
]

const DropdownLinks = [
    {
        id:1,
        name:"Trending Products",
        link:"/#"
    },
    {
        id:2,
        name:"Best Selling",
        link:"/#"
    },
    {
        id:3,
        name:"Top Rated",
        link:"/#"
    },
]
const Navbar = ({handleOrderPopup}) => {
  return (
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
        {/* Upper Navbar */}
        <div className='bg-primary/40 py-2'>
            <div className='container flex justify-between items-center'>
                <div>
                    <Link to="/" className='font-bold text-2xl sm:text-3xl flex gap-2'>
                       <img src={Logo} alt="Logo" className='w-10'/> 
                       Shopsy
                    </Link>
                </div>
                {/* Search bar and order button */}
                <div className='flex items-center justify-between gap-4'>
                    <div className='relative hidden sm:flex items-center group focus-within:border-blue-200'>
                        <input type="text" placeholder="Search" className='w-48 sm:w-48 group-hover:w-80 
                        focus:border-primary 
                        focus:outline-none focus:border-1
                        transition-all duration-300 rounded-xl border
                         border-gray-300 px-2 py-1
                         dark:border-gray-500
                         dark:bg-gray-800 dark:focus:border-primary'/>
                        <IoMdSearch className='absolute right-3 text-gray-500 
                        group-hover:text-primary group-focus:text-primary'/>
                    </div>
                    <button 
                    onClick={()=> handleOrderPopup()}
                    className='text-white group flex justify-between items-center gap-2 bg-gradient-to-r from-primary to-secondary transition-all duration-200 p-2 rounded-xl'>
                        <span className='hidden group-hover:flex text-white drop-shadow-sm cursor-pointer'>My cart</span>
                        <IoMdCart className='text-xl'/> 
                    </button>
                    {/* Darkmode switcher */}
                    <div><DarkMode/></div>
                </div>
            </div>
        </div>
        {/* Lower navbar */}
        <div className='flex justify-center'>
            <ul className='hidden sm:flex justify-between gap-4 items-center'>
                {
                    Menu.map((data)=>(
                        <li key={data.id}><Link to={data.link} className='inline-block px-4 hover:text-primary duration-200'>{data.name}</Link></li>
                    ))
                }
                {/* Simple dropdown */}
                <li className='group relative cursor-pointer'>
                    <Link to="#" className='group flex items-center gap-[2px] py-2 hover:text-primary'>
                        Trending Products
                        <span className=''>
                            <FaRegCaretSquareDown className='transition-all duration-200 group-hover:rotate-180'/>
                        </span>
                    </Link>
                    <div className='absolute z-[9999] hidden group-hover:block w-44 rounded-md bg-white p-2 text-black shadow-md'>
                        <ul>
                            {
                                DropdownLinks.map((data)=>(
                                    <li key={data.id} className=''>
                                        <Link to={data.link}
                                        className='hover:bg-primary/20 inline-block w-full rounded-md p-2'>
                                            {data.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar