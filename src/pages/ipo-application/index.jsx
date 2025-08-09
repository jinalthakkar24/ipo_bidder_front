import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IPOApplicationForm from './components/IPOApplicationForm';
import ClientSelector from './components/ClientSelector';
import LotSizeCalculator from './components/LotSizeCalculator';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import ApplicationSummary from './components/ApplicationSummary';

const IPOApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('subbroker'); // 'client' or 'subbroker'
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [calculationData, setCalculationData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});

  // Get IPO data from navigation state or use mock data
  useEffect(() => {
    if (location.state?.selectedIPO) {
      setSelectedIPO(location.state.selectedIPO);
    }
    if (location.state?.userType) {
      setUserType(location.state.userType);
    }
  }, [location.state]);

  const steps = [
    {
      id: 1,
      title: 'IPO Details',
      description: 'Review IPO information and account details',
      icon: 'FileText'
    },
    ...(userType === 'subbroker' ? [{
      id: 2,
      title: 'Select Clients',
      description: 'Choose clients for IPO application',
      icon: 'Users'
    }] : []),
    {
      id: userType === 'subbroker' ? 3 : 2,
      title: 'Lot Calculation',
      description: 'Set lot sizes and calculate investment',
      icon: 'Calculator'
    },
    {
      id: userType === 'subbroker' ? 4 : 3,
      title: 'Payment Method',
      description: 'Choose payment option',
      icon: 'CreditCard'
    },
    {
      id: userType === 'subbroker' ? 5 : 4,
      title: 'Review & Submit',
      description: 'Final review and submission',
      icon: 'CheckCircle'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClientSelection = (clients) => {
    setSelectedClients(clients);
  };

  const handleCalculationUpdate = (data) => {
    setCalculationData(data);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleApplicationSubmit = (applicationData) => {
    console.log('Application submitted:', applicationData);
    // In real implementation, this would submit to backend
    alert('IPO application submitted successfully! You will receive a confirmation email shortly.');
    navigate('/allotment-status');
  };

  const handleSaveDraft = () => {
    const draftData = {
      selectedIPO,
      selectedClients,
      calculationData,
      paymentMethod,
      currentStep,
      savedAt: new Date().toISOString()
    };
    
    // In real implementation, save to backend or localStorage
    localStorage.setItem('ipo_application_draft', JSON.stringify(draftData));
    alert('Application saved as draft successfully!');
  };

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <IPOApplicationForm
            selectedIPO={selectedIPO}
            userType={userType}
            onNext={handleNext}
          />
        );
      case 2:
        if (userType === 'subbroker') {
          return (
            <ClientSelector
              onClientSelection={handleClientSelection}
              selectedClients={selectedClients}
            />
          );
        } else {
          // For individual clients, auto-select current user
          const mockClientData = [{
            id: 'current-user',
            name: 'Current User',
            email: 'user@email.com',
            availableFunds: 200000,
            kycStatus: 'Verified'
          }];
          return (
            <LotSizeCalculator
              selectedClients={selectedClients.length > 0 ? selectedClients : mockClientData}
              ipoDetails={selectedIPO}
              onCalculationUpdate={handleCalculationUpdate}
            />
          );
        }
      case 3:
        if (userType === 'subbroker') {
          return (
            <LotSizeCalculator
              selectedClients={selectedClients}
              ipoDetails={selectedIPO}
              onCalculationUpdate={handleCalculationUpdate}
            />
          );
        } else {
          return (
            <PaymentMethodSelector
              totalAmount={calculationData.totalInvestment || 0}
              selectedClients={selectedClients}
              onPaymentMethodChange={handlePaymentMethodChange}
            />
          );
        }
      case 4:
        if (userType === 'subbroker') {
          return (
            <PaymentMethodSelector
              totalAmount={calculationData.totalInvestment || 0}
              selectedClients={selectedClients}
              onPaymentMethodChange={handlePaymentMethodChange}
            />
          );
        } else {
          return (
            <ApplicationSummary
              ipoDetails={selectedIPO}
              selectedClients={selectedClients}
              calculationData={calculationData}
              paymentMethod={paymentMethod}
              onSubmit={handleApplicationSubmit}
              onSaveDraft={handleSaveDraft}
            />
          );
        }
      case 5:
        return (
          <ApplicationSummary
            ipoDetails={selectedIPO}
            selectedClients={selectedClients}
            calculationData={calculationData}
            paymentMethod={paymentMethod}
            onSubmit={handleApplicationSubmit}
            onSaveDraft={handleSaveDraft}
          />
        );
      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return true; // IPO details are always available
      case 2:
        return userType === 'client' || selectedClients.length > 0;
      case 3:
        return calculationData.totalInvestment > 0;
      case 4:
        return paymentMethod.method;
      default:
        return false;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">IPO Application</h1>
                <p className="text-muted-foreground">
                  {userType === 'subbroker' ?'Submit IPO applications for multiple clients' :'Apply for IPO investment opportunity'
                  }
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/ipo-listings')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to IPO Listings
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.id
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    }`}>
                      {currentStep > step.id ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <Icon name={step.icon} size={20} />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {getCurrentStepComponent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep > 1 && currentStep < steps.length && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              <Button
                variant="default"
                onClick={handleNext}
                disabled={!canProceedToNext()}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Save" size={14} />
                  <span>Auto-save enabled</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>Secure application</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>Session timeout: 30 minutes</span>
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveDraft}
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default IPOApplication;