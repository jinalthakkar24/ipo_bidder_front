import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethodSelector = ({ totalAmount, selectedClients = [], onPaymentMethodChange }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: ''
  });
  const [processingUPI, setProcessingUPI] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Quick and secure payment via UPI',
      icon: 'Smartphone',
      recommended: true,
      processingTime: 'Instant',
      charges: 'Free'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Pay directly from your bank account',
      icon: 'CreditCard',
      recommended: false,
      processingTime: '2-3 minutes',
      charges: 'Free'
    },
    {
      id: 'asba',
      name: 'ASBA (Bank Form)',
      description: 'Generate bank form for offline submission',
      icon: 'FileText',
      recommended: false,
      processingTime: 'Manual processing',
      charges: 'Free'
    }
  ];

  const handlePaymentMethodChange = (methodId) => {
    setPaymentMethod(methodId);
    onPaymentMethodChange({
      method: methodId,
      upiId: methodId === 'upi' ? upiId : null,
      bankDetails: methodId === 'asba' ? bankDetails : null
    });
  };

  const handleUPIPayment = async () => {
    if (!upiId) return;
    
    setProcessingUPI(true);
    
    // Simulate UPI payment processing
    setTimeout(() => {
      setProcessingUPI(false);
      // In real implementation, this would integrate with UPI gateway
      alert('UPI payment initiated. Please complete the payment on your UPI app.');
    }, 2000);
  };

  const generateBankForm = () => {
    // In real implementation, this would generate a PDF form
    const formData = {
      clients: selectedClients,
      totalAmount,
      bankDetails,
      timestamp: new Date().toISOString()
    };
    
    console.log('Generating bank form with data:', formData);
    alert('Bank form generated successfully. Please download and submit to your bank.');
  };

  const handleBankDetailsChange = (field, value) => {
    setBankDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Payment Method</h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Total Amount: <span className="font-medium text-foreground">₹{totalAmount.toLocaleString('en-IN')}</span></span>
          <span>•</span>
          <span>{selectedClients.length} Client{selectedClients.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Payment Method Options */}
      <div className="p-6 space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
              paymentMethod === method.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => handlePaymentMethodChange(method.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center pt-1">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => handlePaymentMethodChange(method.id)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
              </div>
              
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                paymentMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={method.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-base font-medium text-foreground">{method.name}</h4>
                  {method.recommended && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{method.processingTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={12} />
                    <span>{method.charges}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Method Details */}
      <div className="p-6 border-t border-border">
        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <h4 className="text-base font-medium text-foreground">UPI Payment Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="UPI ID"
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
              <div className="flex items-end">
                <Button
                  variant="default"
                  onClick={handleUPIPayment}
                  disabled={!upiId || processingUPI}
                  loading={processingUPI}
                  iconName="Smartphone"
                  iconPosition="left"
                  className="w-full"
                >
                  {processingUPI ? 'Processing...' : 'Pay via UPI'}
                </Button>
              </div>
            </div>
            
            {/* UPI Instructions */}
            <div className="p-4 bg-muted rounded-lg">
              <h5 className="text-sm font-medium text-foreground mb-2">Payment Instructions:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enter your UPI ID and click "Pay via UPI"</li>
                <li>• You will receive a payment request on your UPI app</li>
                <li>• Complete the payment within 15 minutes</li>
                <li>• Payment confirmation will be sent via SMS and email</li>
              </ul>
            </div>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div className="space-y-4">
            <h4 className="text-base font-medium text-foreground">Net Banking</h4>
            <div className="p-4 bg-muted rounded-lg text-center">
              <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                You will be redirected to your bank's secure payment gateway to complete the transaction.
              </p>
              <Button
                variant="default"
                iconName="ExternalLink"
                iconPosition="right"
              >
                Proceed to Net Banking
              </Button>
            </div>
          </div>
        )}

        {paymentMethod === 'asba' && (
          <div className="space-y-4">
            <h4 className="text-base font-medium text-foreground">ASBA Bank Form</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bank Account Number"
                type="text"
                placeholder="Enter account number"
                value={bankDetails.accountNumber}
                onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
                required
              />
              <Input
                label="IFSC Code"
                type="text"
                placeholder="Enter IFSC code"
                value={bankDetails.ifscCode}
                onChange={(e) => handleBankDetailsChange('ifscCode', e.target.value)}
                required
              />
              <Input
                label="Bank Name"
                type="text"
                placeholder="Enter bank name"
                value={bankDetails.bankName}
                onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
                required
              />
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={generateBankForm}
                  disabled={!bankDetails.accountNumber || !bankDetails.ifscCode}
                  iconName="Download"
                  iconPosition="left"
                  className="w-full"
                >
                  Generate Bank Form
                </Button>
              </div>
            </div>
            
            {/* ASBA Instructions */}
            <div className="p-4 bg-muted rounded-lg">
              <h5 className="text-sm font-medium text-foreground mb-2">ASBA Process:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fill in your bank account details above</li>
                <li>• Download and print the generated bank form</li>
                <li>• Submit the form to your bank branch or online banking</li>
                <li>• Funds will be blocked in your account until allotment</li>
                <li>• Refund will be processed automatically if not allotted</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Payment Security Info */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground">Secure Payment</h5>
            <p className="text-xs text-muted-foreground mt-1">
              All payments are processed through secure, encrypted channels. Your financial information is protected with bank-grade security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;