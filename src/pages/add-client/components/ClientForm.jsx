import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import AccountTypeSelector from './AccountTypeSelector';
import BankDetailsToggle from './BankDetailsToggle';
import HelpButtons from './HelpButtons';

const ClientForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    accountType: '',
    applicantName: '',
    panNumber: '',
    clientId: '',
    upiId: '',
    bankDetails: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Account Type validation
    if (!formData.accountType) {
      newErrors.accountType = 'Please select an account type';
    }

    // Applicant Name validation
    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Applicant name is required';
    }

    // PAN Number validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!panRegex.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Invalid PAN format (e.g., ABCDE1234F)';
    }

    // Client ID validation
    if (!formData.clientId.trim()) {
      newErrors.clientId = 'Client ID/Beneficiary number is required';
    }

    // UPI ID validation
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/;
    if (!formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!upiRegex.test(formData.upiId)) {
      newErrors.upiId = 'Invalid UPI ID format';
    }

    // Bank Details validation
    if (!formData.bankDetails) {
      newErrors.bankDetails = 'Please select bank details option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format PAN to uppercase
      const submissionData = {
        ...formData,
        panNumber: formData.panNumber.toUpperCase()
      };
      onSubmit?.(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account Type Selection */}
      <AccountTypeSelector
        value={formData.accountType}
        onChange={(value) => handleInputChange('accountType', value)}
        error={errors.accountType}
      />

      {/* Applicant Name */}
      <Input
        label="Applicant Name"
        type="text"
        placeholder="Enter full name as per PAN"
        value={formData.applicantName}
        onChange={(e) => handleInputChange('applicantName', e.target.value)}
        error={errors.applicantName}
        required
      />

      {/* PAN Number */}
      <Input
        label="PAN Number"
        type="text"
        placeholder="Enter 10-digit PAN number"
        value={formData.panNumber}
        onChange={(e) => handleInputChange('panNumber', e.target.value)}
        error={errors.panNumber}
        required
        maxLength={10}
        style={{ textTransform: 'uppercase' }}
      />

      {/* Client ID */}
      <Input
        label="Client Id/Beneficiary Number"
        type="text"
        placeholder="Enter client or beneficiary number"
        value={formData.clientId}
        onChange={(e) => handleInputChange('clientId', e.target.value)}
        error={errors.clientId}
        required
      />

      {/* UPI ID */}
      <Input
        label="UPI Id"
        type="text"
        placeholder="example@paytm, example@phonepe"
        description="PhonePe, GPay, BHIM etc."
        value={formData.upiId}
        onChange={(e) => handleInputChange('upiId', e.target.value)}
        error={errors.upiId}
        required
      />

      {/* Bank Details Toggle */}
      <BankDetailsToggle
        value={formData.bankDetails}
        onChange={(value) => handleInputChange('bankDetails', value)}
        error={errors.bankDetails}
      />

      {/* Help Buttons */}
      <HelpButtons />

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold"
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Adding Client...' : 'ADD'}
      </Button>
    </form>
  );
};

export default ClientForm;