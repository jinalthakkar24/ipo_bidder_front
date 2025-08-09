import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const StatusFilterNav = ({ 
  filters = [],
  activeFilter = 'all',
  onFilterChange = () => {},
  layout = 'tabs' // 'tabs' or 'sidebar'
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const defaultFilters = [
    { id: 'all', label: 'All Status', icon: 'List', count: 156 },
    { id: 'pending', label: 'Pending', icon: 'Clock', count: 23 },
    { id: 'approved', label: 'Approved', icon: 'CheckCircle', count: 89 },
    { id: 'rejected', label: 'Rejected', icon: 'XCircle', count: 12 },
    { id: 'allotted', label: 'Allotted', icon: 'Award', count: 32 }
  ];

  const filterItems = filters.length > 0 ? filters : defaultFilters;

  const handleFilterClick = (filterId) => {
    onFilterChange(filterId);
    setIsMobileFilterOpen(false);
  };

  if (layout === 'sidebar') {
    return (
      <div className="w-64 bg-card border-r border-border p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground mb-4">Filter by Status</h3>
        {filterItems.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-micro ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={filter.icon} size={16} />
              <span className="text-sm font-medium">{filter.label}</span>
            </div>
            <span className={`text-xs font-mono px-2 py-1 rounded-full ${
              activeFilter === filter.id
                ? 'bg-primary-foreground text-primary'
                : 'bg-muted text-muted-foreground'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="border-b border-border bg-card">
      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center space-x-1 px-6 py-2">
        {filterItems.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={filter.icon} size={14} />
            <span>{filter.label}</span>
            <span className={`text-xs font-mono px-2 py-1 rounded-full ${
              activeFilter === filter.id
                ? 'bg-primary-foreground text-primary'
                : 'bg-muted text-muted-foreground'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden p-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full justify-between"
          iconName="Filter"
          iconPosition="left"
        >
          <span>Filter: {filterItems.find(f => f.id === activeFilter)?.label}</span>
          <Icon name={isMobileFilterOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>

        {isMobileFilterOpen && (
          <div className="mt-4 space-y-2 border-t border-border pt-4">
            {filterItems.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-micro ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={filter.icon} size={16} />
                  <span className="text-sm font-medium">{filter.label}</span>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded-full ${
                  activeFilter === filter.id
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusFilterNav;