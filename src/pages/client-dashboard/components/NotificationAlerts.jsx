import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationAlerts = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deadline",
      title: "IPO Application Deadline Approaching",
      message: "TechVision Solutions IPO closes in 2 days. Don\'t miss this opportunity!",
      timestamp: "2 hours ago",
      priority: "high",
      actionRequired: true,
      actionText: "Apply Now",
      actionPath: "/ipo-application",
      isRead: false
    },
    {
      id: 2,
      type: "allotment",
      title: "Allotment Result Available",
      message: "Green Energy Innovations IPO allotment results are now available. You have been allotted 1 lot.",
      timestamp: "1 day ago",
      priority: "medium",
      actionRequired: true,
      actionText: "View Details",
      actionPath: "/allotment-status",
      isRead: false
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Confirmation Required",
      message: "Please confirm your UPI payment for FinTech Dynamics SME IPO application.",
      timestamp: "3 hours ago",
      priority: "high",
      actionRequired: true,
      actionText: "Confirm Payment",
      actionPath: "/ipo-application",
      isRead: false
    },
    {
      id: 4,
      type: "listing",
      title: "IPO Listing Update",
      message: "BioMed Research Corp will be listed tomorrow at 10:00 AM on NSE & BSE.",
      timestamp: "6 hours ago",
      priority: "low",
      actionRequired: false,
      isRead: true
    }
  ]);

  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline': return 'Clock';
      case 'allotment': return 'Award';
      case 'payment': return 'CreditCard';
      case 'listing': return 'TrendingUp';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'border-error/20 bg-error/5';
    if (priority === 'medium') return 'border-warning/20 bg-warning/5';
    switch (type) {
      case 'allotment': return 'border-success/20 bg-success/5';
      case 'listing': return 'border-primary/20 bg-primary/5';
      default: return 'border-border bg-muted/30';
    }
  };

  const getIconColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    switch (type) {
      case 'allotment': return 'text-success';
      case 'listing': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <div className="flex items-center justify-center w-6 h-6 bg-error text-white text-xs font-bold rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {notifications.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              iconName={showAll ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {showAll ? 'Show Less' : `Show All (${notifications.length})`}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
          >
            Settings
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {displayedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`relative border rounded-lg p-4 transition-all duration-200 ${getNotificationColor(notification.type, notification.priority)} ${
              !notification.isRead ? 'border-l-4 border-l-primary' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-background ${getIconColor(notification.type, notification.priority)}`}>
                  <Icon name={getNotificationIcon(notification.type)} size={16} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </h4>
                    {notification.priority === 'high' && (
                      <div className="flex items-center space-x-1 px-2 py-0.5 bg-error/10 border border-error/20 rounded-full">
                        <Icon name="AlertTriangle" size={10} className="text-error" />
                        <span className="text-xs font-medium text-error">Urgent</span>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'} mb-2`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    {notification.actionRequired && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => markAsRead(notification.id)}
                        className="ml-4"
                      >
                        {notification.actionText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => markAsRead(notification.id)}
                    className="w-6 h-6"
                    iconName="Check"
                    iconSize={12}
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dismissNotification(notification.id)}
                  className="w-6 h-6"
                  iconName="X"
                  iconSize={12}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {unreadCount === 0 && notifications.length > 0 && (
        <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">All caught up! No new notifications.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationAlerts;