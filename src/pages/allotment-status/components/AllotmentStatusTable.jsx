import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AllotmentStatusTable = ({ 
  applications = [], 
  onViewDetails = () => {},
  userType = 'client',
  activeFilter = 'all',
  searchQuery = ''
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  const mockApplications = [
    {
      id: 1,
      ipoName: 'TechCorp Limited',
      clientName: 'Rajesh Kumar',
      applicationDate: '15/01/2024',
      lotSize: 2,
      investmentAmount: '₹31,500',
      status: 'Allotted',
      allottedQuantity: 50,
      refundAmount: '₹15,750',
      category: 'Retail Individual'
    },
    {
      id: 2,
      ipoName: 'Green Energy Solutions',
      clientName: 'Priya Sharma',
      applicationDate: '12/01/2024',
      lotSize: 1,
      investmentAmount: '₹25,000',
      status: 'Not Allotted',
      allottedQuantity: 0,
      refundAmount: '₹25,000',
      category: 'Retail Individual'
    },
    {
      id: 3,
      ipoName: 'Digital Finance Corp',
      clientName: 'Amit Patel',
      applicationDate: '18/01/2024',
      lotSize: 3,
      investmentAmount: '₹45,000',
      status: 'Pending',
      allottedQuantity: 0,
      refundAmount: '₹0',
      category: 'HNI'
    },
    {
      id: 4,
      ipoName: 'Healthcare Innovations',
      clientName: 'Sunita Reddy',
      applicationDate: '10/01/2024',
      lotSize: 1,
      investmentAmount: '₹20,000',
      status: 'Refund Processed',
      allottedQuantity: 0,
      refundAmount: '₹20,000',
      category: 'Retail Individual'
    },
    {
      id: 5,
      ipoName: 'Smart Manufacturing Ltd',
      clientName: 'Vikram Singh',
      applicationDate: '22/01/2024',
      lotSize: 2,
      investmentAmount: '₹38,000',
      status: 'Allotted',
      allottedQuantity: 75,
      refundAmount: '₹12,500',
      category: 'Retail Individual'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'allotted': return 'text-success bg-success/10 border-success/20';
      case 'not allotted': return 'text-error bg-error/10 border-error/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'refund processed': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'allotted': return 'CheckCircle';
      case 'not allotted': return 'XCircle';
      case 'pending': return 'Clock';
      case 'refund processed': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.ipoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (userType === 'subbroker' && app.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'all'|| app.status.toLowerCase().replace(' ', '-') === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('ipoName')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>IPO Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              {userType === 'subbroker' && (
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  <button 
                    onClick={() => handleSort('clientName')}
                    className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  >
                    <span>Client Name</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
              )}
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('applicationDate')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Applied Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lot Size</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('investmentAmount')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Investment</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Allotted</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{application.ipoName}</p>
                    <p className="text-xs text-muted-foreground">{application.category}</p>
                  </div>
                </td>
                {userType === 'subbroker' && (
                  <td className="p-4">
                    <p className="text-sm text-foreground">{application.clientName}</p>
                  </td>
                )}
                <td className="p-4">
                  <p className="text-sm text-foreground">{application.applicationDate}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-foreground">{application.lotSize}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-foreground">{application.investmentAmount}</p>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                    <Icon name={getStatusIcon(application.status)} size={12} className="mr-1" />
                    {application.status}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{application.allottedQuantity} shares</p>
                    {application.refundAmount !== '₹0' && (
                      <p className="text-xs text-muted-foreground">Refund: {application.refundAmount}</p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(application)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreVertical"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredApplications.map((application) => (
          <div key={application.id} className="border-b border-border last:border-b-0">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{application.ipoName}</h3>
                  <p className="text-xs text-muted-foreground">{application.category}</p>
                  {userType === 'subbroker' && (
                    <p className="text-sm text-muted-foreground mt-1">Client: {application.clientName}</p>
                  )}
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                  <Icon name={getStatusIcon(application.status)} size={10} className="mr-1" />
                  {application.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Applied Date</p>
                  <p className="text-sm font-medium text-foreground">{application.applicationDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Investment</p>
                  <p className="text-sm font-medium text-foreground">{application.investmentAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lot Size</p>
                  <p className="text-sm font-medium text-foreground">{application.lotSize}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Allotted</p>
                  <p className="text-sm font-medium text-foreground">{application.allottedQuantity} shares</p>
                </div>
              </div>

              {application.refundAmount !== '₹0' && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground">Refund Amount</p>
                  <p className="text-sm font-medium text-primary">{application.refundAmount}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRowExpansion(application.id)}
                  iconName={expandedRows.has(application.id) ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {expandedRows.has(application.id) ? 'Less Details' : 'More Details'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(application)}
                  iconName="Eye"
                >
                  View Full
                </Button>
              </div>

              {expandedRows.has(application.id) && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Application ID:</span>
                      <span className="ml-2 font-mono text-foreground">IPO2024{application.id.toString().padStart(6, '0')}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-2 text-foreground">{application.category}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Applications Found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try adjusting your search terms or filters.' : 'No IPO applications match the selected criteria.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllotmentStatusTable;