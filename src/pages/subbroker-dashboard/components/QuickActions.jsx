import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add-client',
      title: 'Add New Client',
      description: 'Register a new client account',
      icon: 'UserPlus',
      color: 'bg-primary',
      action: () => navigate('/client-management'),
      variant: 'default'
    },
    {
      id: 'bulk-upload',
      title: 'Bulk Upload Clients',
      description: 'Import multiple clients via CSV/Excel',
      icon: 'Upload',
      color: 'bg-secondary',
      action: () => navigate('/client-management'),
      variant: 'secondary'
    },
    {
      id: 'apply-ipo',
      title: 'Apply for IPO',
      description: 'Submit IPO applications for clients',
      icon: 'FileText',
      color: 'bg-accent',
      action: () => navigate('/ipo-application'),
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="group p-4 rounded-lg border border-border hover:border-primary/20 hover:shadow-elevated transition-all duration-200 cursor-pointer"
            onClick={action.action}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-12 h-12 ${action.color} rounded-lg text-white group-hover:scale-110 transition-transform duration-200`}>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={action.icon}
                  className="text-white hover:bg-transparent"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
                
                <div className="mt-3">
                  <Button
                    variant={action.variant}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.action();
                    }}
                    className="group-hover:shadow-sm"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Active IPOs</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-success">89%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-accent">₹45L</p>
            <p className="text-xs text-muted-foreground">Total Invested</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-secondary">156</p>
            <p className="text-xs text-muted-foreground">Allotments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;