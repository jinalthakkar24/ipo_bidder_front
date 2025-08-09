import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const LandingPage = () => {
  const [featuredIPOs, setFeaturedIPOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      setIsLoggedIn(isAuthenticated);
    };

    // Check on component mount
    checkAuthStatus();

    // Listen for storage changes and custom auth events
    window.addEventListener('storage', checkAuthStatus);
    window.addEventListener('auth-change', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('auth-change', checkAuthStatus);
    };
  }, []);

  // Mock IPO data with GMP information inspired by InvestorGain
  const mockFeaturedIPOs = [
    {
      id: 'ipo-001',
      companyName: 'TechVision Solutions Ltd',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      sector: 'Technology',
      category: 'Mainboard',
      status: 'Open',
      priceRange: { min: 120, max: 135 },
      lotSize: 120,
      minInvestment: 16200,
      openingDate: '2025-01-10',
      closingDate: '2025-01-15',
      subscriptionLevel: 2.5,
      gmp: 25,
      gmpPercentage: 18.5,
      expectedListing: '2025-01-18',
      marketCap: 2400,
      freshIssue: 1200,
      offerForSale: 800
    },
    {
      id: 'ipo-002',
      companyName: 'Green Energy Corp',
      logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&crop=center',
      sector: 'Energy & Utilities',
      category: 'Mainboard',
      status: 'Open',
      priceRange: { min: 85, max: 95 },
      lotSize: 150,
      minInvestment: 14250,
      openingDate: '2025-01-08',
      closingDate: '2025-01-14',
      subscriptionLevel: 8.2,
      gmp: 12,
      gmpPercentage: 12.6,
      expectedListing: '2025-01-17',
      marketCap: 1800,
      freshIssue: 1000,
      offerForSale: 600
    },
    {
      id: 'ipo-003',
      companyName: 'Digital Finance Hub',
      logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center',
      sector: 'Financial Services',
      category: 'Mainboard',
      status: 'Open',
      priceRange: { min: 200, max: 220 },
      lotSize: 100,
      minInvestment: 22000,
      openingDate: '2025-01-05',
      closingDate: '2025-01-12',
      subscriptionLevel: 12.8,
      gmp: 35,
      gmpPercentage: 15.9,
      expectedListing: '2025-01-15',
      marketCap: 3200,
      freshIssue: 1800,
      offerForSale: 1200
    },
    {
      id: 'ipo-004',
      companyName: 'MediCare Innovations',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      sector: 'Healthcare',
      category: 'SME',
      status: 'Upcoming',
      priceRange: { min: 45, max: 55 },
      lotSize: 200,
      minInvestment: 11000,
      openingDate: '2025-01-20',
      closingDate: '2025-01-25',
      subscriptionLevel: null,
      gmp: 8,
      gmpPercentage: 14.5,
      expectedListing: '2025-01-28',
      marketCap: 800,
      freshIssue: 500,
      offerForSale: 200
    },
    {
      id: 'ipo-005',
      companyName: 'CloudTech Enterprises',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&crop=center',
      sector: 'Technology',
      category: 'Mainboard',
      status: 'Open',
      priceRange: { min: 180, max: 200 },
      lotSize: 75,
      minInvestment: 15000,
      openingDate: '2025-01-12',
      closingDate: '2025-01-17',
      subscriptionLevel: 4.1,
      gmp: 22,
      gmpPercentage: 11.0,
      expectedListing: '2025-01-20',
      marketCap: 2800,
      freshIssue: 1500,
      offerForSale: 1000
    }
  ];

  const marketStats = [
    { label: 'Total IPOs Listed', value: '245+', icon: 'TrendingUp', color: 'text-success', description: 'Successfully listed companies' },
    { label: 'Active Applications', value: '12,485', icon: 'FileText', color: 'text-primary', description: 'Applications this month' },
    { label: 'Total Investment', value: '₹2,450 Cr', icon: 'IndianRupee', color: 'text-accent', description: 'Total funds raised' },
    { label: 'Success Rate', value: '94.5%', icon: 'Target', color: 'text-success', description: 'Profitable listings' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Retail Investor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
      rating: 5,
      text: 'IPO Bidder has transformed my investment journey. The GMP analysis and real-time data helped me make profitable decisions consistently.',
      profits: '₹2.4L+ returns'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Financial Advisor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c328e5a8?w=100&h=100&fit=crop&crop=center',
      rating: 5,
      text: 'As a financial advisor, I recommend IPO Bidder to all my clients. The platform provides comprehensive insights that are crucial for IPO investments.',
      profits: '15+ successful IPOs'
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Business Owner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
      rating: 5,
      text: 'The user-friendly interface and expert analysis make IPO investing accessible. I have successfully invested in multiple IPOs with great returns.',
      profits: '₹5.2L+ portfolio growth'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up in minutes and connect your demat account securely',
      icon: 'UserPlus',
      color: 'bg-primary'
    },
    {
      step: '02',
      title: 'Research & Analyze',
      description: 'Access detailed IPO analysis, GMP data, and expert recommendations',
      icon: 'Search',
      color: 'bg-success'
    },
    {
      step: '03',
      title: 'Apply & Invest',
      description: 'Submit applications seamlessly and track your investments in real-time',
      icon: 'TrendingUp',
      color: 'bg-accent'
    },
    {
      step: '04',
      title: 'Monitor & Profit',
      description: 'Track allotment status, listing performance, and manage your portfolio',
      icon: 'Target',
      color: 'bg-secondary'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeaturedIPOs(mockFeaturedIPOs);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    if (amount >= 1000) {
      return `₹${(amount / 1000)?.toFixed(1)}K Cr`;
    }
    return `₹${amount} Cr`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getGMPColor = (percentage) => {
    if (percentage >= 15) return 'text-success font-semibold';
    if (percentage >= 10) return 'text-warning font-semibold';
    if (percentage >= 5) return 'text-primary font-semibold';
    return 'text-muted-foreground';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section - Enhanced with animations and better visuals */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 md:py-32 mt-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative container mx-auto px-6 max-w-7xl">
          <div className="text-center text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <Icon name="TrendingUp" size={20} className="text-accent" />
              <span className="text-sm font-medium">India's #1 IPO Investment Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Gateway to 
              <br />
              <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">
                IPO Success
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Discover, analyze, and invest in the most promising Initial Public Offerings with confidence, 
              real-time data, and expert guidance. Join 50,000+ successful investors.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              {!isLoggedIn ? (
                <Link to="/login">
                  <Button 
                    size="xl" 
                    variant="secondary" 
                    iconName="TrendingUp" 
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-black font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Start Investing Now
                  </Button>
                </Link>
              ) : (
                <Link to="/client-dashboard">
                  <Button 
                    size="xl" 
                    variant="secondary" 
                    iconName="BarChart3" 
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-black font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              )}
              <Link to="/ipo-listings">
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" 
                  iconName="Eye" 
                  iconPosition="left"
                >
                  Explore IPOs
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-accent" />
                <span className="text-sm font-medium">Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-accent" />
                <span className="text-sm font-medium">50,000+ Investors Trust Us</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-accent" />
                <span className="text-sm font-medium">94.5% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Market Statistics - Enhanced with animations */}
      <section className="py-16 bg-card border-b border-border relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Live Market Performance</h2>
            <p className="text-muted-foreground">Real-time statistics that showcase our platform's success</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marketStats?.map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-8 rounded-2xl bg-gradient-to-br from-muted/20 to-muted/40 hover:from-muted/30 hover:to-muted/60 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat?.color === 'text-success' ? 'from-success/20 to-success/30' : stat?.color === 'text-primary' ? 'from-primary/20 to-primary/30' : 'from-accent/20 to-accent/30'} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={stat?.icon} size={28} className={`${stat?.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat?.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{stat?.label}</div>
                <div className="text-xs text-muted-foreground">{stat?.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section - New addition */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Icon name="Lightbulb" size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with IPO investments in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks?.map((step, index) => (
              <div 
                key={index}
                className="text-center group hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${step?.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon name={step?.icon} size={32} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold">
                    {step?.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured IPOs Table - Enhanced */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">Live Data</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Live IPO Market
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time IPO data with Grey Market Premium (GMP) analysis to help you make informed investment decisions.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={32} className="animate-spin text-primary" />
                <span className="text-lg text-muted-foreground">Loading live IPO data...</span>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-muted/40 to-muted/60 px-8 py-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Current & Upcoming IPOs</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                      Live market data updated every 5 minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Last updated</div>
                    <div className="text-sm font-semibold text-foreground">Just now</div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left py-5 px-8 font-bold text-foreground">Company</th>
                      <th className="text-left py-5 px-4 font-bold text-foreground">Price Band</th>
                      <th className="text-left py-5 px-4 font-bold text-foreground">GMP</th>
                      <th className="text-left py-5 px-4 font-bold text-foreground">Lot Size</th>
                      <th className="text-left py-5 px-4 font-bold text-foreground">Dates</th>
                      <th className="text-left py-5 px-4 font-bold text-foreground">Subscription</th>
                      <th className="text-left py-5 px-4 font-bold text-foreground">Status</th>
                      <th className="text-right py-5 px-8 font-bold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredIPOs?.map((ipo, index) => (
                      <tr key={ipo?.id} className={`border-b border-border hover:bg-gradient-to-r hover:from-muted/10 hover:to-muted/20 transition-all duration-200 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/5'}`}>
                        <td className="py-6 px-8">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Image
                                src={ipo?.logo}
                                alt={`${ipo?.companyName} logo`}
                                className="w-12 h-12 rounded-xl object-cover ring-2 ring-border"
                              />
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <div className="font-bold text-foreground hover:text-primary transition-colors">
                                {ipo?.companyName}
                              </div>
                              <div className="text-sm text-muted-foreground">{ipo?.sector} • {ipo?.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="font-bold text-foreground">₹{ipo?.priceRange?.min} - ₹{ipo?.priceRange?.max}</div>
                          <div className="text-sm text-muted-foreground">{formatCurrency(ipo?.marketCap)} Market Cap</div>
                        </td>
                        <td className="py-6 px-4">
                          <div className={`font-bold ${getGMPColor(ipo?.gmpPercentage)} flex items-center space-x-1`}>
                            <Icon name="TrendingUp" size={16} />
                            <span>₹{ipo?.gmp} (+{ipo?.gmpPercentage}%)</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Est. Listing Gains</div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="font-bold text-foreground">{ipo?.lotSize} shares</div>
                          <div className="text-sm text-muted-foreground">₹{ipo?.minInvestment?.toLocaleString('en-IN')} min</div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center text-foreground">
                              <Icon name="Calendar" size={14} className="mr-1 text-primary" />
                              {formatDate(ipo?.openingDate)}
                            </div>
                            <div className="text-muted-foreground pl-5">to {formatDate(ipo?.closingDate)}</div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          {ipo?.subscriptionLevel ? (
                            <div className="text-center">
                              <div className="font-bold text-lg text-foreground">
                                {ipo?.subscriptionLevel}x
                              </div>
                              <div className="text-sm text-muted-foreground">subscribed</div>
                              <div className="w-full bg-muted rounded-full h-2 mt-2">
                                <div 
                                  className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min((ipo?.subscriptionLevel / 15) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Not started</div>
                              <Icon name="Clock" size={20} className="mx-auto mt-1 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                        <td className="py-6 px-4">
                          <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${getStatusColor(ipo?.status)}`}>
                            {ipo?.status}
                          </span>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <Link to={`/ipo-application?ipo=${ipo?.id}`}>
                              <Button size="sm" variant="outline" iconName="Eye" className="hover:scale-105 transition-transform">
                                View
                              </Button>
                            </Link>
                            {ipo?.status === 'Open' && (
                              <Link to={`/ipo-application?ipo=${ipo?.id}`}>
                                <Button size="sm" iconName="TrendingUp" className="hover:scale-105 transition-transform bg-gradient-to-r from-primary to-success">
                                  Apply Now
                                </Button>
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="bg-gradient-to-r from-muted/20 to-muted/40 px-8 py-6 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-sm text-muted-foreground flex items-center space-x-4">
                    <span>Showing {featuredIPOs?.length} of {featuredIPOs?.length} IPOs</span>
                    <div className="flex items-center space-x-1 text-xs">
                      <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                      <span>Live updates every 5 minutes</span>
                    </div>
                  </div>
                  <Link to="/ipo-listings">
                    <Button variant="outline" iconName="ArrowRight" iconPosition="right" className="hover:scale-105 transition-transform">
                      View All IPOs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Testimonials Section - New addition */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Icon name="MessageCircle" size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Investors Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of successful investors who trust IPO Bidder
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-2xl border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-success"></div>
              
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials?.[currentTestimonial]?.rating)}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-foreground mb-8 font-medium italic leading-relaxed">
                  "{testimonials?.[currentTestimonial]?.text}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-16 h-16 rounded-full ring-4 ring-primary/20"
                  />
                  <div className="text-left">
                    <div className="font-bold text-foreground text-lg">
                      {testimonials?.[currentTestimonial]?.name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials?.[currentTestimonial]?.role}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-4 py-2 text-success font-semibold">
                  <Icon name="TrendingUp" size={16} />
                  <span>{testimonials?.[currentTestimonial]?.profits}</span>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Features Section - Enhanced */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
              <Icon name="Star" size={20} className="text-accent" />
              <span className="text-sm font-medium text-accent">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose IPO Bidder?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced tools and insights to maximize your IPO investment success with data-driven decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Icon name="BarChart3" size={36} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Real-time Analysis
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Get live GMP data, subscription levels, and expert analysis for every IPO. Make informed decisions with comprehensive market insights and predictive analytics.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} />
                  <span>Live Data</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} />
                  <span>GMP Analysis</span>
                </div>
              </div>
            </div>

            <div className="group text-center p-8 bg-card rounded-2xl border border-border hover:border-success/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="bg-gradient-to-br from-success/10 to-success/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Icon name="Shield" size={36} className="text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-success transition-colors">
                Secure Platform
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Bank-grade security with seamless integration to your demat account. Advanced encryption and secure payment gateways ensure your investments are protected.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-success opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} />
                  <span>256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            <div className="group text-center p-8 bg-card rounded-2xl border border-border hover:border-accent/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Icon name="Users" size={36} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                Expert Support
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Dedicated support team and investment guidance from market experts. Get personalized recommendations and 24/7 assistance for all your IPO investments.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} />
                  <span>Expert Advice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto px-6 max-w-7xl text-center">
          <div className="text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Icon name="Rocket" size={24} className="text-accent" />
              <span className="font-semibold">Start Your IPO Journey Today</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Start Your 
              <br />
              <span className="text-accent">IPO Journey?</span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful investors who trust IPO Bidder for their investment needs. 
              Get started with just ₹10,000 and access premium IPO opportunities.
            </p>
            
            {!isLoggedIn && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link to="/login">
                  <Button 
                    size="xl" 
                    variant="secondary" 
                    iconName="UserPlus" 
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-black font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 px-8 py-4"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="xl" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 px-8 py-4" 
                    iconName="LogIn" 
                    iconPosition="left"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}

            {/* CTA Benefits */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                <Icon name="Zap" size={24} className="text-accent" />
                <span className="font-semibold">Instant Account Setup</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                <Icon name="Gift" size={24} className="text-accent" />
                <span className="font-semibold">No Hidden Charges</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                <Icon name="Award" size={24} className="text-accent" />
                <span className="font-semibold">Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer - Enhanced */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="TrendingUp" size={28} className="text-primary" />
                <span className="text-xl font-bold text-foreground">IPO Bidder</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                India's most trusted IPO investment platform with real-time analysis and expert guidance.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <Icon name="Twitter" size={16} className="text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <Icon name="Linkedin" size={16} className="text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <Icon name="Facebook" size={16} className="text-primary" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link to="/ipo-listings" className="block text-muted-foreground hover:text-foreground transition-colors">IPO Listings</Link>
                <Link to="/client-dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
                <Link to="/allotment-status" className="block text-muted-foreground hover:text-foreground transition-colors">Allotment Status</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Market Analysis</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Live Chat</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Risk Disclosure</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Compliance</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                © 2025 IPO Bidder. All rights reserved. | SEBI Registered Investment Advisor
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Secured by SSL</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Custom Animations Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;