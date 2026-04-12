import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import FloatingPanel from './FloatingPanel';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <motion.main
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {children}
        </motion.main>
        <FloatingPanel />
      </div>
    </div>
  );
};

export default Layout;