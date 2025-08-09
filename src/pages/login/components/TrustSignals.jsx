import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Grade Security',
      description: '256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-factor protection'
    },
    {
      icon: 'CheckCircle',
      title: 'SEBI Compliant',
      description: 'Regulatory approved'
    }
  ];

  const trustBadges = [
    {
      name: 'SEBI Registered',
      icon: 'Award',
      color: 'text-success'
    },
    {
      name: 'SSL Secured',
      icon: 'Shield',
      color: 'text-primary'
    },
    {
      name: 'ISO Certified',
      icon: 'CheckCircle',
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Your Security is Our Priority
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name={badge.icon} size={16} className={badge.color} />
            <span className="text-xs font-medium text-muted-foreground">
              {badge.name}
            </span>
          </div>
        ))}
      </div>

      {/* Regulatory Compliance */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          IPO Bidder is a SEBI registered platform ensuring compliance with all regulatory requirements. 
          Your investments and personal data are protected under Indian financial regulations.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;