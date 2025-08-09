import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioOverviewCard = () => {
  const portfolioData = {
    totalInvestments: 2850000,
    activeApplications: 3,
    successfulAllotments: 8,
    currentPortfolioValue: 3420000,
    totalReturn: 570000,
    returnPercentage: 20.0,
    monthlyChange: 12.5
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Portfolio Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: Today, 11:30 AM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Investments */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="TrendingUp" size={20} color="white" strokeWidth={2} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">INVESTED</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(portfolioData.totalInvestments)}
            </p>
            <p className="text-sm text-muted-foreground">Total Investment Amount</p>
          </div>
        </div>

        {/* Active Applications */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
              <Icon name="FileText" size={20} color="white" strokeWidth={2} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">ACTIVE</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {portfolioData.activeApplications}
            </p>
            <p className="text-sm text-muted-foreground">Pending Applications</p>
          </div>
        </div>

        {/* Successful Allotments */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-success rounded-lg">
              <Icon name="Award" size={20} color="white" strokeWidth={2} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">SUCCESS</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {portfolioData.successfulAllotments}
            </p>
            <p className="text-sm text-muted-foreground">Successful Allotments</p>
          </div>
        </div>

        {/* Current Portfolio Value */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
              <Icon name="BarChart3" size={20} color="white" strokeWidth={2} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">VALUE</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(portfolioData.currentPortfolioValue)}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Current Value</span>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={portfolioData.monthlyChange > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={14} 
                  className={portfolioData.monthlyChange > 0 ? "text-success" : "text-error"} 
                />
                <span className={`text-xs font-mono ${portfolioData.monthlyChange > 0 ? "text-success" : "text-error"}`}>
                  {formatPercentage(portfolioData.monthlyChange)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance Summary */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
              <Icon name="Target" size={16} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Total Returns</p>
              <p className="text-xs text-muted-foreground">Since inception</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-success">
              {formatCurrency(portfolioData.totalReturn)}
            </p>
            <p className="text-sm font-mono text-success">
              {formatPercentage(portfolioData.returnPercentage)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverviewCard;