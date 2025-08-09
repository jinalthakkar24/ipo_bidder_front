import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LotSizeCalculator = ({ selectedClients = [], ipoDetails, onCalculationUpdate }) => {
  const [lotAllocations, setLotAllocations] = useState({});
  const [priceOption, setPriceOption] = useState('cutoff'); // 'cutoff' or 'custom'
  const [customPrice, setCustomPrice] = useState('');

  const mockIPODetails = ipoDetails || {
    companyName: 'TechCorp Industries Ltd',
    priceRange: { min: 120, max: 140 },
    lotSize: 100,
    cutOffPrice: 135,
    maxLotsPerApplication: 13
  };

  // Initialize lot allocations for each client
  useEffect(() => {
    const initialAllocations = {};
    selectedClients.forEach(client => {
      initialAllocations[client.id] = {
        lots: 1,
        customLots: false
      };
    });
    setLotAllocations(initialAllocations);
  }, [selectedClients]);

  const getCurrentPrice = () => {
    return priceOption === 'cutoff' ? mockIPODetails.cutOffPrice : (parseFloat(customPrice) || mockIPODetails.cutOffPrice);
  };

  const calculateInvestmentAmount = (lots) => {
    return lots * mockIPODetails.lotSize * getCurrentPrice();
  };

  const handleLotChange = (clientId, lots) => {
    const numLots = Math.max(1, Math.min(parseInt(lots) || 1, mockIPODetails.maxLotsPerApplication));
    setLotAllocations(prev => ({
      ...prev,
      [clientId]: {
        ...prev[clientId],
        lots: numLots
      }
    }));
  };

  const handleBulkLotUpdate = (lots) => {
    const numLots = Math.max(1, Math.min(parseInt(lots) || 1, mockIPODetails.maxLotsPerApplication));
    const updatedAllocations = {};
    selectedClients.forEach(client => {
      updatedAllocations[client.id] = {
        ...lotAllocations[client.id],
        lots: numLots
      };
    });
    setLotAllocations(updatedAllocations);
  };

  const getTotalInvestment = () => {
    return Object.entries(lotAllocations).reduce((total, [clientId, allocation]) => {
      return total + calculateInvestmentAmount(allocation.lots);
    }, 0);
  };

  const getTotalLots = () => {
    return Object.values(lotAllocations).reduce((total, allocation) => total + allocation.lots, 0);
  };

  const getClientEligibility = (client, lots) => {
    const investmentAmount = calculateInvestmentAmount(lots);
    const isAffordable = investmentAmount <= client.availableFunds;
    const isWithinLimit = lots <= mockIPODetails.maxLotsPerApplication;
    
    return {
      isEligible: isAffordable && isWithinLimit,
      reason: !isAffordable ? 'Insufficient funds' : !isWithinLimit ? 'Exceeds lot limit' : null
    };
  };

  // Update parent component with calculation data
  useEffect(() => {
    const calculationData = {
      lotAllocations,
      priceOption,
      customPrice: priceOption === 'custom' ? customPrice : null,
      currentPrice: getCurrentPrice(),
      totalInvestment: getTotalInvestment(),
      totalLots: getTotalLots(),
      clientCalculations: selectedClients.map(client => {
        const allocation = lotAllocations[client.id] || { lots: 1 };
        const investmentAmount = calculateInvestmentAmount(allocation.lots);
        const eligibility = getClientEligibility(client, allocation.lots);
        
        return {
          clientId: client.id,
          clientName: client.name,
          lots: allocation.lots,
          investmentAmount,
          eligibility
        };
      })
    };
    
    onCalculationUpdate(calculationData);
  }, [lotAllocations, priceOption, customPrice, selectedClients]);

  if (selectedClients.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-subtle p-8 text-center">
        <Icon name="Calculator" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Clients Selected</h3>
        <p className="text-muted-foreground">Please select clients first to calculate lot sizes and investment amounts.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Lot Size Calculator</h3>
        
        {/* Price Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priceOption"
                value="cutoff"
                checked={priceOption === 'cutoff'}
                onChange={(e) => setPriceOption(e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Cut-off Price (₹{mockIPODetails.cutOffPrice})
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priceOption"
                value="custom"
                checked={priceOption === 'custom'}
                onChange={(e) => setPriceOption(e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">Custom Price</span>
            </label>
          </div>
          
          {priceOption === 'custom' && (
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                placeholder="Enter price"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                min={mockIPODetails.priceRange.min}
                max={mockIPODetails.priceRange.max}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">
                Range: ₹{mockIPODetails.priceRange.min} - ₹{mockIPODetails.priceRange.max}
              </span>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Bulk Lot Assignment</span>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Lots"
                min="1"
                max={mockIPODetails.maxLotsPerApplication}
                className="w-20"
                onChange={(e) => handleBulkLotUpdate(e.target.value)}
              />
              <span className="text-xs text-muted-foreground">lots for all clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Lot Allocations */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-border">
          {selectedClients.map((client) => {
            const allocation = lotAllocations[client.id] || { lots: 1 };
            const investmentAmount = calculateInvestmentAmount(allocation.lots);
            const eligibility = getClientEligibility(client, allocation.lots);
            
            return (
              <div key={client.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-foreground">{client.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>Available: ₹{client.availableFunds.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span className={eligibility.isEligible ? 'text-success' : 'text-error'}>
                        {eligibility.isEligible ? 'Eligible' : eligibility.reason}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        ₹{investmentAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {allocation.lots} × {mockIPODetails.lotSize} × ₹{getCurrentPrice()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleLotChange(client.id, allocation.lots - 1)}
                        disabled={allocation.lots <= 1}
                        iconName="Minus"
                        iconSize={14}
                      />
                      <Input
                        type="number"
                        value={allocation.lots}
                        onChange={(e) => handleLotChange(client.id, e.target.value)}
                        min="1"
                        max={mockIPODetails.maxLotsPerApplication}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleLotChange(client.id, allocation.lots + 1)}
                        disabled={allocation.lots >= mockIPODetails.maxLotsPerApplication}
                        iconName="Plus"
                        iconSize={14}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Investment Breakdown */}
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Lots:</span>
                      <span className="ml-1 font-medium text-foreground">{allocation.lots}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Shares:</span>
                      <span className="ml-1 font-medium text-foreground">{allocation.lots * mockIPODetails.lotSize}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className={`ml-1 font-medium ${client.availableFunds - investmentAmount >= 0 ? 'text-success' : 'text-error'}`}>
                        ₹{(client.availableFunds - investmentAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{selectedClients.length}</div>
            <div className="text-sm text-muted-foreground">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{getTotalLots()}</div>
            <div className="text-sm text-muted-foreground">Total Lots</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">₹{getTotalInvestment().toLocaleString('en-IN')}</div>
            <div className="text-sm text-muted-foreground">Total Investment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotSizeCalculator;