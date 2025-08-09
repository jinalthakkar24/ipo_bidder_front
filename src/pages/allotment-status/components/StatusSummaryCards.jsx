import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusSummaryCards = ({ userType = 'client' }) => {
  const clientSummaryData = [
    {
      title: 'Total Applications',
      value: '12',
      change: '+3 this month',
      changeType: 'positive',
      icon: 'FileText',
      color: 'bg-primary'
    },
    {
      title: 'Success Rate',
      value: '67%',
      change: '+12% vs last year',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-success'
    },
    {
      title: 'Total Investment',
      value: '₹2,45,000',
      change: '+₹45,000 this month',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'bg-accent'
    },
    {
      title: 'Pending Refunds',
      value: '₹18,500',
      change: '2 applications',
      changeType: 'neutral',
      icon: 'RefreshCw',
      color: 'bg-warning'
    }
  ];

  const subbrokerSummaryData = [
    {
      title: 'Client Applications',
      value: '156',
      change: '+23 this week',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-primary'
    },
    {
      title: 'Overall Success Rate',
      value: '72%',
      change: '+8% vs last quarter',
      changeType: 'positive',
      icon: 'Award',
      color: 'bg-success'
    },
    {
      title: 'Total Volume',
      value: '₹12.4L',
      change: '+₹2.1L this month',
      changeType: 'positive',
      icon: 'BarChart3',
      color: 'bg-accent'
    },
    {
      title: 'Active Clients',
      value: '47',
      change: '89% participation',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'bg-secondary'
    }
  ];

  const summaryData = userType === 'subbroker' ? subbrokerSummaryData : clientSummaryData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 shadow-subtle hover:shadow-elevated transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${item.color} rounded-lg text-white`}>
              <Icon name={item.icon} size={24} strokeWidth={2} />
            </div>
            <div className="text-right">
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.changeType === 'positive' ?'bg-success/10 text-success' 
                  : item.changeType === 'negative' ?'bg-error/10 text-error' :'bg-muted text-muted-foreground'
              }`}>
                {item.changeType === 'positive' && <Icon name="TrendingUp" size={12} className="inline mr-1" />}
                {item.changeType === 'negative' && <Icon name="TrendingDown" size={12} className="inline mr-1" />}
                {item.change}
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{item.title}</h3>
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusSummaryCards;