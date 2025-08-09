import React from 'react';
import { cn } from '../../../utils/cn';

const AccountTypeSelector = ({ value, onChange, error, className = '' }) => {
  const accountTypes = [
    { value: 'CDSL', label: 'CDSL' },
    { value: 'NSDL', label: 'NSDL' }
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <label className={cn(
        'text-sm font-medium leading-none',
        error ? 'text-destructive' : 'text-foreground'
      )}>
        Select Account Type
        <span className="text-destructive ml-1">*</span>
      </label>
      
      <div className="flex space-x-4">
        {accountTypes.map((type) => (
          <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="accountType"
              value={type.value}
              checked={value === type.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                'h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive'
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {type.label}
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

export default AccountTypeSelector;