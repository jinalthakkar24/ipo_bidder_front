import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AllotmentDetailsModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  application = null,
  userType = 'client'
}) => {
  if (!isOpen || !application) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'allotted': return 'text-success bg-success/10';
      case 'not allotted': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'refund processed': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const mockAllotmentDetails = {
    applicationNumber: 'IPO2024001234',
    bidDetails: [
      { category: 'Retail Individual', lots: 2, price: '₹315', amount: '₹31,500' },
      { category: 'Retail Individual', lots: 1, price: '₹320', amount: '₹16,000' }
    ],
    allotmentDetails: {
      lotsAllotted: 1,
      sharesAllotted: 50,
      allotmentPrice: '₹315',
      totalAmount: '₹15,750',
      refundAmount: '₹31,750'
    },
    timeline: [
      { date: '2024-01-15', event: 'Application Submitted', status: 'completed' },
      { date: '2024-01-20', event: 'IPO Closed', status: 'completed' },
      { date: '2024-01-25', event: 'Basis of Allotment', status: 'completed' },
      { date: '2024-01-28', event: 'Allotment Finalized', status: 'completed' },
      { date: '2024-01-30', event: 'Refund Processed', status: 'current' }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{application.ipoName}</h2>
            <p className="text-sm text-muted-foreground">Application Details</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Application</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{mockAllotmentDetails.applicationNumber}</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Applied On</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{application.applicationDate}</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
          </div>

          {/* Bid Details */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Bid Details</h3>
            <div className="bg-muted/30 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Lots</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Price</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAllotmentDetails.bidDetails.map((bid, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-3 text-sm text-foreground">{bid.category}</td>
                      <td className="p-3 text-sm text-foreground">{bid.lots}</td>
                      <td className="p-3 text-sm text-foreground">{bid.price}</td>
                      <td className="p-3 text-sm font-medium text-foreground">{bid.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Allotment Details */}
          {application.status === 'Allotted' && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Allotment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Lots Allotted:</span>
                    <span className="text-sm font-medium text-foreground">{mockAllotmentDetails.allotmentDetails.lotsAllotted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Shares Allotted:</span>
                    <span className="text-sm font-medium text-foreground">{mockAllotmentDetails.allotmentDetails.sharesAllotted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Allotment Price:</span>
                    <span className="text-sm font-medium text-foreground">{mockAllotmentDetails.allotmentDetails.allotmentPrice}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Amount:</span>
                    <span className="text-sm font-medium text-success">{mockAllotmentDetails.allotmentDetails.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Refund Amount:</span>
                    <span className="text-sm font-medium text-primary">{mockAllotmentDetails.allotmentDetails.refundAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Application Timeline</h3>
            <div className="space-y-4">
              {mockAllotmentDetails.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    event.status === 'completed' 
                      ? 'bg-success text-white' 
                      : event.status === 'current' ?'bg-primary text-white' :'bg-muted text-muted-foreground'
                  }`}>
                    {event.status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : event.status === 'current' ? (
                      <Icon name="Clock" size={16} />
                    ) : (
                      <Icon name="Circle" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download">
              Download Certificate
            </Button>
            <Button variant="outline" iconName="Printer">
              Print Details
            </Button>
          </div>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllotmentDetailsModal;