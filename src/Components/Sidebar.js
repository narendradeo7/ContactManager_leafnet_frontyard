import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import control from './images/control.png';
import logo from './images/logo.png';
import chart from './images/Chart.png';
import usericon from './images/User.png';

const Sidebar = () => {
    // navigate to navigate and location to know on which route we are currently 
    const navigate = useNavigate();
    const location = useLocation();

    //   state to open or close sidebar 
    const [open, setOpen] = useState(true);


    //   to handle contact navigate 
    const handleContact = () => {
        navigate('/');
    };
    // to handle chart navigation 
    const handleChnMap = () => {
        navigate('/graph');
    };

    //   menus to provide in the sidebar 
    const Menus = [
        { title: 'Contacts', src: chart, action: handleContact, route: '/' },
        { title: 'Chart and Maps', src: usericon, action: handleChnMap, route: '/graph' },
    ];

    //   --------------
    return (
        <div
            className={` ${open ? 'w-[35vw] md:w-[16vw]' : 'md:w-[9vw] w-[15vw]'
                } bg-darkpurple  pt-8 relative duration-300 flex flex-col items-center z-[9999]`}
        >
            {/* image for expanding sidebar  */}
            <img
                src={control}
                alt='control icon'
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && 'rotate-180'
                    }`}
                onClick={() => setOpen(!open)}
            />

            {/* div for logo and name  */}

            <div className='flex gap-x-4 items-center'>
                <img
                    src={logo}
                    alt='logo'
                    className={`w-[1.6rem] h-[1.6rem] cursor-pointer duration-500 ${open && 'rotate-[360deg]'} `}
                />
                <h1
                    className={`text-white origin-left font-medium text-xl duration-500 ease-in-out ${!open && 'hidden '}`}
                >
                    Frontyard
                </h1>
            </div>

            {/* ul to show menus  */}

            <ul className='pt-6'>
                {Menus.map((Menu, index) => (
                    <li
                        onClick={Menu.action}
                        key={index}
                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-lightwhite text-white text-sm items-center gap-x-4 ${Menu.route === location.pathname && 'bg-lightwhite'
                            }`}
                    >
                        <img className='w-[1.6rem] h-[1.6rem]' src={Menu.src} alt='icons' />
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>
                            {Menu.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
