import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustElements = ({ className = '' }) => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: '256-bit SSL Encryption',
      description: 'Your data is protected with bank-grade security'
    },
    {
      icon: 'Lock',
      title: 'SEBI Compliant',
      description: 'Regulated by Securities and Exchange Board of India'
    },
    {
      icon: 'CheckCircle',
      title: 'ISO 27001 Certified',
      description: 'International standard for information security'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Subbroker, Mumbai',
      content: 'Managing 45+ clients has never been easier. The bulk application feature saves me hours every week.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Individual Investor',
      content: 'Simple, secure, and transparent. Got my first IPO allotment through this platform!',
      rating: 5
    }
  ];

  const complianceBadges = [
    { name: 'SEBI', icon: 'Award' },
    { name: 'RBI', icon: 'Shield' },
    { name: 'ISO 27001', icon: 'CheckCircle' },
    { name: 'SSL Secured', icon: 'Lock' }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Your Security is Our Priority</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="text-center">
        <h4 className="text-sm font-medium text-foreground mb-4">Trusted & Regulated</h4>
        <div className="flex items-center justify-center space-x-6">
          {complianceBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg mb-2">
                <Icon name={badge.icon} size={16} className="text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Testimonials */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground text-center">Trusted by Thousands</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-3">"{testimonial.content}"</p>
              <div>
                <p className="text-xs font-medium text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Protection Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Data Protection Commitment</h4>
            <p className="text-xs text-muted-foreground">
              We are committed to protecting your privacy and personal data in accordance with Indian data protection laws. 
              Your information is used solely for IPO application processing and account management.
            </p>
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">Need help with registration?</p>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={12} className="text-primary" />
            <span className="text-xs text-primary">1800-123-4567</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} className="text-primary" />
            <span className="text-xs text-primary">support@ipobidder.com</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Available 24/7 for assistance</p>
      </div>
    </div>
  );
};

export default TrustElements;