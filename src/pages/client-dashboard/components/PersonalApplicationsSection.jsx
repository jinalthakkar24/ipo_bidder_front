import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PersonalApplicationsSection = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusFilters = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'applied', label: 'Applied', count: 3 },
    { id: 'under_review', label: 'Under Review', count: 2 },
    { id: 'allotted', label: 'Allotted', count: 5 },
    { id: 'not_allotted', label: 'Not Allotted', count: 2 }
  ];

  const applications = [
    {
      id: 1,
      companyName: "TechVision Solutions Ltd",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      applicationDate: "2025-01-10",
      status: "under_review",
      statusLabel: "Under Review",
      appliedPrice: 260,
      appliedLots: 2,
      appliedAmount: 29640,
      allottedLots: null,
      allottedAmount: null,
      refundAmount: null,
      listingDate: "2025-01-22",
      applicationNumber: "IPO2025001234"
    },
    {
      id: 2,
      companyName: "Green Energy Innovations",
      logo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=100&h=100&fit=crop&crop=center",
      applicationDate: "2025-01-08",
      status: "allotted",
      statusLabel: "Allotted",
      appliedPrice: 195,
      appliedLots: 1,
      appliedAmount: 14820,
      allottedLots: 1,
      allottedAmount: 14820,
      refundAmount: 0,
      listingDate: "2025-01-20",
      applicationNumber: "IPO2025001189"
    },
    {
      id: 3,
      companyName: "FinTech Dynamics SME",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
      applicationDate: "2025-01-09",
      status: "applied",
      statusLabel: "Applied",
      appliedPrice: 105,
      appliedLots: 1,
      appliedAmount: 126000,
      allottedLots: null,
      allottedAmount: null,
      refundAmount: null,
      listingDate: "2025-01-21",
      applicationNumber: "IPO2025001201"
    },
    {
      id: 4,
      companyName: "Digital Commerce Ltd",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center",
      applicationDate: "2024-12-15",
      status: "not_allotted",
      statusLabel: "Not Allotted",
      appliedPrice: 280,
      appliedLots: 3,
      appliedAmount: 37800,
      allottedLots: 0,
      allottedAmount: 0,
      refundAmount: 37800,
      listingDate: "2024-12-28",
      applicationNumber: "IPO2024001156"
    },
    {
      id: 5,
      companyName: "BioMed Research Corp",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
      applicationDate: "2024-12-10",
      status: "allotted",
      statusLabel: "Allotted",
      appliedPrice: 220,
      appliedLots: 2,
      appliedAmount: 26400,
      allottedLots: 1,
      allottedAmount: 13200,
      refundAmount: 13200,
      listingDate: "2024-12-23",
      applicationNumber: "IPO2024001098"
    }
  ];

  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'text-primary bg-primary/10 border-primary/20';
      case 'under_review': return 'text-warning bg-warning/10 border-warning/20';
      case 'allotted': return 'text-success bg-success/10 border-success/20';
      case 'not_allotted': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied': return 'FileText';
      case 'under_review': return 'Clock';
      case 'allotted': return 'CheckCircle';
      case 'not_allotted': return 'XCircle';
      default: return 'FileText';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">My IPO Applications</h2>
        <Link 
          to="/allotment-status"
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-micro"
        >
          <span className="text-sm font-medium">View All Status</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedStatus(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
              selectedStatus === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <span>{filter.label}</span>
            <span className={`text-xs font-mono px-2 py-1 rounded-full ${
              selectedStatus === filter.id
                ? 'bg-primary-foreground text-primary'
                : 'bg-background text-muted-foreground'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image 
                    src={application.logo} 
                    alt={`${application.companyName} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{application.companyName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Applied: {new Date(application.applicationDate).toLocaleDateString('en-GB')}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground font-mono">
                      #{application.applicationNumber}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(application.status)}`}>
                <Icon name={getStatusIcon(application.status)} size={14} />
                <span>{application.statusLabel}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Applied Amount</p>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(application.appliedAmount)}</p>
                <p className="text-xs text-muted-foreground">{application.appliedLots} lot(s) @ ₹{application.appliedPrice}</p>
              </div>

              {application.status === 'allotted' && (
                <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Allotted Amount</p>
                  <p className="text-sm font-semibold text-success">{formatCurrency(application.allottedAmount)}</p>
                  <p className="text-xs text-muted-foreground">{application.allottedLots} lot(s) allotted</p>
                </div>
              )}

              {application.refundAmount !== null && application.refundAmount > 0 && (
                <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Refund Amount</p>
                  <p className="text-sm font-semibold text-warning">{formatCurrency(application.refundAmount)}</p>
                  <p className="text-xs text-muted-foreground">Refunded to bank</p>
                </div>
              )}

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Listing Date</p>
                <p className="text-sm font-semibold text-foreground">{new Date(application.listingDate).toLocaleDateString('en-GB')}</p>
                <p className="text-xs text-muted-foreground">Expected listing</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {application.status === 'allotted' && (
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-medium">Shares allocated to your demat account</span>
                  </div>
                )}
                {application.status === 'not_allotted' && (
                  <div className="flex items-center space-x-2 text-error">
                    <Icon name="XCircle" size={16} />
                    <span className="text-sm font-medium">Not selected in lottery</span>
                  </div>
                )}
                {application.status === 'under_review' && (
                  <div className="flex items-center space-x-2 text-warning">
                    <Icon name="Clock" size={16} />
                    <span className="text-sm font-medium">Allotment process in progress</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No applications found for the selected status</p>
        </div>
      )}
    </div>
  );
};

export default PersonalApplicationsSection;