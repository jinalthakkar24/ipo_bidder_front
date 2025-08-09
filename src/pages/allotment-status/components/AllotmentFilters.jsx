import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AllotmentFilters = ({ 
  onFilterChange = () => {},
  onSearchChange = () => {},
  activeFilter = 'all',
  searchQuery = '',
  userType = 'client'
}) => {
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const filterOptions = [
    { id: 'all', label: 'All Status', icon: 'List', count: 156 },
    { id: 'pending', label: 'Pending', icon: 'Clock', count: 23 },
    { id: 'allotted', label: 'Allotted', icon: 'CheckCircle', count: 89 },
    { id: 'not-allotted', label: 'Not Allotted', icon: 'XCircle', count: 32 },
    { id: 'refund-processed', label: 'Refund Processed', icon: 'RefreshCw', count: 12 }
  ];

  const handleDateRangeApply = () => {
    onFilterChange({ type: 'dateRange', value: dateRange });
    setIsDateFilterOpen(false);
  };

  const handleDateRangeClear = () => {
    setDateRange({ from: '', to: '' });
    onFilterChange({ type: 'dateRange', value: null });
    setIsDateFilterOpen(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={userType === 'subbroker' ? "Search by IPO name or client..." : "Search by IPO name..."}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
              iconName="Calendar"
              iconPosition="left"
            >
              Date Range
              <Icon name={isDateFilterOpen ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
            </Button>
            
            {isDateFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-elevated p-4 z-50">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="date"
                      label="From Date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    />
                    <Input
                      type="date"
                      label="To Date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleDateRangeClear}>
                      Clear
                    </Button>
                    <Button onClick={handleDateRangeApply}>
                      Apply Filter
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button variant="outline" iconName="Download">
            Export
          </Button>
          
          {userType === 'subbroker' && (
            <Button variant="outline" iconName="Filter">
              Advanced
            </Button>
          )}
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange({ type: 'status', value: filter.id })}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
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
    </div>
  );
};

export default AllotmentFilters;