import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientStatsPanel = () => {
  const stats = [
    {
      title: "Total Clients",
      value: "47",
      change: "+3 this month",
      changeType: "positive",
      icon: "Users",
      color: "bg-primary"
    },
    {
      title: "Verification Pending",
      value: "8",
      change: "-2 from last week",
      changeType: "positive",
      icon: "Clock",
      color: "bg-warning"
    },
    {
      title: "Active Investors",
      value: "39",
      change: "+5 this month",
      changeType: "positive",
      icon: "TrendingUp",
      color: "bg-success"
    },
    {
      title: "Total Investments",
      value: "₹12.4L",
      change: "+18% this quarter",
      changeType: "positive",
      icon: "DollarSign",
      color: "bg-accent"
    }
  ];

  const topPerformers = [
    {
      name: "Rajesh Kumar",
      investment: "₹2.8L",
      applications: 12,
      successRate: "92%"
    },
    {
      name: "Priya Sharma",
      investment: "₹2.1L",
      applications: 8,
      successRate: "88%"
    },
    {
      name: "Amit Patel",
      investment: "₹1.9L",
      applications: 10,
      successRate: "85%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center justify-center w-12 h-12 ${stat.color} rounded-lg text-white`}>
                <Icon name={stat.icon} size={24} strokeWidth={2} />
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Top Performers</h3>
          <Icon name="Award" size={20} className="text-accent" />
        </div>
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{performer.name}</h4>
                  <p className="text-sm text-muted-foreground">{performer.applications} applications</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{performer.investment}</p>
                <p className="text-sm text-success">{performer.successRate} success</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientStatsPanel;