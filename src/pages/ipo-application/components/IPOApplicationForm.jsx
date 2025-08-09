import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const IPOApplicationForm = ({ selectedIPO, userType, onNext }) => {
  const [formData, setFormData] = useState({
    demateAccount: '',
    panNumber: '',
    bankAccount: '',
    upiId: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Closed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  const mockIPOData = selectedIPO || {
    id: 'ipo-001',
    companyName: 'TechCorp Industries Ltd',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    sector: 'Technology',
    priceRange: { min: 120, max: 140 },
    lotSize: 100,
    minInvestment: 12000,
    maxInvestment: 200000,
    subscriptionStart: '2025-01-15',
    subscriptionEnd: '2025-01-17',
    listingDate: '2025-01-22',
    subscriptionStatus: {
      retail: 2.3,
      hni: 1.8,
      institutional: 0.9
    },
    cutOffPrice: 135,
    totalIssueSize: '₹2,500 Cr',
    freshIssue: '₹1,800 Cr',
    offerForSale: '₹700 Cr'
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* IPO Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={mockIPOData.logo}
              alt={mockIPOData.companyName}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  {mockIPOData.companyName}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building2" size={14} />
                    <span>{mockIPOData.sector}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Lists on {new Date(mockIPOData.listingDate).toLocaleDateString('en-IN')}</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  ₹{mockIPOData.priceRange.min} - ₹{mockIPOData.priceRange.max}
                </div>
                <div className="text-xs text-muted-foreground">Price Band</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Timeline */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Subscription Period</span>
            <span className="text-sm font-medium text-accent">
              {calculateTimeRemaining(mockIPOData.subscriptionEnd)}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Opens: {new Date(mockIPOData.subscriptionStart).toLocaleDateString('en-IN')}</span>
            <span>•</span>
            <span>Closes: {new Date(mockIPOData.subscriptionEnd).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* IPO Details Grid */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Issue Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Lot Size</div>
            <div className="text-base font-medium text-foreground">{mockIPOData.lotSize} shares</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Min Investment</div>
            <div className="text-base font-medium text-foreground">₹{mockIPOData.minInvestment.toLocaleString('en-IN')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Max Investment</div>
            <div className="text-base font-medium text-foreground">₹{mockIPOData.maxInvestment.toLocaleString('en-IN')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Issue Size</div>
            <div className="text-base font-medium text-foreground">{mockIPOData.totalIssueSize}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Fresh Issue</div>
            <div className="text-base font-medium text-foreground">{mockIPOData.freshIssue}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">OFS</div>
            <div className="text-base font-medium text-foreground">{mockIPOData.offerForSale}</div>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Live Subscription Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Retail Individual Investors (RII)</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{mockIPOData.subscriptionStatus.retail}x</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(mockIPOData.subscriptionStatus.retail * 100 / 3, 100)}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">High Net Worth Individuals (HNI)</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{mockIPOData.subscriptionStatus.hni}x</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(mockIPOData.subscriptionStatus.hni * 100 / 3, 100)}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Qualified Institutional Buyers (QIB)</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{mockIPOData.subscriptionStatus.institutional}x</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-error rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(mockIPOData.subscriptionStatus.institutional * 100 / 3, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Form */}
      {userType === 'client' && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Demat Account Number"
              type="text"
              placeholder="Enter CDSL/NSDL account number"
              value={formData.demateAccount}
              onChange={(e) => handleInputChange('demateAccount', e.target.value)}
              required
            />
            <Input
              label="PAN Number"
              type="text"
              placeholder="Enter PAN number"
              value={formData.panNumber}
              onChange={(e) => handleInputChange('panNumber', e.target.value)}
              required
            />
            <Input
              label="Bank Account Number"
              type="text"
              placeholder="Enter bank account number"
              value={formData.bankAccount}
              onChange={(e) => handleInputChange('bankAccount', e.target.value)}
              required
            />
            <Input
              label="UPI ID (Optional)"
              type="text"
              placeholder="Enter UPI ID for quick payments"
              value={formData.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Cut-off Price: <span className="font-medium text-foreground">₹{mockIPOData.cutOffPrice}</span>
          </div>
          <Button
            variant="default"
            onClick={onNext}
            iconName="ArrowRight"
            iconPosition="right"
          >
            {userType === 'subbroker' ? 'Select Clients' : 'Continue to Bidding'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IPOApplicationForm;