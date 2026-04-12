import React from 'react';
import { motion } from 'framer-motion';
import useSidebar from '../hooks/useSidebar';

const Sidebar = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <motion.div
            className={`bg-gray-800 text-white h-full p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
            initial={{ width: 0 }}
            animate={{ width: isOpen ? '16rem' : '4rem' }}
            exit={{ width: 0 }}
        >
            <div className="flex items-center justify-between">
                <h1 className={`text-lg font-bold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Dashboard
                </h1>
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            <nav className="mt-6">
                <ul>
                    <li className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
                        </svg>
                        <span className={`ml-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Home</span>
                    </li>
                    <li className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
                        </svg>
                        <span className={`ml-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Settings</span>
                    </li>
                    {/* Add more items as needed */}
                </ul>
            </nav>
        </motion.div>
    );
};

export default Sidebar;