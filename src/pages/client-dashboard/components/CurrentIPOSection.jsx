import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CurrentIPOSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All IPOs', count: 12 },
    { id: 'mainboard', label: 'Mainboard', count: 8 },
    { id: 'sme', label: 'SME', count: 4 },
    { id: 'upcoming', label: 'Upcoming', count: 6 }
  ];

  const currentIPOs = [
    {
      id: 1,
      companyName: "TechVision Solutions Ltd",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      category: "mainboard",
      priceRange: "₹245 - ₹260",
      lotSize: 57,
      minInvestment: 14820,
      subscriptionStatus: "2.45x",
      subscriptionLevel: "oversubscribed",
      openDate: "2025-01-10",
      closeDate: "2025-01-14",
      daysLeft: 2,
      gmp: 45,
      listing: "NSE, BSE",
      sector: "Technology"
    },
    {
      id: 2,
      companyName: "Green Energy Innovations",
      logo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=100&h=100&fit=crop&crop=center",
      category: "mainboard",
      priceRange: "₹180 - ₹195",
      lotSize: 76,
      minInvestment: 14820,
      subscriptionStatus: "0.87x",
      subscriptionLevel: "undersubscribed",
      openDate: "2025-01-08",
      closeDate: "2025-01-12",
      daysLeft: 0,
      gmp: 12,
      listing: "NSE, BSE",
      sector: "Renewable Energy"
    },
    {
      id: 3,
      companyName: "FinTech Dynamics SME",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
      category: "sme",
      priceRange: "₹95 - ₹105",
      lotSize: 1200,
      minInvestment: 126000,
      subscriptionStatus: "1.23x",
      subscriptionLevel: "subscribed",
      openDate: "2025-01-09",
      closeDate: "2025-01-13",
      daysLeft: 1,
      gmp: 8,
      listing: "NSE Emerge",
      sector: "Financial Services"
    },
    {
      id: 4,
      companyName: "Healthcare Plus Ltd",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
      category: "upcoming",
      priceRange: "₹320 - ₹340",
      lotSize: 44,
      minInvestment: 14960,
      subscriptionStatus: "Opening Soon",
      subscriptionLevel: "upcoming",
      openDate: "2025-01-16",
      closeDate: "2025-01-20",
      daysLeft: 4,
      gmp: 25,
      listing: "NSE, BSE",
      sector: "Healthcare"
    }
  ];

  const filteredIPOs = selectedCategory === 'all' 
    ? currentIPOs 
    : currentIPOs.filter(ipo => ipo.category === selectedCategory);

  const getSubscriptionColor = (level) => {
    switch (level) {
      case 'oversubscribed': return 'text-success bg-success/10 border-success/20';
      case 'undersubscribed': return 'text-warning bg-warning/10 border-warning/20';
      case 'subscribed': return 'text-primary bg-primary/10 border-primary/20';
      case 'upcoming': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
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
        <h2 className="text-xl font-semibold text-foreground">Current IPO Opportunities</h2>
        <Link 
          to="/ipo-listings"
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-micro"
        >
          <span className="text-sm font-medium">View All</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <span>{category.label}</span>
            <span className={`text-xs font-mono px-2 py-1 rounded-full ${
              selectedCategory === category.id
                ? 'bg-primary-foreground text-primary'
                : 'bg-background text-muted-foreground'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* IPO Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIPOs.map((ipo) => (
          <div key={ipo.id} className="border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image 
                    src={ipo.logo} 
                    alt={`${ipo.companyName} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{ipo.companyName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{ipo.sector}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{ipo.listing}</span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getSubscriptionColor(ipo.subscriptionLevel)}`}>
                {ipo.subscriptionStatus}
              </div>
            </div>

            {/* Price and Investment Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Price Range</p>
                <p className="text-sm font-semibold text-foreground">{ipo.priceRange}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(ipo.minInvestment)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Lot Size</p>
                <p className="text-sm font-semibold text-foreground">{ipo.lotSize} shares</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">GMP</p>
                <p className="text-sm font-semibold text-success">+₹{ipo.gmp}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Opens</p>
                <p className="text-sm font-medium text-foreground">{new Date(ipo.openDate).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-8 h-0.5 bg-border"></div>
                <div className="w-2 h-2 bg-border rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Closes</p>
                <p className="text-sm font-medium text-foreground">{new Date(ipo.closeDate).toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            {/* Days Left Indicator */}
            {ipo.daysLeft > 0 && (
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                  <Icon name="Clock" size={14} className="text-accent" />
                  <span className="text-xs font-medium text-accent">
                    {ipo.daysLeft} day{ipo.daysLeft > 1 ? 's' : ''} left to apply
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                iconName="FileText"
                iconPosition="left"
                disabled={ipo.daysLeft === 0}
              >
                {ipo.daysLeft === 0 ? 'Closed' : 'Apply Now'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Info"
                iconPosition="left"
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredIPOs.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No IPOs found for the selected category</p>
        </div>
      )}
    </div>
  );
};

export default CurrentIPOSection;