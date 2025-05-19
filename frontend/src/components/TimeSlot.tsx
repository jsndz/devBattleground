import React, { useState } from 'react';
import { TimeSlot as TimeSlotType } from '../types';
import { BookForm } from './BookForm';
import { motion } from 'framer-motion';

interface TimeSlotProps {
  slot: TimeSlotType;
  onBook: (name: string, time: string) => Promise<void>;
  onCancel: (time: string) => Promise<void>;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ slot, onBook, onCancel }) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBook = async (name: string) => {
    setIsLoading(true);
    try {
      await onBook(name, slot.time);
      setShowForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await onCancel(slot.time);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColor = slot.isBooked ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300';
  const statusText = slot.isBooked ? 'Booked' : 'Available';

  return (
    <motion.div
      className={`rounded-lg ${statusColor} border p-4 shadow-sm transition-all`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{slot.time}</h3>
          <p className={`text-sm ${slot.isBooked ? 'text-red-600' : 'text-green-600'} font-medium`}>
            {statusText}
          </p>
          {slot.isBooked && (
            <p className="text-sm text-gray-600 mt-1">Booked by: {slot.bookedBy}</p>
          )}
        </div>
        <div>
          {!slot.isBooked ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50"
              onClick={() => setShowForm(true)}
              disabled={isLoading}
            >
              Book
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? 'Canceling...' : 'Cancel'}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <BookForm 
          onBook={handleBook} 
          onCancel={() => setShowForm(false)} 
          isLoading={isLoading} 
        />
      )}
    </motion.div>
  );
};