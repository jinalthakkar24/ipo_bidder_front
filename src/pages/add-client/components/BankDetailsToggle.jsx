import React from 'react';
import { cn } from '../../../utils/cn';

const BankDetailsToggle = ({ value, onChange, error, className = '' }) => {
  const options = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' }
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <label className={cn(
        'text-sm font-medium leading-none',
        error ? 'text-destructive' : 'text-foreground'
      )}>
        Bank Details for Form Print
        <span className="text-destructive ml-1">*</span>
      </label>
      
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="bankDetails"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                'h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive'
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default BankDetailsToggle;