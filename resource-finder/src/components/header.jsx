import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatDate } from '../utils/commonUtils';
import { useResourcesContext } from '../context/resourceContext';
import { getUserDetails } from '../services/userService';
import { logout } from '../services/authService';

 function Header() {
    console.log('Header component rendered');
    const location = useLocation();
    const { setIsUserLoggedIn, loggedInUser, isUserLoggedIn, setLoggedInUser } = useResourcesContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleAuthAction = () => {
        if (isUserLoggedIn) {
            localStorage.removeItem('user');
            logout();
        } else {
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserDetails();
            setIsUserLoggedIn(true);
            setLoggedInUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        }
        !isUserLoggedIn && fetchUser();
    }, []);
    
    return (
        <header className="full-width h-25 pl-20 pr-20 flex justify-between items-center border-b border-gray-100/20 mb-8">
            <div className="w-3/6 flex flex-start">
                <h1 className="text-4xl font-[700]">
                    <Link to="/" className="hover:text-primary/80 transition-all duration-300">
                        Rekurso
                    </Link>
                </h1>
                <p className="text-sm ml-5 mt-4">Find technical learning resource for developers</p>
            </div>
            <div className="w-3/6 flex justify-end">
                <div className="width-[60%] text-right flex items-center">
                    {formatDate()}
                </div>

               {location.pathname !== "/login" && <div className="relative width-[30%] pl-[10%]">
                    {!isUserLoggedIn ? <button
                        onClick={handleAuthAction}
                        className='bg-accent rounded min-w-24 py-2 text-center'>
                        <span>Login</span>
                    </button> :
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='bg-accent rounded px-2 py-2 text-white flex items-center justify-around max-w-[200px] min-w-[150px] box-border'
                        >
                            <span title={loggedInUser.name} className='block max-w-[155px] truncate'>{loggedInUser.name}</span>
                            <svg
                                className='w-4 h-4 text-white'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 9l-7 7-7-7'
                                />
                            </svg>
                        </button>}
                    {isDropdownOpen && isUserLoggedIn && (
                        <div className='absolute right-0 mt-1 min-w-[150px] bg-primary rounded-lg shadow-xl z-10 overflow-hidden'>
                            <div className='max-h-64 overflow-y-auto hide-scrollbar'>
                                <ul className="bg-white border border-gray-200 rounded-lg shadow-lg text-sm">
                                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer border-b border-gray-200">
                                        <a href="/profile" className="block text-gray-700">Profile</a>
                                    </li>
                                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer border-b border-gray-200">
                                        <a href="/" className="block text-gray-700">All Resources</a>
                                    </li>
                                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer border-b border-gray-200">
                                        <a href="/recommended" className="block text-gray-700">Recommended Resources</a>
                                    </li>
                                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer border-b border-gray-200">
                                        <a href="/popular" className="block text-gray-700">Popular Resources</a>
                                    </li>
                                    <li className="hover:bg-red-100 px-4 py-2 cursor-pointer text-red-600">
                                        <a href="/login" onClick={handleAuthAction} className="block">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>}

            </div>
        </header>
    )
}

export default Header
