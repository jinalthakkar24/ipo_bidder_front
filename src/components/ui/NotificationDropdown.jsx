import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationDropdown = ({ isOpen, onClose, className = '' }) => {
  const dropdownRef = useRef(null);
  
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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline': return 'Clock';
      case 'allotment': return 'Award';
      case 'payment': return 'CreditCard';
      case 'listing': return 'TrendingUp';
      default: return 'Bell';
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

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 5); // Show only 5 most recent

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <div className="flex items-center justify-center w-5 h-5 bg-error text-white text-xs font-bold rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="xs"
            onClick={markAllAsRead}
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="py-2">
            {recentNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                } ${
                  index !== recentNotifications.length - 1 ? 'border-b border-border/50' : ''
                }`}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-background ${getIconColor(notification.type, notification.priority)} flex-shrink-0 mt-0.5`}>
                    <Icon name={getNotificationIcon(notification.type)} size={14} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm font-medium truncate ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h4>
                          {notification.priority === 'high' && (
                            <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-error/10 border border-error/20 rounded-full flex-shrink-0">
                              <Icon name="AlertTriangle" size={8} className="text-error" />
                              <span className="text-xs font-medium text-error">Urgent</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'} line-clamp-2 mb-2`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                          {notification.actionRequired && (
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                                onClose();
                              }}
                              className="text-xs"
                            >
                              {notification.actionText}
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                        className="w-6 h-6 ml-2 flex-shrink-0"
                        iconName="X"
                        iconSize={10}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 5 && (
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-full text-xs"
          >
            View all notifications ({notifications.length})
          </Button>
        </div>
      )}

      {unreadCount === 0 && notifications.length > 0 && (
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-success text-xs">
            <Icon name="CheckCircle" size={14} />
            <span className="font-medium">All caught up!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;