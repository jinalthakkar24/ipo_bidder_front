import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'closingDate', label: 'Closing Date' },
    { value: 'openingDate', label: 'Opening Date' },
    { value: 'companyName', label: 'Company Name' },
    { value: 'priceRange', label: 'Price Range' },
    { value: 'subscriptionLevel', label: 'Subscription Level' },
    { value: 'minInvestment', label: 'Min Investment' }
  ];

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle order if same field
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      onSortChange(newSortBy, 'asc');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Sort Controls */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Sort by:</span>
        </div>
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={handleSortChange}
          className="w-40"
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          iconName={sortOrder === 'asc' ? "ArrowUp" : "ArrowDown"}
          className="px-2"
        />
      </div>

      {/* View Mode Controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-foreground hidden sm:inline">View:</span>
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            className="px-3"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            className="px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;