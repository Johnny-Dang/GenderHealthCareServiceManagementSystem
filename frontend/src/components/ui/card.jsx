import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'default',
  shadow = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg transition-all duration-200';
  
  const variants = {
    default: 'border border-gray-200',
    elevated: 'border-0',
    outlined: 'border-2 border-gray-300',
    service: 'border-2 border-[#f2010126] shadow-[0_2px_5px_rgba(0,0,0,0.1)]',
  };
  
  const paddings = {
    none: 'p-0',
    small: 'p-3',
    default: 'p-4',
    large: 'p-6',
    custom: '', // For custom padding via className
  };
  
  const shadows = {
    none: 'shadow-none',
    small: 'shadow-sm',
    default: 'shadow-md',
    large: 'shadow-lg',
    custom: '', // For custom shadow via className
  };
  
  const cardClasses = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${shadows[shadow]} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'service']),
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large', 'custom']),
  shadow: PropTypes.oneOf(['none', 'small', 'default', 'large', 'custom']),
};

export default Card;