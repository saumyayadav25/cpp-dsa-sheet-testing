'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  gradient?: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  onClick?: () => void;
}

const gradientClasses = {
  blue: 'from-blue-500/10 to-cyan-500/10',
  green: 'from-green-500/10 to-emerald-500/10',
  purple: 'from-purple-500/10 to-violet-500/10',
  orange: 'from-orange-500/10 to-amber-500/10',
  pink: 'from-pink-500/10 to-rose-500/10',
};

export function EnhancedCard({ 
  children, 
  className = '', 
  gradient = 'blue', 
  onClick 
}: EnhancedCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        rotateX: 2,
        rotateY: 2,
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 0.8
      }}
      className={`relative group cursor-pointer bg-card/50 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-md transition-all duration-500 ease-out overflow-hidden transform-gpu will-change-transform ${className}`}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${gradientClasses[gradient]} transition-opacity duration-300 rounded-2xl`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Border glow effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br ${gradientClasses[gradient]} blur-xl -z-10 transition-opacity duration-300`} />
    </motion.div>
  );
}
