import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StatusSummaryCards from './components/StatusSummaryCards';
import AllotmentFilters from './components/AllotmentFilters';
import AllotmentStatusTable from './components/AllotmentStatusTable';
import AllotmentDetailsModal from './components/AllotmentDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AllotmentStatus = () => {
  const location = useLocation();
  const [userType, setUserType] = useState('client');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Determine user type from route or localStorage
  useEffect(() => {
    const savedUserType = localStorage.getItem('userType');
    if (savedUserType) {
      setUserType(savedUserType);
    } else if (location.pathname.includes('subbroker')) {
      setUserType('subbroker');
    }
  }, [location]);

  const handleFilterChange = (filterData) => {
    if (filterData.type === 'status') {
      setActiveFilter(filterData.value);
    } else if (filterData.type === 'dateRange') {
      // Handle date range filtering
      console.log('Date range filter:', filterData.value);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleBulkExport = () => {
    // Handle bulk export functionality
    console.log('Exporting allotment data...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mt-16 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Allotment Status
              </h1>
              <p className="text-muted-foreground">
                {userType === 'subbroker' ?'Track IPO allotment status for all your clients' :'Monitor your IPO application results and allotment details'
                }
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <StatusSummaryCards userType={userType} />

          {/* Real-time Updates Banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <Icon name="Zap" size={16} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Real-time Status Updates Active
                </p>
                <p className="text-xs text-muted-foreground">
                  Allotment results are automatically updated as they become available. Last update: {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success">Live</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AllotmentFilters
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            activeFilter={activeFilter}
            searchQuery={searchQuery}
            userType={userType}
          />

          {/* Status Table */}
          <AllotmentStatusTable
            onViewDetails={handleViewDetails}
            userType={userType}
            activeFilter={activeFilter}
            searchQuery={searchQuery}
          />

          {/* Quick Actions for Mobile */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <div className="flex flex-col space-y-3">
              <Button
                size="icon"
                className="w-12 h-12 rounded-full shadow-elevated"
                onClick={handleRefreshStatus}
                iconName="RefreshCw"
              />
              <Button
                size="icon"
                className="w-12 h-12 rounded-full shadow-elevated"
                iconName="Bell"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      <AllotmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        application={selectedApplication}
        userType={userType}
      />
    </div>
  );
};

export default AllotmentStatus;