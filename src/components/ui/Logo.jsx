import React from 'react';

const Logo = ({ 
  size = 'medium', 
  className = '', 
  showText = true,
  textClassName = '',
  ...props 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-8 w-auto';
      case 'medium':
        return 'h-10 w-auto';
      case 'large':
        return 'h-16 w-auto';
      case 'extra-large':
        return 'h-20 w-auto';
      default:
        return 'h-10 w-auto';
    }
  };

  const getTextClasses = () => {
    switch (size) {
      case 'small':
        return 'text-lg font-semibold';
      case 'medium':
        return 'text-xl font-semibold';
      case 'large':
        return 'text-2xl font-bold';
      case 'extra-large':
        return 'text-3xl font-bold';
      default:
        return 'text-xl font-semibold';
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      <img
        src="/assets/images/PHOTO-2025-04-21-18-27-48-1752321191405.jpg"
        alt="IPO Bidder Logo"
        className={`${getSizeClasses()} object-contain`}
        onError={(e) => {
          e.target.style.display = 'none';
          // Fallback to text if image fails to load
          if (e.target.nextSibling) {
            e.target.nextSibling.style.display = 'inline';
          }
        }}
      />
      {showText && (
        <span 
          className={`${getTextClasses()} text-foreground ${textClassName}`}
          style={{ display: 'none' }} // Initially hidden, shown only if image fails
        >
          IPO BIDDER
        </span>
      )}
    </div>
  );
};

export default Logo;