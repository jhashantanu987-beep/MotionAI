import React from 'react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  title: string;
  description: string;
  isHighlighted: boolean;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, isHighlighted, onClick }) => {
  return (
    <motion.div
      className={`rounded-2xl shadow-md transition-shadow duration-300 ${isHighlighted ? 'shadow-lg' : 'hover:shadow-lg'}`}
      onClick={onClick}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 bg-white rounded-2xl ${isHighlighted ? 'border-l-4 border-lime-500' : ''}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default TaskCard;