import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthDropdown = ({ isLoggedIn, onLogin, onLogout, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAuthAction = (action) => {
    setIsOpen(false);
    if (action === 'login') {
      navigate('/login');
      onLogin?.();
    } else if (action === 'register') {
      navigate('/register');
    } else if (action === 'logout') {
      onLogout?.();
    }
  };

  if (isLoggedIn) {
    return null; // Don't show auth dropdown when logged in
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Redesigned Trigger Button */}
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 border-0 px-6 py-2 rounded-full group"
      >
        <div className="flex items-center justify-center space-x-2 relative z-10">
          <Icon name="Rocket" size={16} className="group-hover:rotate-12 transition-transform duration-200" />
          <span>Get Started</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={14} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
        {/* Subtle hover shimmer effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
      </Button>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-card border border-border/60 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-md bg-card/95">
          {/* Refined Header */}
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-6 border-b border-border/30">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Welcome to IPO Bidder</h3>
                <p className="text-sm text-muted-foreground">Start your investment journey today</p>
              </div>
            </div>
          </div>

          {/* Enhanced Menu Options */}
          <div className="p-3 space-y-2">
            {/* Premium Login Option */}
            <button
              onClick={() => handleAuthAction('login')}
              className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gradient-to-r hover:from-success/5 hover:to-success/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-success/20"
            >
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center group-hover:bg-success/20 transition-colors duration-200">
                <Icon name="LogIn" size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Sign In</p>
                <p className="text-sm text-muted-foreground">
                  Access your dashboard & portfolio
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowRight" size={18} className="text-success" />
              </div>
            </button>

            {/* Premium Create Account Option */}
            <button
              onClick={() => handleAuthAction('register')}
              className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Icon name="UserPlus" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Create Account</p>
                <p className="text-sm text-muted-foreground">
                  Join thousands of successful investors
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowRight" size={18} className="text-primary" />
              </div>
            </button>
          </div>

          {/* Enhanced Footer with Trust Indicators */}
          <div className="bg-muted/20 p-4 border-t border-border/30">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span>SEBI Registered</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Lock" size={14} className="text-blue-500" />
                  <span>Bank Security</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Users" size={14} className="text-purple-500" />
                  <span>50K+ Users</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Start with <span className="font-semibold text-foreground">zero fees</span> • No hidden charges
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;