import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientSelector = ({ onClientSelection, selectedClients = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientIds, setSelectedClientIds] = useState(selectedClients.map(c => c.id));

  const mockClients = [
    {
      id: 'client-001',
      name: 'Rajesh Kumar Sharma',
      email: 'rajesh.sharma@email.com',
      phone: '+91 98765 43210',
      panNumber: 'ABCDE1234F',
      demateAccount: 'IN30023912345678',
      accountType: 'CDSL',
      availableFunds: 250000,
      kycStatus: 'Verified',
      riskProfile: 'Moderate',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastActive: '2025-01-10',
      totalInvestments: 1250000,
      activeApplications: 2
    },
    {
      id: 'client-002',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 87654 32109',
      panNumber: 'FGHIJ5678K',
      demateAccount: 'IN30154987654321',
      accountType: 'NSDL',
      availableFunds: 180000,
      kycStatus: 'Verified',
      riskProfile: 'Conservative',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastActive: '2025-01-11',
      totalInvestments: 890000,
      activeApplications: 1
    },
    {
      id: 'client-003',
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 76543 21098',
      panNumber: 'KLMNO9012P',
      demateAccount: 'IN30177765432109',
      accountType: 'CDSL',
      availableFunds: 450000,
      kycStatus: 'Verified',
      riskProfile: 'Aggressive',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      lastActive: '2025-01-12',
      totalInvestments: 2100000,
      activeApplications: 3
    },
    {
      id: 'client-004',
      name: 'Sunita Agarwal',
      email: 'sunita.agarwal@email.com',
      phone: '+91 65432 10987',
      panNumber: 'QRSTU3456V',
      demateAccount: 'IN30198876543210',
      accountType: 'NSDL',
      availableFunds: 75000,
      kycStatus: 'Pending',
      riskProfile: 'Conservative',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      lastActive: '2025-01-09',
      totalInvestments: 320000,
      activeApplications: 0
    },
    {
      id: 'client-005',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@email.com',
      phone: '+91 54321 09876',
      panNumber: 'WXYZ7890A',
      demateAccount: 'IN30165554321098',
      accountType: 'CDSL',
      availableFunds: 320000,
      kycStatus: 'Verified',
      riskProfile: 'Moderate',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
      lastActive: '2025-01-12',
      totalInvestments: 1680000,
      activeApplications: 1
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.panNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientToggle = (clientId) => {
    const newSelectedIds = selectedClientIds.includes(clientId)
      ? selectedClientIds.filter(id => id !== clientId)
      : [...selectedClientIds, clientId];
    
    setSelectedClientIds(newSelectedIds);
    
    const selectedClientData = mockClients.filter(client => 
      newSelectedIds.includes(client.id)
    );
    onClientSelection(selectedClientData);
  };

  const handleSelectAll = () => {
    const eligibleClients = filteredClients.filter(client => client.kycStatus === 'Verified');
    const allEligibleIds = eligibleClients.map(client => client.id);
    setSelectedClientIds(allEligibleIds);
    onClientSelection(eligibleClients);
  };

  const handleClearAll = () => {
    setSelectedClientIds([]);
    onClientSelection([]);
  };

  const getRiskProfileColor = (profile) => {
    switch (profile) {
      case 'Conservative': return 'text-success';
      case 'Moderate': return 'text-warning';
      case 'Aggressive': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getKycStatusBadge = (status) => {
    const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'Verified':
        return `${baseClasses} bg-success/10 text-success`;
      case 'Pending':
        return `${baseClasses} bg-warning/10 text-warning`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Select Clients for IPO Application</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedClientIds.length} of {filteredClients.filter(c => c.kycStatus === 'Verified').length} selected
            </span>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search clients by name, email, or PAN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Select All Eligible
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredClients.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No clients found matching your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredClients.map((client) => {
              const isSelected = selectedClientIds.includes(client.id);
              const isEligible = client.kycStatus === 'Verified';
              
              return (
                <div
                  key={client.id}
                  className={`p-4 transition-colors ${
                    isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'
                  } ${!isEligible ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <div className="flex items-center pt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleClientToggle(client.id)}
                        disabled={!isEligible}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Image
                        src={client.avatar}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-foreground truncate">
                            {client.name}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Icon name="Mail" size={12} />
                              <span className="truncate">{client.email}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Phone" size={12} />
                              <span>{client.phone}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={getKycStatusBadge(client.kycStatus)}>
                              {client.kycStatus}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              PAN: {client.panNumber}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {client.accountType}: {client.demateAccount.slice(-8)}
                            </span>
                          </div>
                        </div>

                        {/* Financial Info */}
                        <div className="text-right ml-4">
                          <div className="text-sm font-medium text-foreground">
                            ₹{client.availableFunds.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-muted-foreground">Available Funds</div>
                          <div className={`text-xs mt-1 ${getRiskProfileColor(client.riskProfile)}`}>
                            {client.riskProfile} Risk
                          </div>
                        </div>
                      </div>

                      {/* Additional Stats */}
                      <div className="flex items-center space-x-6 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="TrendingUp" size={12} />
                          <span>₹{(client.totalInvestments / 100000).toFixed(1)}L invested</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="FileText" size={12} />
                          <span>{client.activeApplications} active applications</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>Last active: {new Date(client.lastActive).toLocaleDateString('en-IN')}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {selectedClientIds.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedClientIds.length} client{selectedClientIds.length !== 1 ? 's' : ''} selected for IPO application
            </div>
            <Button
              variant="default"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue with Selected Clients
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSelector;