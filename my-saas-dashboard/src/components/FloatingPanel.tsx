import React from 'react';
import { motion } from 'framer-motion';

const FloatingPanel = () => {
    return (
        <motion.div
            className="fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-md p-4 overflow-hidden"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Video Call</h2>
                <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="Avatar"
                    className="rounded-full w-24 h-24 mb-4 shadow-lg"
                />
                <div className="w-full h-32 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500">Video Placeholder</span>
                </div>
            </div>
        </motion.div>
    );
};

export default FloatingPanel;