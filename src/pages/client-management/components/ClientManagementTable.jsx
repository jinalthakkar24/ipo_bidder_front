import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClients, setSelectedClients] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockClients = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      panNumber: "ABCDE1234F",
      status: "Active",
      verificationStatus: "Verified",
      totalInvestment: 280000,
      lastActivity: "2024-01-15",
      ipoApplications: 12,
      successRate: 92,
      joinDate: "2023-06-15",
      kycStatus: "Completed"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      panNumber: "FGHIJ5678K",
      status: "Active",
      verificationStatus: "Pending",
      totalInvestment: 210000,
      lastActivity: "2024-01-14",
      ipoApplications: 8,
      successRate: 88,
      joinDate: "2023-08-22",
      kycStatus: "Pending"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 76543 21098",
      panNumber: "LMNOP9012Q",
      status: "Active",
      verificationStatus: "Verified",
      totalInvestment: 190000,
      lastActivity: "2024-01-13",
      ipoApplications: 10,
      successRate: 85,
      joinDate: "2023-09-10",
      kycStatus: "Completed"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phone: "+91 65432 10987",
      panNumber: "RSTUV3456W",
      status: "Inactive",
      verificationStatus: "Verified",
      totalInvestment: 150000,
      lastActivity: "2023-12-20",
      ipoApplications: 6,
      successRate: 83,
      joinDate: "2023-05-18",
      kycStatus: "Completed"
    },
    {
      id: 5,
      name: "Vikash Singh",
      email: "vikash.singh@email.com",
      phone: "+91 54321 09876",
      panNumber: "XYZAB7890C",
      status: "Active",
      verificationStatus: "Rejected",
      totalInvestment: 95000,
      lastActivity: "2024-01-12",
      ipoApplications: 4,
      successRate: 75,
      joinDate: "2023-11-05",
      kycStatus: "Rejected"
    }
  ];

  const filteredAndSortedClients = useMemo(() => {
    let filtered = mockClients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || 
                           client.status.toLowerCase() === statusFilter ||
                           client.verificationStatus.toLowerCase() === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, statusFilter]);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedClients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedClients, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedClients.size === paginatedClients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(paginatedClients.map(client => client.id)));
    }
  };

  const handleSelectClient = (clientId) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status, type = 'status') => {
    const statusConfig = {
      status: {
        'Active': 'bg-success/10 text-success',
        'Inactive': 'bg-error/10 text-error'
      },
      verification: {
        'Verified': 'bg-success/10 text-success',
        'Pending': 'bg-warning/10 text-warning',
        'Rejected': 'bg-error/10 text-error'
      },
      kyc: {
        'Completed': 'bg-success/10 text-success',
        'Pending': 'bg-warning/10 text-warning',
        'Rejected': 'bg-error/10 text-error'
      }
    };

    const config = statusConfig[type] || statusConfig.status;
    const className = config[status] || 'bg-muted text-muted-foreground';

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search clients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedClients.size === paginatedClients.length && paginatedClients.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Client</span>
                    <Icon name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Status</span>
                    <Icon name={sortField === 'status' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('totalInvestment')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Investment</span>
                    <Icon name={sortField === 'totalInvestment' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('lastActivity')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Last Activity</span>
                    <Icon name={sortField === 'lastActivity' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client) => (
                <tr key={client.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedClients.has(client.id)}
                      onChange={() => handleSelectClient(client.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                        <div className="text-xs text-muted-foreground">{client.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {getStatusBadge(client.status, 'status')}
                      {getStatusBadge(client.verificationStatus, 'verification')}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-foreground">{formatCurrency(client.totalInvestment)}</div>
                      <div className="text-sm text-muted-foreground">{client.ipoApplications} applications</div>
                      <div className="text-xs text-success">{client.successRate}% success</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">{client.lastActivity}</div>
                    <div className="text-xs text-muted-foreground">Joined {client.joinDate}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Eye"
                        iconSize={16}
                        className="h-8 w-8"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Edit"
                        iconSize={16}
                        className="h-8 w-8"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="TrendingUp"
                        iconSize={16}
                        className="h-8 w-8"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MoreVertical"
                        iconSize={16}
                        className="h-8 w-8"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {paginatedClients.map((client) => (
          <div key={client.id} className="bg-card rounded-lg border border-border p-4 shadow-subtle">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedClients.has(client.id)}
                  onChange={() => handleSelectClient(client.id)}
                  className="rounded border-border"
                />
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <span className="text-sm font-semibold text-primary">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{client.name}</div>
                  <div className="text-sm text-muted-foreground">{client.email}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="MoreVertical"
                iconSize={16}
                className="h-8 w-8"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <div className="space-y-1">
                  {getStatusBadge(client.status, 'status')}
                  {getStatusBadge(client.verificationStatus, 'verification')}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Investment</div>
                <div className="font-semibold text-foreground">{formatCurrency(client.totalInvestment)}</div>
                <div className="text-xs text-success">{client.successRate}% success</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Last activity: {client.lastActivity}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  iconSize={14}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedClients.length)} of {filteredAndSortedClients.length} clients
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <span className="text-sm font-medium px-3 py-1">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagementTable;