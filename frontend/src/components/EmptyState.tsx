import React from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  message: string;
  onRefresh: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, onRefresh }) => {
  return (
    <motion.div 
      className="text-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
        <RefreshCw className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-500 mb-4">Try refreshing to fetch available time slots.</p>
      <button
        onClick={onRefresh}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </button>
    </motion.div>
  );
};