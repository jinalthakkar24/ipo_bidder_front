import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleSelect, className = '' }) => {
  const roles = [
    {
      id: 'client',
      title: 'Individual Client',
      description: 'Apply for IPOs and manage your investment portfolio',
      icon: 'User',
      features: ['Personal IPO applications', 'Portfolio tracking', 'Allotment status', 'Investment guidance'],
      color: 'bg-primary'
    },
    {
      id: 'subbroker',
      title: 'Subbroker',
      description: 'Manage multiple client accounts and IPO applications',
      icon: 'Users',
      features: ['Manage 40-50 clients', 'Bulk IPO applications', 'Client onboarding', 'Commission tracking'],
      color: 'bg-secondary'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Choose Your Account Type</h2>
        <p className="text-muted-foreground">Select the option that best describes your role</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`group relative p-6 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedRole === role.id
                ? 'border-primary bg-primary/5 shadow-elevated'
                : 'border-border hover:border-primary/50 hover:shadow-subtle'
            }`}
          >
            {/* Selection Indicator */}
            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all ${
              selectedRole === role.id
                ? 'border-primary bg-primary' :'border-border group-hover:border-primary/50'
            }`}>
              {selectedRole === role.id && (
                <Icon name="Check" size={14} color="white" className="absolute top-0.5 left-0.5" />
              )}
            </div>

            {/* Role Icon */}
            <div className={`flex items-center justify-center w-12 h-12 ${role.color} rounded-lg text-white mb-4`}>
              <Icon name={role.icon} size={24} strokeWidth={2} />
            </div>

            {/* Role Info */}
            <h3 className="text-lg font-semibold text-foreground mb-2">{role.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

            {/* Features List */}
            <ul className="space-y-2">
              {role.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;