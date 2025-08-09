import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'allotment',
      title: 'Allotment Results Available',
      message: 'TechCorp Solutions Ltd allotment results are now available for 8 clients',
      timestamp: '5 minutes ago',
      isRead: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'ipo_opening',
      title: 'New IPO Opening Tomorrow',
      message: 'Healthcare Innovations IPO opens tomorrow. 12 clients have shown interest.',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'medium',
      actionRequired: true
    },
    {
      id: 3,
      type: 'verification',
      title: 'Client Verification Required',
      message: 'Rajesh Kumar requires bank account verification to complete IPO application',
      timestamp: '4 hours ago',
      isRead: true,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Confirmation',
      message: 'Priya Sharma has completed payment for Digital Finance Corp IPO',
      timestamp: '6 hours ago',
      isRead: true,
      priority: 'low',
      actionRequired: false
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM IST',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'medium',
      actionRequired: false
    }
  ]);

  const getNotificationIcon = (type) => {
    const iconMap = {
      'allotment': 'Award',
      'ipo_opening': 'TrendingUp',
      'verification': 'AlertCircle',
      'payment': 'CreditCard',
      'system': 'Settings'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (type === 'allotment') return 'text-success';
    if (type === 'ipo_opening') return 'text-primary';
    if (type === 'payment') return 'text-success';
    return 'text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const config = {
      'high': { color: 'bg-error text-error-foreground', label: 'High' },
      'medium': { color: 'bg-warning text-warning-foreground', label: 'Medium' },
      'low': { color: 'bg-muted text-muted-foreground', label: 'Low' }
    };
    return config[priority] || config['low'];
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="Bell" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No notifications at the moment</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notification) => {
              const priorityConfig = getPriorityBadge(notification.priority);
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border hover:bg-muted/30 transition-micro cursor-pointer ${
                    !notification.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${
                      getNotificationColor(notification.type, notification.priority)
                    }`}>
                      <Icon 
                        name={getNotificationIcon(notification.type)} 
                        size={16} 
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`text-sm font-medium ${
                              !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityConfig.color}`}>
                              {priorityConfig.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            {notification.actionRequired && (
                              <Button variant="ghost" size="sm" className="text-xs">
                                Take Action
                              </Button>
                            )}
                          </div>
                        </div>

                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {notifications.length} notifications</span>
            <button className="text-primary hover:text-primary/80 font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;