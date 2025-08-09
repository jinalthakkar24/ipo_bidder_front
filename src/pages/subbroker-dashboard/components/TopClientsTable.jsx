import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopClientsTable = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('investment');

  const clientsData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      totalInvestment: 1250000,
      activeApplications: 3,
      successfulAllotments: 12,
      joinDate: '2024-03-15',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      totalInvestment: 980000,
      activeApplications: 2,
      successfulAllotments: 8,
      joinDate: '2024-01-20',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastActivity: '4 hours ago'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      totalInvestment: 750000,
      activeApplications: 1,
      successfulAllotments: 15,
      joinDate: '2023-11-10',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastActivity: '1 day ago'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 65432 10987',
      totalInvestment: 650000,
      activeApplications: 4,
      successfulAllotments: 6,
      joinDate: '2024-05-08',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastActivity: '6 hours ago'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 54321 09876',
      totalInvestment: 420000,
      activeApplications: 0,
      successfulAllotments: 9,
      joinDate: '2024-02-14',
      status: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      lastActivity: '1 week ago'
    }
  ];

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  const sortedClients = [...clientsData].sort((a, b) => {
    if (sortBy === 'investment') return b.totalInvestment - a.totalInvestment;
    if (sortBy === 'allotments') return b.successfulAllotments - a.successfulAllotments;
    if (sortBy === 'applications') return b.activeApplications - a.activeApplications;
    return a.name.localeCompare(b.name);
  });

  const handleClientClick = (clientId) => {
    navigate(`/client-management?client=${clientId}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Top Clients by Investment</h2>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="investment">Sort by Investment</option>
              <option value="allotments">Sort by Allotments</option>
              <option value="applications">Sort by Applications</option>
              <option value="name">Sort by Name</option>
            </select>
            <Button variant="outline" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Client</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Investment</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Applications</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Allotments</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client, index) => (
              <tr
                key={client.id}
                className="border-b border-border hover:bg-muted/20 transition-micro cursor-pointer"
                onClick={() => handleClientClick(client.id)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                      <p className="text-xs text-muted-foreground">Last active: {client.lastActivity}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(client.totalInvestment)}</p>
                    <p className="text-sm text-muted-foreground">Total invested</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={16} className="text-accent" />
                    <span className="font-medium text-foreground">{client.activeApplications}</span>
                    <span className="text-sm text-muted-foreground">active</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-success" />
                    <span className="font-medium text-foreground">{client.successfulAllotments}</span>
                    <span className="text-sm text-muted-foreground">successful</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon 
                      name={client.status === 'active' ? 'CheckCircle' : 'Clock'} 
                      size={12} 
                    />
                    <span className="capitalize">{client.status}</span>
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClientClick(client.id);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="FileText"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/ipo-application');
                      }}
                    >
                      Apply IPO
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing top 5 clients by investment volume</span>
          <div className="flex items-center space-x-4">
            <span>Total Portfolio Value: <strong className="text-foreground">₹40.5L</strong></span>
            <span>Average Success Rate: <strong className="text-success">85%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopClientsTable;