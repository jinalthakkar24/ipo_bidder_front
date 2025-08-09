import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCards = () => {
  const metrics = [
    {
      id: 'clients',
      title: 'Total Clients',
      value: '47',
      change: '+3',
      changeType: 'increase',
      icon: 'Users',
      color: 'bg-primary',
      description: 'Active client accounts'
    },
    {
      id: 'applications',
      title: 'Active Applications',
      value: '23',
      change: '+8',
      changeType: 'increase',
      icon: 'FileText',
      color: 'bg-accent',
      description: 'Pending IPO applications'
    },
    {
      id: 'allotments',
      title: 'Successful Allotments',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: 'Award',
      color: 'bg-success',
      description: 'This month'
    },
    {
      id: 'commission',
      title: 'Commission Earned',
      value: '₹2,45,680',
      change: '+15.2%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'bg-secondary',
      description: 'Current month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-card rounded-lg border border-border p-6 shadow-subtle hover:shadow-elevated transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${metric.color} rounded-lg text-white`}>
              <Icon name={metric.icon} size={24} strokeWidth={2} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric.changeType === 'increase' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={metric.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{metric.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
            <p className="text-sm font-medium text-foreground">{metric.title}</p>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;