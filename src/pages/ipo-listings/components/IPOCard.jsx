import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IPOCard = ({ ipo, viewMode = 'grid' }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'current':
        return 'bg-success text-success-foreground';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSubscriptionColor = (level) => {
    if (level >= 10) return 'text-error';
    if (level >= 5) return 'text-warning';
    if (level >= 2) return 'text-success';
    return 'text-muted-foreground';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysRemaining = (closingDate) => {
    const today = new Date();
    const closing = new Date(closingDate);
    const diffTime = closing - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = ipo.status === 'current' ? calculateDaysRemaining(ipo.closingDate) : null;

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <Image
              src={ipo.logo}
              alt={`${ipo.companyName} logo`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {ipo.companyName}
                </h3>
                <p className="text-sm text-muted-foreground">{ipo.sector}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm font-medium">
                    ₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Min: {formatCurrency(ipo.minInvestment)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ipo.status)}`}>
                  {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
                </span>
                {ipo.status === 'current' && daysRemaining !== null && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Last day'}
                    </div>
                    {ipo.subscriptionLevel && (
                      <div className={`text-sm font-medium ${getSubscriptionColor(ipo.subscriptionLevel)}`}>
                        {ipo.subscriptionLevel}x subscribed
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link to={`/ipo-application?ipo=${ipo.id}`}>
              <Button
                variant="outline"
                size="sm"
                disabled={ipo.status === 'closed'}
                iconName="FileText"
                iconPosition="left"
              >
                View Details
              </Button>
            </Link>
            {ipo.status === 'current' && (
              <Link to={`/ipo-application?ipo=${ipo.id}`}>
                <Button
                  variant="default"
                  size="sm"
                  iconName="TrendingUp"
                  iconPosition="left"
                >
                  Apply Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-200 group">
      {/* Header with Logo and Status */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <Image
            src={ipo.logo}
            alt={`${ipo.companyName} logo`}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ipo.status)}`}>
            {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {ipo.companyName}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{ipo.sector}</p>

        {/* Price Range */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm text-muted-foreground">Price Band</span>
            <div className="text-lg font-semibold text-foreground">
              ₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">Min Investment</span>
            <div className="text-sm font-medium text-foreground">
              {formatCurrency(ipo.minInvestment)}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <span className="text-xs text-muted-foreground">Opens</span>
            <div className="text-sm font-medium">{formatDate(ipo.openingDate)}</div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Closes</span>
            <div className="text-sm font-medium">{formatDate(ipo.closingDate)}</div>
          </div>
        </div>

        {/* Current Status Info */}
        {ipo.status === 'current' && (
          <div className="bg-muted rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Last day to apply'}
                </div>
                {ipo.subscriptionLevel && (
                  <div className={`text-sm font-medium ${getSubscriptionColor(ipo.subscriptionLevel)}`}>
                    {ipo.subscriptionLevel}x subscribed
                  </div>
                )}
              </div>
              <Icon name="Clock" size={16} className="text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Icon name="Building" size={12} className="mr-1" />
            {ipo.category}
          </span>
          {ipo.isNew && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
              <Icon name="Sparkles" size={12} className="mr-1" />
              New
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 space-y-2">
        <Link to={`/ipo-application?ipo=${ipo.id}`} className="block">
          <Button
            variant="outline"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            View Details
          </Button>
        </Link>
        
        {ipo.status === 'current' && (
          <Link to={`/ipo-application?ipo=${ipo.id}`} className="block">
            <Button
              variant="default"
              fullWidth
              iconName="TrendingUp"
              iconPosition="left"
            >
              Apply Now
            </Button>
          </Link>
        )}
        
        {ipo.status === 'upcoming' && (
          <Button
            variant="secondary"
            fullWidth
            iconName="Bell"
            iconPosition="left"
          >
            Notify Me
          </Button>
        )}
      </div>
    </div>
  );
};

export default IPOCard;