import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IPOOpportunities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const ipoData = [
    {
      id: 1,
      companyName: 'TechCorp Solutions Ltd',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center',
      priceRange: '₹180 - ₹200',
      lotSize: 75,
      openDate: '2025-01-15',
      closeDate: '2025-01-17',
      status: 'Current',
      category: 'Mainboard',
      subscription: '2.3x',
      gmp: '+₹25'
    },
    {
      id: 2,
      companyName: 'Green Energy Ventures',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=64&h=64&fit=crop&crop=center',
      priceRange: '₹95 - ₹105',
      lotSize: 142,
      openDate: '2025-01-20',
      closeDate: '2025-01-22',
      status: 'Upcoming',
      category: 'SME',
      subscription: '-',
      gmp: '+₹8'
    },
    {
      id: 3,
      companyName: 'Digital Finance Corp',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center',
      priceRange: '₹320 - ₹350',
      lotSize: 43,
      openDate: '2025-01-10',
      closeDate: '2025-01-12',
      status: 'Closed',
      category: 'Mainboard',
      subscription: '4.7x',
      gmp: '+₹45'
    },
    {
      id: 4,
      companyName: 'Healthcare Innovations',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=64&h=64&fit=crop&crop=center',
      priceRange: '₹150 - ₹165',
      lotSize: 90,
      openDate: '2025-01-18',
      closeDate: '2025-01-20',
      status: 'Current',
      category: 'Mainboard',
      subscription: '1.8x',
      gmp: '+₹12'
    }
  ];

  const categories = [
    { id: 'all', label: 'All IPOs', count: ipoData.length },
    { id: 'current', label: 'Current', count: ipoData.filter(ipo => ipo.status === 'Current').length },
    { id: 'upcoming', label: 'Upcoming', count: ipoData.filter(ipo => ipo.status === 'Upcoming').length },
    { id: 'mainboard', label: 'Mainboard', count: ipoData.filter(ipo => ipo.category === 'Mainboard').length },
    { id: 'sme', label: 'SME', count: ipoData.filter(ipo => ipo.category === 'SME').length }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Current': { color: 'bg-success text-success-foreground', icon: 'Clock' },
      'Upcoming': { color: 'bg-warning text-warning-foreground', icon: 'Calendar' },
      'Closed': { color: 'bg-muted text-muted-foreground', icon: 'CheckCircle' }
    };
    
    const config = statusConfig[status] || statusConfig['Closed'];
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{status}</span>
      </span>
    );
  };

  const filteredIPOs = ipoData.filter(ipo => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'current') return ipo.status === 'Current';
    if (selectedCategory === 'upcoming') return ipo.status === 'Upcoming';
    if (selectedCategory === 'mainboard') return ipo.category === 'Mainboard';
    if (selectedCategory === 'sme') return ipo.category === 'SME';
    return true;
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">IPO Opportunities</h2>
        <Button variant="outline" size="sm" iconName="ExternalLink">
          View All
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <span>{category.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selectedCategory === category.id
                ? 'bg-primary-foreground text-primary'
                : 'bg-background text-muted-foreground'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* IPO List */}
      <div className="space-y-4">
        {filteredIPOs.map((ipo) => (
          <div
            key={ipo.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-micro"
          >
            <div className="flex items-center space-x-4">
              <img
                src={ipo.logo}
                alt={ipo.companyName}
                className="w-12 h-12 rounded-lg object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div>
                <h3 className="font-medium text-foreground">{ipo.companyName}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{ipo.priceRange}</span>
                  <span>Lot: {ipo.lotSize}</span>
                  <span className="text-xs bg-background px-2 py-1 rounded">{ipo.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <div className="text-muted-foreground">Subscription</div>
                <div className="font-medium text-foreground">{ipo.subscription}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-muted-foreground">GMP</div>
                <div className="font-medium text-success">{ipo.gmp}</div>
              </div>
              {getStatusBadge(ipo.status)}
            </div>
          </div>
        ))}
      </div>

      {filteredIPOs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No IPOs found for the selected category</p>
        </div>
      )}
    </div>
  );
};

export default IPOOpportunities;