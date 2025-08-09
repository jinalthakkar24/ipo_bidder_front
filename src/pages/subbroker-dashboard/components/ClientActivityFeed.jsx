import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientActivityFeed = () => {
  const activities = [
    {
      id: 1,
      clientName: 'Rajesh Kumar',
      action: 'Applied for IPO',
      target: 'TechCorp Solutions Ltd',
      amount: '₹1,50,000',
      timestamp: '2 hours ago',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      clientName: 'Priya Sharma',
      action: 'Allotment Received',
      target: 'Digital Finance Corp',
      amount: '₹2,10,000',
      timestamp: '4 hours ago',
      status: 'success',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      clientName: 'Amit Patel',
      action: 'Payment Completed',
      target: 'Healthcare Innovations',
      amount: '₹75,000',
      timestamp: '6 hours ago',
      status: 'success',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      clientName: 'Sneha Reddy',
      action: 'Application Rejected',
      target: 'Green Energy Ventures',
      amount: '₹95,000',
      timestamp: '1 day ago',
      status: 'error',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 5,
      clientName: 'Vikram Singh',
      action: 'Profile Updated',
      target: 'Bank details verified',
      amount: '',
      timestamp: '1 day ago',
      status: 'info',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 6,
      clientName: 'Kavya Nair',
      action: 'Applied for IPO',
      target: 'TechCorp Solutions Ltd',
      amount: '₹3,00,000',
      timestamp: '2 days ago',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const getStatusIcon = (status) => {
    const statusConfig = {
      'pending': { icon: 'Clock', color: 'text-warning' },
      'success': { icon: 'CheckCircle', color: 'text-success' },
      'error': { icon: 'XCircle', color: 'text-error' },
      'info': { icon: 'Info', color: 'text-primary' }
    };
    
    return statusConfig[status] || statusConfig['info'];
  };

  const getActionIcon = (action) => {
    if (action.includes('Applied')) return 'FileText';
    if (action.includes('Allotment')) return 'Award';
    if (action.includes('Payment')) return 'CreditCard';
    if (action.includes('Rejected')) return 'XCircle';
    if (action.includes('Updated')) return 'Edit';
    return 'Activity';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Client Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All Activity
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const statusConfig = getStatusIcon(activity.status);
          
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-micro"
            >
              <div className="relative">
                <img
                  src={activity.avatar}
                  alt={activity.clientName}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-card border-2 border-card flex items-center justify-center ${statusConfig.color}`}>
                  <Icon name={statusConfig.icon} size={10} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.clientName}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name={getActionIcon(activity.action)} size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {activity.action}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      {activity.target}
                    </p>
                  </div>
                  
                  <div className="text-right ml-4">
                    {activity.amount && (
                      <p className="text-sm font-medium text-foreground">
                        {activity.amount}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Activity" size={16} />
          <span>Showing recent 6 activities</span>
        </div>
      </div>
    </div>
  );
};

export default ClientActivityFeed;