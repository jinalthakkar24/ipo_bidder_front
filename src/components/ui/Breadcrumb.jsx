import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const breadcrumbMap = {
    '/': { label: 'Home', icon: 'Home' },
    '/ipo-listings': { label: 'IPO Listings', icon: 'TrendingUp' },
    '/ipo-application': { label: 'IPO Application', icon: 'FileText' },
    '/client-dashboard': { label: 'Client Dashboard', icon: 'BarChart3' },
    '/subbroker-dashboard': { label: 'Subbroker Dashboard', icon: 'BarChart3' },
    '/client-management': { label: 'Client Management', icon: 'Users' },
    '/allotment-status': { label: 'Allotment Status', icon: 'CheckCircle' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ path: '/', label: 'Home', icon: 'Home' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const breadcrumbInfo = breadcrumbMap[currentPath];
      if (breadcrumbInfo) {
        breadcrumbs.push({
          path: currentPath,
          label: breadcrumbInfo.label,
          icon: breadcrumbInfo.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-border" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <div className="flex items-center space-x-1 text-foreground font-medium">
              <Icon name={breadcrumb.icon} size={14} />
              <span className="hidden sm:inline">{breadcrumb.label}</span>
              <span className="sm:hidden">{breadcrumb.label.split(' ')[0]}</span>
            </div>
          ) : (
            <Link
              to={breadcrumb.path}
              className="flex items-center space-x-1 hover:text-foreground transition-micro"
            >
              <Icon name={breadcrumb.icon} size={14} />
              <span className="hidden sm:inline">{breadcrumb.label}</span>
              <span className="sm:hidden">{breadcrumb.label.split(' ')[0]}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;