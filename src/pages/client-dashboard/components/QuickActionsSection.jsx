import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSection = () => {
  const quickActions = [
    {
      id: 1,
      title: "Browse IPOs",
      description: "Discover new investment opportunities",
      path: "/ipo-listings",
      icon: "TrendingUp",
      color: "bg-primary",
      badge: "12 Active"
    },
    {
      id: 2,
      title: "Apply for IPO",
      description: "Submit new IPO application",
      path: "/ipo-application",
      icon: "FileText",
      color: "bg-accent",
      badge: "Quick Apply"
    },
    {
      id: 3,
      title: "Check Status",
      description: "Track allotment results",
      path: "/allotment-status",
      icon: "CheckCircle",
      color: "bg-success",
      badge: "Real-time"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "application",
      title: "Applied for TechVision Solutions IPO",
      description: "Application submitted successfully for 2 lots",
      timestamp: "2 hours ago",
      icon: "FileText",
      color: "text-primary"
    },
    {
      id: 2,
      type: "allotment",
      title: "Green Energy Innovations - Allotted",
      description: "1 lot allotted out of 1 applied",
      timestamp: "1 day ago",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 3,
      type: "refund",
      title: "Digital Commerce Ltd - Refund Processed",
      description: "₹37,800 refunded to your bank account",
      timestamp: "3 days ago",
      icon: "ArrowLeft",
      color: "text-warning"
    },
    {
      id: 4,
      type: "listing",
      title: "BioMed Research Corp Listed",
      description: "Listed at ₹245 (11.36% premium)",
      timestamp: "1 week ago",
      icon: "TrendingUp",
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-4">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.path}
              className="group flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-elevated hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 ${action.color} rounded-lg text-white group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={action.icon} size={20} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground rounded-full">
                  {action.badge}
                </span>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Quick Links */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              iconPosition="left"
              className="justify-start"
            >
              Update Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="justify-start"
            >
              Download Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${activity.color}`}>
                <Icon name={activity.icon} size={14} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Link 
            to="/allotment-status"
            className="flex items-center justify-center space-x-2 text-primary hover:text-primary/80 transition-micro"
          >
            <span className="text-sm font-medium">View complete activity history</span>
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;