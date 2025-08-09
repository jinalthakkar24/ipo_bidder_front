import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BankDetailsForm = ({ formData, onInputChange, errors, className = '' }) => {
  const handleChange = (field) => (e) => {
    onInputChange(field, e.target.value);
  };

  const bankTypes = [
    { value: 'savings', label: 'Savings Account' },
    { value: 'current', label: 'Current Account' },
    { value: 'salary', label: 'Salary Account' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Bank Account Details</h2>
        <p className="text-muted-foreground">Add your bank account for IPO application payments</p>
      </div>

      <Input
        label="Bank Name"
        type="text"
        placeholder="Enter your bank name"
        description="Full name of your bank (e.g., State Bank of India)"
        value={formData.bankName || ''}
        onChange={handleChange('bankName')}
        error={errors.bankName}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Account Holder Name"
          type="text"
          placeholder="Enter account holder name"
          description="Name as per bank records"
          value={formData.accountHolderName || ''}
          onChange={handleChange('accountHolderName')}
          error={errors.accountHolderName}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Account Type <span className="text-error">*</span>
          </label>
          <select
            value={formData.accountType || ''}
            onChange={handleChange('accountType')}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            required
          >
            <option value="">Select account type</option>
            {bankTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.accountType && (
            <p className="text-xs text-error mt-1">{errors.accountType}</p>
          )}
        </div>
      </div>

      <Input
        label="Account Number"
        type="text"
        placeholder="Enter your bank account number"
        description="Your complete bank account number"
        value={formData.accountNumber || ''}
        onChange={handleChange('accountNumber')}
        error={errors.accountNumber}
        required
        minLength={9}
        maxLength={18}
      />

      <Input
        label="Confirm Account Number"
        type="text"
        placeholder="Re-enter your account number"
        value={formData.confirmAccountNumber || ''}
        onChange={handleChange('confirmAccountNumber')}
        error={errors.confirmAccountNumber}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="IFSC Code"
          type="text"
          placeholder="Enter IFSC code"
          description="11-character IFSC code (e.g., SBIN0001234)"
          value={formData.ifscCode || ''}
          onChange={handleChange('ifscCode')}
          error={errors.ifscCode}
          required
          pattern="[A-Z]{4}0[A-Z0-9]{6}"
          maxLength={11}
        />

        <Input
          label="Branch Name"
          type="text"
          placeholder="Enter branch name"
          value={formData.branchName || ''}
          onChange={handleChange('branchName')}
          error={errors.branchName}
          required
        />
      </div>

      {/* UPI Integration */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Smartphone" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">UPI Integration (Optional)</h3>
        </div>
        
        <Input
          label="UPI ID"
          type="text"
          placeholder="Enter your UPI ID (e.g., yourname@paytm)"
          description="For faster IPO payments and refunds"
          value={formData.upiId || ''}
          onChange={handleChange('upiId')}
          error={errors.upiId}
          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+"
        />
      </div>

      {/* Bank Verification Info */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Bank Account Verification</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Your bank details will be verified through penny drop method</li>
              <li>• A small amount (₹1) will be deposited and immediately refunded</li>
              <li>• This ensures your account details are correct for IPO transactions</li>
              <li>• All bank information is encrypted and stored securely</li>
            </ul>
          </div>
        </div>
      </div>

      {/* IFSC Helper */}
      <div className="border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Need Help Finding Your IFSC Code?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Icon name="CreditCard" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Check your debit card or cheque book</p>
          </div>
          <div className="text-center">
            <Icon name="Smartphone" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Use your bank's mobile app</p>
          </div>
          <div className="text-center">
            <Icon name="Globe" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Search online IFSC finder tools</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsForm;