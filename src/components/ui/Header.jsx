import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Logo from './Logo';
import NotificationDropdown from './NotificationDropdown';
import AuthDropdown from './AuthDropdown';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // Simulate user authentication state - replace with actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'IPOs', path: '/ipo-listings', icon: 'TrendingUp' },
    { label: 'Dashboard', path: '/client-dashboard', icon: 'BarChart3' },
    { label: 'Clients', path: '/client-management', icon: 'Users' },
    { label: 'Status', path: '/allotment-status', icon: 'CheckCircle' }
  ];

  const isActivePath = (path) => {
    if (path === '/client-dashboard') {
      return location?.pathname === '/client-dashboard' || location?.pathname === '/subbroker-dashboard';
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsNotificationOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-micro">
            <Logo size="medium" showText={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              // Logged in user: Show profile and notification buttons
              <>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                    iconName="Bell"
                    iconSize={18}
                    onClick={toggleNotifications}
                  />
                  <NotificationDropdown 
                    isOpen={isNotificationOpen} 
                    onClose={closeNotifications}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex"
                  iconName="User"
                  iconSize={18}
                />
                {/* Demo logout button - replace with actual logout logic */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              // Not logged in: Show unified auth dropdown
              <AuthDropdown 
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={handleLogout}
                className="hidden md:block"
              />
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            />
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-background md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-micro ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Actions */}
              <div className="border-t border-border pt-4 mt-4">
                {isLoggedIn ? (
                  // Logged in mobile options
                  <>
                    <div 
                      className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-muted rounded-lg transition-colors"
                      onClick={() => {
                        setIsNotificationOpen(!isNotificationOpen);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon name="Bell" size={20} className="text-muted-foreground" />
                      <span className="text-base font-medium text-muted-foreground">Notifications</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <Icon name="User" size={20} className="text-muted-foreground" />
                      <span className="text-base font-medium text-muted-foreground">Profile</span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-muted rounded-lg transition-colors"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon name="LogOut" size={20} className="text-muted-foreground" />
                      <span className="text-base font-medium text-muted-foreground">Logout</span>
                    </div>
                  </>
                ) : (
                  // Not logged in mobile options - Creative mobile auth UI
                  <div className="space-y-3">
                    {/* Mobile Quick Login */}
                    <div 
                      className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-4 cursor-pointer hover:from-success/20 hover:to-success/10 transition-all duration-300"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogin();
                        // Navigate to login
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                          <Icon name="LogIn" size={18} className="text-success" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Quick Login</p>
                          <p className="text-sm text-muted-foreground">Access your account</p>
                        </div>
                        <Icon name="ChevronRight" size={16} className="text-success ml-auto" />
                      </div>
                    </div>

                    {/* Mobile Create Account */}
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-4 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Icon name="UserPlus" size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Create Account</p>
                          <p className="text-sm text-muted-foreground">Start investing in IPOs</p>
                        </div>
                        <Icon name="ChevronRight" size={16} className="text-primary ml-auto" />
                      </div>
                    </Link>

                    {/* Mobile Benefits */}
                    <div className="bg-muted/50 rounded-lg p-3 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Icon name="Shield" size={12} className="text-success" />
                          <span>Secure & SEBI registered</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Icon name="Zap" size={12} className="text-primary" />
                          <span>Instant IPO applications</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;