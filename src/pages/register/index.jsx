import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import RegistrationProgress from './components/RegistrationProgress';
import PersonalInfoForm from './components/PersonalInfoForm';
import RoleSpecificForm from './components/RoleSpecificForm';
import AccountIntegrationForm from './components/AccountIntegrationForm';
import BankDetailsForm from './components/BankDetailsForm';
import OTPVerificationForm from './components/OTPVerificationForm';
import TrustElements from './components/TrustElements';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ role: 'client' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 'personal', title: 'Personal', subtitle: 'Basic information' },
    { id: 'documents', title: 'Documents', subtitle: 'Identity verification' },
    { id: 'accounts', title: 'Accounts', subtitle: 'Demat integration' },
    { id: 'banking', title: 'Banking', subtitle: 'Payment details' },
    { id: 'verification', title: 'Verify', subtitle: 'Mobile verification' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.firstName) newErrors.firstName = 'First name is required';
        if (!formData?.lastName) newErrors.lastName = 'Last name is required';
        if (!formData?.email) newErrors.email = 'Email is required';
        if (!formData?.mobile) newErrors.mobile = 'Mobile number is required';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData?.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        // Client-only validations
        if (!formData?.panNumber) newErrors.panNumber = 'PAN number is required';
        if (!formData?.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required';
        break;
      case 3:
        if (!formData?.depositoryType) newErrors.depositoryType = 'Please select a depository';
        if (!formData?.dematAccountNumber) newErrors.dematAccountNumber = 'Demat account number is required';
        if (!formData?.dpId) newErrors.dpId = 'DP ID is required';
        if (!formData?.clientId) newErrors.clientId = 'Client ID is required';
        break;
      case 4:
        if (!formData?.bankName) newErrors.bankName = 'Bank name is required';
        if (!formData?.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
        if (!formData?.accountType) newErrors.accountType = 'Account type is required';
        if (!formData?.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (!formData?.confirmAccountNumber) newErrors.confirmAccountNumber = 'Please confirm account number';
        if (formData?.accountNumber !== formData?.confirmAccountNumber) {
          newErrors.confirmAccountNumber = 'Account numbers do not match';
        }
        if (!formData?.ifscCode) newErrors.ifscCode = 'IFSC code is required';
        if (!formData?.branchName) newErrors.branchName = 'Branch name is required';
        break;
      case 5:
        if (!formData?.mobileVerified) newErrors.verification = 'Mobile verification is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success - redirect to client dashboard only
      navigate('/client-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <RoleSpecificForm
            selectedRole="client"
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <AccountIntegrationForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <BankDetailsForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <OTPVerificationForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-subtle">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center hover:opacity-80 transition-micro">
              <Logo size="medium" showText={false} />
            </Link>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Already have an account? <span className="text-primary font-medium">Sign In</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <RegistrationProgress
            currentStep={currentStep}
            totalSteps={steps?.length}
            steps={steps}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center space-x-3">
                    {currentStep < steps?.length ? (
                      <Button
                        onClick={handleNext}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        iconName="CheckCircle"
                        iconPosition="left"
                      >
                        Complete Registration
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Elements Sidebar */}
            <div className="lg:col-span-1">
              <TrustElements />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} IPO Bidder. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;