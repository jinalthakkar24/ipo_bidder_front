import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AccountIntegrationForm = ({ formData, onInputChange, errors, className = '' }) => {
  const [selectedDepository, setSelectedDepository] = useState(formData.depositoryType || '');

  const handleChange = (field) => (e) => {
    onInputChange(field, e.target.value);
  };

  const handleDepositorySelect = (type) => {
    setSelectedDepository(type);
    onInputChange('depositoryType', type);
  };

  const depositoryOptions = [
    {
      id: 'cdsl',
      name: 'CDSL',
      fullName: 'Central Depository Services Limited',
      description: 'One of India\'s premier depositories for electronic holding of securities',
      icon: 'Database',
      color: 'bg-primary'
    },
    {
      id: 'nsdl',
      name: 'NSDL',
      fullName: 'National Securities Depository Limited',
      description: 'India\'s first and largest depository for electronic securities',
      icon: 'Shield',
      color: 'bg-secondary'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Demat Account Integration</h2>
        <p className="text-muted-foreground">Connect your existing demat account or create a new one</p>
      </div>

      {/* Depository Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Select Your Depository</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {depositoryOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleDepositorySelect(option.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedDepository === option.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 ${option.color} rounded-lg text-white flex-shrink-0`}>
                  <Icon name={option.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{option.name}</h4>
                    {selectedDepository === option.id && (
                      <Icon name="CheckCircle" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{option.fullName}</p>
                  <p className="text-xs text-muted-foreground mt-2">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Account Details */}
      {selectedDepository && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Demat Account Details</h3>
          
          <Input
            label="Demat Account Number"
            type="text"
            placeholder={`Enter your ${selectedDepository.toUpperCase()} demat account number`}
            description="16-digit demat account number (e.g., 1234567890123456)"
            value={formData.dematAccountNumber || ''}
            onChange={handleChange('dematAccountNumber')}
            error={errors.dematAccountNumber}
            required
            pattern="[0-9]{16}"
            maxLength={16}
          />

          <Input
            label="DP ID"
            type="text"
            placeholder="Enter your Depository Participant ID"
            description="8-digit DP ID provided by your broker"
            value={formData.dpId || ''}
            onChange={handleChange('dpId')}
            error={errors.dpId}
            required
            pattern="[0-9]{8}"
            maxLength={8}
          />

          <Input
            label="Client ID"
            type="text"
            placeholder="Enter your client ID with the DP"
            description="Unique client identifier with your depository participant"
            value={formData.clientId || ''}
            onChange={handleChange('clientId')}
            error={errors.clientId}
            required
          />
        </div>
      )}

      {/* Information Box */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">About Demat Accounts</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Demat accounts hold your securities in electronic format</li>
              <li>• Required for IPO applications and share trading</li>
              <li>• Your account details are encrypted and stored securely</li>
              <li>• We only use this information for IPO application processing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Need Help Finding Your Details?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-foreground">Demat Account Number:</h5>
            <p className="text-xs text-muted-foreground">Check your demat account statement or contact your broker</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-foreground">DP ID & Client ID:</h5>
            <p className="text-xs text-muted-foreground">Available on your demat account statement or broker portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountIntegrationForm;