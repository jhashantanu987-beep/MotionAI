import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  avatarUrl: string;
  name: string;
  tags: string[];
}

const LeadCard: React.FC<LeadCardProps> = ({ avatarUrl, name, tags }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center"
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 20 }}
    >
      <img
        src={avatarUrl}
        alt={name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex space-x-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-lime-500 text-white text-xs font-medium rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LeadCard;