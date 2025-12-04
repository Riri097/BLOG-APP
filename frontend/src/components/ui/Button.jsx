import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false 
}) => {
  
  // Styles for different button types
  const variants = {
    primary: "bg-primary text-primary hover:opacity-90 shadow-md",
    secondary: "bg-accent text-white hover:opacity-90 shadow-sm",
    ghost: "bg-transparent text-text hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;