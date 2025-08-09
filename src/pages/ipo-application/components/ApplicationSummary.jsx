import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationSummary = ({ 
  ipoDetails, 
  selectedClients = [], 
  calculationData = {}, 
  paymentMethod = {},
  onSubmit,
  onSaveDraft 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const mockIPODetails = ipoDetails || {
    companyName: 'TechCorp Industries Ltd',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    priceRange: { min: 120, max: 140 },
    lotSize: 100,
    cutOffPrice: 135
  };

  const charges = {
    brokerage: calculationData.totalInvestment * 0.001, // 0.1%
    stt: calculationData.totalInvestment * 0.001, // 0.1%
    gst: (calculationData.totalInvestment * 0.001) * 0.18, // 18% on brokerage
    sebiCharges: calculationData.totalInvestment * 0.0001, // 0.01%
    stampDuty: calculationData.totalInvestment * 0.00015 // 0.015%
  };

  const totalCharges = Object.values(charges).reduce((sum, charge) => sum + charge, 0);
  const grandTotal = (calculationData.totalInvestment || 0) + totalCharges;

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit({
        ipoDetails: mockIPODetails,
        clients: selectedClients,
        calculations: calculationData,
        payment: paymentMethod,
        charges,
        totalAmount: grandTotal,
        submissionTime: new Date().toISOString()
      });
    }, 3000);
  };

  const getPaymentMethodDisplay = () => {
    switch (paymentMethod.method) {
      case 'upi':
        return `UPI (${paymentMethod.upiId || 'Not specified'})`;
      case 'netbanking':
        return 'Net Banking';
      case 'asba':
        return 'ASBA Bank Form';
      default:
        return 'Not selected';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Application Summary</h3>
        <p className="text-sm text-muted-foreground">
          Review your IPO application details before final submission
        </p>
      </div>

      {/* IPO Details Summary */}
      <div className="p-6 border-b border-border">
        <h4 className="text-base font-medium text-foreground mb-4">IPO Details</h4>
        <div className="flex items-start space-x-4">
          <Image
            src={mockIPODetails.logo}
            alt={mockIPODetails.companyName}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h5 className="text-base font-medium text-foreground">{mockIPODetails.companyName}</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
              <div>
                <span className="text-muted-foreground">Price Range:</span>
                <div className="font-medium text-foreground">₹{mockIPODetails.priceRange.min} - ₹{mockIPODetails.priceRange.max}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Applied Price:</span>
                <div className="font-medium text-foreground">₹{calculationData.currentPrice || mockIPODetails.cutOffPrice}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Lot Size:</span>
                <div className="font-medium text-foreground">{mockIPODetails.lotSize} shares</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total Lots:</span>
                <div className="font-medium text-foreground">{calculationData.totalLots || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Applications Summary */}
      <div className="p-6 border-b border-border">
        <h4 className="text-base font-medium text-foreground mb-4">
          Client Applications ({selectedClients.length})
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {selectedClients.map((client) => {
            const clientCalc = calculationData.clientCalculations?.find(c => c.clientId === client.id);
            return (
              <div key={client.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.panNumber}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {clientCalc?.lots || 1} lots
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{(clientCalc?.investmentAmount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-6 border-b border-border">
        <h4 className="text-base font-medium text-foreground mb-4">Payment Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Investment Amount</span>
            <span className="text-sm font-medium text-foreground">
              ₹{(calculationData.totalInvestment || 0).toLocaleString('en-IN')}
            </span>
          </div>
          
          {/* Charges Breakdown */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Brokerage (0.1%)</span>
              <span className="text-xs text-muted-foreground">₹{charges.brokerage.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">STT (0.1%)</span>
              <span className="text-xs text-muted-foreground">₹{charges.stt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">GST (18%)</span>
              <span className="text-xs text-muted-foreground">₹{charges.gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">SEBI Charges (0.01%)</span>
              <span className="text-xs text-muted-foreground">₹{charges.sebiCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Stamp Duty (0.015%)</span>
              <span className="text-xs text-muted-foreground">₹{charges.stampDuty.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Total Charges</span>
            <span className="text-sm font-medium text-foreground">₹{totalCharges.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-base font-semibold text-foreground">Grand Total</span>
            <span className="text-base font-semibold text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Payment Method:</span>
              <span className="text-sm font-medium text-foreground">{getPaymentMethodDisplay()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-1"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{' '}
            <button className="text-primary hover:underline">terms and conditions</button>
            {' '}and confirm that all the information provided is accurate. I understand that this application is subject to allotment and market conditions.
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Save as Draft
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={!agreedToTerms || isSubmitting}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            className="flex-1"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </Button>
        </div>
        
        {/* Submission Info */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">
                <strong>Important:</strong> Once submitted, applications cannot be modified or cancelled.
              </p>
              <p>
                You will receive a confirmation email with application details and payment instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummary;