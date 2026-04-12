import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-2xl"
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Title</h1>
            <div className="flex space-x-4">
                <div className="flex items-center">
                    <span className="text-gray-600">Stat 1: 100</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-600">Stat 2: 200</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-600">Stat 3: 300</span>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;