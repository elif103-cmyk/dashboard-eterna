import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#366824" strokeWidth="6" />
            <path d="M50 20V80M20 50H80" stroke="#366824" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="10" fill="#bb8585" />
        </svg>
        <span className="font-serif font-bold text-2xl text-eterna-primary tracking-tight">ETERNA</span>
    </div>
  );
};