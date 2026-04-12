import React from 'react';
import { motion } from 'framer-motion';

const SummarySection = () => {
  const summaryData = [
    { title: 'Total Users', value: '1,250', change: '+5%' },
    { title: 'Active Projects', value: '32', change: '-2%' },
    { title: 'New Signups', value: '150', change: '+10%' },
    { title: 'Revenue', value: '$12,500', change: '+15%' },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaryData.map((item, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
            <p className={`text-sm ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {item.change}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;