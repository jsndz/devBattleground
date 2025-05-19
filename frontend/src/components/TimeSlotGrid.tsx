import React from 'react';
import { TimeSlot as TimeSlotType } from '../types';
import { TimeSlot } from './TimeSlot';
import { motion } from 'framer-motion';

interface TimeSlotGridProps {
  slots: TimeSlotType[];
  onBook: (name: string, time: string) => Promise<void>;
  onCancel: (time: string) => Promise<void>;
  isLoading: boolean;
}

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ 
  slots, 
  onBook, 
  onCancel,
  isLoading
}) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {isLoading && slots.length === 0 ? (
        Array.from({ length: 7 }).map((_, index) => (
          <div 
            key={index} 
            className="rounded-lg bg-gray-100 border border-gray-200 p-4 shadow-sm animate-pulse h-32"
          />
        ))
      ) : (
        slots.map((slot) => (
          <TimeSlot
            key={slot.time}
            slot={slot}
            onBook={onBook}
            onCancel={onCancel}
          />
        ))
      )}
    </motion.div>
  );
};