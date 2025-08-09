import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';

import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import StatusFilterNav from '../../components/ui/StatusFilterNav';
import IPOCard from './components/IPOCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const IPOListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('closingDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock IPO data
  const mockIPOs = [
    {
      id: 'ipo-001',
      companyName: 'TechVision Solutions Ltd',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      sector: 'Technology',
      category: 'Mainboard',
      status: 'current',
      priceRange: { min: 120, max: 135 },
      minInvestment: 16200,
      openingDate: '2025-01-10',
      closingDate: '2025-01-15',
      subscriptionLevel: 2.5,
      isNew: true
    },
    {
      id: 'ipo-002',
      companyName: 'Green Energy Corp',
      logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&crop=center',
      sector: 'Energy & Utilities',
      category: 'Mainboard',
      status: 'current',
      priceRange: { min: 85, max: 95 },
      minInvestment: 12750,
      openingDate: '2025-01-08',
      closingDate: '2025-01-14',
      subscriptionLevel: 8.2,
      isNew: false
    },
    {
      id: 'ipo-003',
      companyName: 'MediCare Innovations',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      sector: 'Healthcare',
      category: 'SME',
      status: 'upcoming',
      priceRange: { min: 45, max: 55 },
      minInvestment: 6750,
      openingDate: '2025-01-20',
      closingDate: '2025-01-25',
      subscriptionLevel: null,
      isNew: true
    },
    {
      id: 'ipo-004',
      companyName: 'Digital Finance Hub',
      logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center',
      sector: 'Financial Services',
      category: 'Mainboard',
      status: 'current',
      priceRange: { min: 200, max: 220 },
      minInvestment: 30000,
      openingDate: '2025-01-05',
      closingDate: '2025-01-12',
      subscriptionLevel: 12.8,
      isNew: false
    },
    {
      id: 'ipo-005',
      companyName: 'Smart Manufacturing Ltd',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center',
      sector: 'Manufacturing',
      category: 'Mainboard',
      status: 'closed',
      priceRange: { min: 150, max: 165 },
      minInvestment: 22500,
      openingDate: '2024-12-20',
      closingDate: '2024-12-30',
      subscriptionLevel: 15.6,
      isNew: false
    },
    {
      id: 'ipo-006',
      companyName: 'Retail Connect Solutions',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
      sector: 'Retail & Consumer',
      category: 'SME',
      status: 'upcoming',
      priceRange: { min: 35, max: 42 },
      minInvestment: 5250,
      openingDate: '2025-01-25',
      closingDate: '2025-01-30',
      subscriptionLevel: null,
      isNew: true
    },
    {
      id: 'ipo-007',
      companyName: 'CloudTech Enterprises',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&crop=center',
      sector: 'Technology',
      category: 'Mainboard',
      status: 'current',
      priceRange: { min: 180, max: 200 },
      minInvestment: 27000,
      openingDate: '2025-01-12',
      closingDate: '2025-01-17',
      subscriptionLevel: 4.1,
      isNew: false
    },
    {
      id: 'ipo-008',
      companyName: 'BioPharm Research',
      logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=100&fit=crop&crop=center',
      sector: 'Healthcare',
      category: 'SME',
      status: 'upcoming',
      priceRange: { min: 60, max: 75 },
      minInvestment: 9000,
      openingDate: '2025-02-01',
      closingDate: '2025-02-06',
      subscriptionLevel: null,
      isNew: true
    }
  ];

  // Search suggestions
  const searchSuggestions = [
    'TechVision Solutions', 'Green Energy', 'MediCare', 'Digital Finance',
    'Smart Manufacturing', 'Retail Connect', 'CloudTech', 'BioPharm',
    'Technology', 'Healthcare', 'Energy & Utilities', 'Financial Services',
    'Manufacturing', 'Retail & Consumer'
  ];

  // Filter and sort IPOs
  const filteredAndSortedIPOs = useMemo(() => {
    let filtered = mockIPOs;

    // Apply status filter
    if (activeStatusFilter !== 'all') {
      filtered = filtered.filter(ipo => {
        switch (activeStatusFilter) {
          case 'open':
            return ipo.status === 'current';
          case 'closed':
            return ipo.status === 'closed';
          case 'upcoming':
            return ipo.status === 'upcoming';
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(ipo =>
        ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ipo.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'companyName':
          aValue = a.companyName.toLowerCase();
          bValue = b.companyName.toLowerCase();
          break;
        case 'openingDate':
          aValue = new Date(a.openingDate);
          bValue = new Date(b.openingDate);
          break;
        case 'closingDate':
          aValue = new Date(a.closingDate);
          bValue = new Date(b.closingDate);
          break;
        case 'priceRange':
          aValue = a.priceRange?.min || 0;
          bValue = b.priceRange?.min || 0;
          break;
        case 'subscriptionLevel':
          aValue = a.subscriptionLevel || 0;
          bValue = b.subscriptionLevel || 0;
          break;
        case 'minInvestment':
          aValue = a.minInvestment || 0;
          bValue = b.minInvestment || 0;
          break;
        default:
          aValue = new Date(a.closingDate);
          bValue = new Date(b.closingDate);
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, activeStatusFilter]);

  // Calculate counts for status filters
  const statusFilters = useMemo(() => {
    const allCount = mockIPOs.length;
    const openCount = mockIPOs.filter(ipo => ipo.status === 'current').length;
    const closedCount = mockIPOs.filter(ipo => ipo.status === 'closed').length;
    const upcomingCount = mockIPOs.filter(ipo => ipo.status === 'upcoming').length;

    return [
      { id: 'all', label: 'All IPOs', icon: 'List', count: allCount },
      { id: 'open', label: 'Open', icon: 'TrendingUp', count: openCount },
      { id: 'upcoming', label: 'Upcoming', icon: 'Clock', count: upcomingCount },
      { id: 'closed', label: 'Closed', icon: 'CheckCircle', count: closedCount }
    ];
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleStatusFilterChange = (filterId) => {
    setActiveStatusFilter(filterId);
  };

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, sortBy, sortOrder, activeStatusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mt-16 p-6 min-h-screen">
        <div className="container mx-auto max-w-7xl">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">IPO Listings</h1>
                <p className="text-muted-foreground">
                  Discover and invest in the latest Initial Public Offerings
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <SearchBar 
                  onSearch={handleSearch}
                  suggestions={searchSuggestions}
                />
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <StatusFilterNav
            filters={statusFilters}
            activeFilter={activeStatusFilter}
            onFilterChange={handleStatusFilterChange}
            layout="tabs"
          />

          {/* Sort Controls */}
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                <span className="text-muted-foreground">Loading IPOs...</span>
              </div>
            </div>
          )}

          {/* IPO Grid/List */}
          {!loading && (
            <>
              {filteredAndSortedIPOs.length > 0 ? (
                <div className={
                  viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
                }>
                  {filteredAndSortedIPOs.map((ipo) => (
                    <IPOCard 
                      key={ipo.id} 
                      ipo={ipo} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No IPOs Found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or filter to find more results.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveStatusFilter('all');
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default IPOListings;