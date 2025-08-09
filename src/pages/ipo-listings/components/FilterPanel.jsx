import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, resultCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local filters with props
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Mainboard', label: 'Mainboard' },
    { value: 'SME', label: 'SME' }
  ];

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Financial Services', label: 'Financial Services' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail & Consumer', label: 'Retail & Consumer' },
    { value: 'Energy & Utilities', label: 'Energy & Utilities' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'current', label: 'Current' },
    { value: 'closed', label: 'Closed' }
  ];

  const minInvestmentOptions = [
    { value: 'all', label: 'Any Amount' },
    { value: '0-15000', label: 'Up to ₹15,000' },
    { value: '15000-50000', label: '₹15,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000+', label: 'Above ₹1,00,000' }
  ];

  const handleLocalFilterUpdate = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...(localFilters.priceRange || [0, 10000])];
    newRange[index] = parseInt(value) || 0;
    setLocalFilters(prev => ({ ...prev, priceRange: newRange }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: 'all',
      sector: 'all',
      status: 'all',
      dateRange: { start: '', end: '' },
      priceRange: [0, 10000],
      minInvestment: 'all'
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const removeFilter = (key, value = null) => {
    let updatedFilters = { ...localFilters };
    
    if (key === 'dateRange') {
      updatedFilters.dateRange = { start: '', end: '' };
    } else if (key === 'priceRange') {
      updatedFilters.priceRange = [0, 10000];
    } else {
      updatedFilters[key] = 'all';
    }
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const getActiveFilters = () => {
    const active = [];
    
    if (localFilters?.category !== 'all') {
      const option = categoryOptions.find(opt => opt.value === localFilters.category);
      active.push({ 
        key: 'category', 
        label: option?.label || localFilters.category,
        value: localFilters.category
      });
    }
    
    if (localFilters?.status !== 'all') {
      const option = statusOptions.find(opt => opt.value === localFilters.status);
      active.push({ 
        key: 'status', 
        label: option?.label || localFilters.status,
        value: localFilters.status
      });
    }
    
    if (localFilters?.sector !== 'all') {
      const option = sectorOptions.find(opt => opt.value === localFilters.sector);
      active.push({ 
        key: 'sector', 
        label: option?.label || localFilters.sector,
        value: localFilters.sector
      });
    }
    
    if (localFilters?.minInvestment !== 'all') {
      const option = minInvestmentOptions.find(opt => opt.value === localFilters.minInvestment);
      active.push({ 
        key: 'minInvestment', 
        label: option?.label || localFilters.minInvestment,
        value: localFilters.minInvestment
      });
    }
    
    if (localFilters?.dateRange?.start || localFilters?.dateRange?.end) {
      active.push({ 
        key: 'dateRange', 
        label: `Date: ${localFilters.dateRange.start || '...'} to ${localFilters.dateRange.end || '...'}`,
        value: localFilters.dateRange
      });
    }
    
    if (localFilters?.priceRange && (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 10000)) {
      active.push({ 
        key: 'priceRange', 
        label: `₹${localFilters.priceRange[0]} - ₹${localFilters.priceRange[1]}`,
        value: localFilters.priceRange
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();
  const hasChanges = JSON.stringify(localFilters) !== JSON.stringify(filters);

  return (
    <div className="space-y-6">
      {/* Modern Filter Header */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Filter" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Filter IPOs</h3>
                <p className="text-sm text-muted-foreground">
                  {resultCount} IPO{resultCount !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            {activeFilters.length > 0 && (
              <div className="hidden sm:flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {activeFilters.length} active filter{activeFilters.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {activeFilters.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                iconName="RotateCcw"
                iconPosition="left"
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              className="lg:hidden"
            >
              {isExpanded ? 'Hide' : 'More'} Filters
            </Button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <div
                  key={`${filter.key}-${index}`}
                  className="inline-flex items-center space-x-2 bg-white border border-border rounded-lg px-3 py-1.5 text-sm shadow-sm"
                >
                  <span className="text-foreground font-medium">{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.key)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={16} className="text-primary" />
            <label className="text-sm font-semibold text-foreground">Category</label>
          </div>
          <Select
            options={categoryOptions}
            value={localFilters?.category || 'all'}
            onChange={(value) => handleLocalFilterUpdate('category', value)}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <label className="text-sm font-semibold text-foreground">Status</label>
          </div>
          <Select
            options={statusOptions}
            value={localFilters?.status || 'all'}
            onChange={(value) => handleLocalFilterUpdate('status', value)}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="PieChart" size={16} className="text-primary" />
            <label className="text-sm font-semibold text-foreground">Sector</label>
          </div>
          <Select
            options={sectorOptions}
            value={localFilters?.sector || 'all'}
            onChange={(value) => handleLocalFilterUpdate('sector', value)}
            searchable
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="IndianRupee" size={16} className="text-primary" />
            <label className="text-sm font-semibold text-foreground">Min Investment</label>
          </div>
          <Select
            options={minInvestmentOptions}
            value={localFilters?.minInvestment || 'all'}
            onChange={(value) => handleLocalFilterUpdate('minInvestment', value)}
            className="bg-white"
          />
        </div>
      </div>

      {/* Advanced Filters Section */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Settings2" size={18} className="text-primary" />
              <h4 className="text-lg font-semibold text-foreground">Advanced Filters</h4>
            </div>
            
            {/* Apply/Clear Actions */}
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={applyFilters}
                  iconName="Check"
                  iconPosition="left"
                >
                  Apply Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <label className="text-sm font-semibold text-foreground">Opening Date Range</label>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">From Date</label>
                  <input
                    type="date"
                    value={localFilters?.dateRange?.start || ''}
                    onChange={(e) => handleLocalFilterUpdate('dateRange', { 
                      ...localFilters.dateRange, 
                      start: e.target.value 
                    })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">To Date</label>
                  <input
                    type="date"
                    value={localFilters?.dateRange?.end || ''}
                    onChange={(e) => handleLocalFilterUpdate('dateRange', { 
                      ...localFilters.dateRange, 
                      end: e.target.value 
                    })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <label className="text-sm font-semibold text-foreground">Price Range (₹)</label>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Minimum Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={localFilters?.priceRange?.[0] || 0}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Maximum Price</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={localFilters?.priceRange?.[1] || 10000}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Range: ₹{(localFilters?.priceRange?.[0] || 0).toLocaleString()} - ₹{(localFilters?.priceRange?.[1] || 10000).toLocaleString()}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-primary" />
                <label className="text-sm font-semibold text-foreground">Quick Filters</label>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newFilters = { ...localFilters, status: 'current' };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  iconName="Play"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Currently Open
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newFilters = { ...localFilters, status: 'upcoming' };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  iconName="Clock"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Coming Soon
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newFilters = { 
                      ...localFilters, 
                      category: 'Mainboard', 
                      status: 'current' 
                    };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  iconName="Star"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Popular Mainboard
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons for Advanced Filters */}
          {hasChanges && (
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  You have unsaved filter changes
                </p>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocalFilters(filters)}
                    iconName="Undo"
                    iconPosition="left"
                  >
                    Reset Changes
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={applyFilters}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;