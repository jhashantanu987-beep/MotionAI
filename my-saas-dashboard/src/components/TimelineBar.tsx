import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { id: 1, title: 'Task 1', date: '2023-10-01', completed: true },
  { id: 2, title: 'Task 2', date: '2023-10-02', completed: false },
  { id: 3, title: 'Task 3', date: '2023-10-03', completed: false },
  { id: 4, title: 'Task 4', date: '2023-10-04', completed: true },
];

const TimelineBar = () => {
  return (
    <div className="flex flex-col items-start p-4">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>
      <div className="relative w-full">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center mb-4 p-4 rounded-2xl shadow-md ${
              event.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-lime-500 mr-4" />
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimelineBar;