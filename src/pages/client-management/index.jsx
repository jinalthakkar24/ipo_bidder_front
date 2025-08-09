import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ClientStatsPanel from './components/ClientStatsPanel';
import ClientActionButtons from './components/ClientActionButtons';
import ClientManagementTable from './components/ClientManagementTable';
import BulkUploadModal from './components/BulkUploadModal';
import InviteFriendsModal from './components/InviteFriendsModal';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isInviteFriendsOpen, setIsInviteFriendsOpen] = useState(false);
  const [selectedClientCount, setSelectedClientCount] = useState(0);

  const handleAddClient = () => {
    // Navigate to add client form
    navigate('/add-client');
  };

  const handleBulkUpload = () => {
    setIsBulkUploadOpen(true);
  };

  const handleInviteFriends = () => {
    setIsInviteFriendsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Client Management</h1>
          <p className="text-muted-foreground">
            Manage your client portfolio, track investments, and grow your network
          </p>
        </div>

        {/* Stats Panel */}
        <div className="mb-8">
          <ClientStatsPanel />
        </div>

        {/* Action Buttons */}
        <ClientActionButtons
          onAddClient={handleAddClient}
          onBulkUpload={handleBulkUpload}
          onInviteFriends={handleInviteFriends}
          selectedCount={selectedClientCount}
        />

        {/* Client Management Table */}
        <ClientManagementTable />

        {/* Modals */}
        <BulkUploadModal
          isOpen={isBulkUploadOpen}
          onClose={() => setIsBulkUploadOpen(false)}
        />

        <InviteFriendsModal
          isOpen={isInviteFriendsOpen}
          onClose={() => setIsInviteFriendsOpen(false)}
        />
      </main>
    </div>
  );
};

export default ClientManagement;