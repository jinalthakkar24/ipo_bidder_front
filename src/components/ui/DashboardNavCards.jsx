import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardNavCards = ({ userType = 'client' }) => {
  const clientNavItems = [
    {
      title: 'Browse IPOs',
      description: 'Discover new investment opportunities',
      path: '/ipo-listings',
      icon: 'TrendingUp',
      color: 'bg-primary',
      stats: '12 Active IPOs'
    },
    {
      title: 'My Applications',
      description: 'Track your IPO applications',
      path: '/ipo-application',
      icon: 'FileText',
      color: 'bg-accent',
      stats: '3 Pending'
    },
    {
      title: 'Allotment Status',
      description: 'Check allocation results',
      path: '/allotment-status',
      icon: 'CheckCircle',
      color: 'bg-success',
      stats: '2 Allotted'
    }
  ];

  const subbrokerNavItems = [
    {
      title: 'Client Management',
      description: 'Manage your client portfolio',
      path: '/client-management',
      icon: 'Users',
      color: 'bg-primary',
      stats: '47 Active Clients'
    },
    {
      title: 'IPO Listings',
      description: 'View available opportunities',
      path: '/ipo-listings',
      icon: 'TrendingUp',
      color: 'bg-secondary',
      stats: '12 Available'
    },
    {
      title: 'Bulk Applications',
      description: 'Process multiple applications',
      path: '/ipo-application',
      icon: 'FileStack',
      color: 'bg-accent',
      stats: '23 Submitted'
    },
    {
      title: 'Status Overview',
      description: 'Monitor all client statuses',
      path: '/allotment-status',
      icon: 'BarChart3',
      color: 'bg-success',
      stats: '89% Success Rate'
    }
  ];

  const navItems = userType === 'subbroker' ? subbrokerNavItems : clientNavItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="group block p-6 bg-card rounded-lg border border-border shadow-subtle hover:shadow-elevated transition-all duration-200 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${item.color} rounded-lg text-white group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={item.icon} size={24} strokeWidth={2} />
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-muted-foreground">{item.stats}</div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {item.description}
          </p>
          
          <div className="flex items-center text-primary text-sm font-medium">
            <span>View Details</span>
            <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardNavCards;