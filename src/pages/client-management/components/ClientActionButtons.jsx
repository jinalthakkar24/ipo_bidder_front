import React from 'react';
import Button from '../../../components/ui/Button';

const ClientActionButtons = ({ 
  onAddClient, 
  onBulkUpload, 
  onInviteFriends,
  selectedCount = 0 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="default"
          onClick={onAddClient}
          iconName="Plus"
          iconPosition="left"
          className="whitespace-nowrap"
        >
          Add Client
        </Button>
        
        <Button
          variant="outline"
          onClick={onBulkUpload}
          iconName="Upload"
          iconPosition="left"
          className="whitespace-nowrap"
        >
          Bulk Upload
        </Button>
        
        <Button
          variant="secondary"
          onClick={onInviteFriends}
          iconName="UserPlus"
          iconPosition="left"
          className="whitespace-nowrap"
        >
          Invite Friends
        </Button>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {selectedCount} selected
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
          >
            Send Update
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientActionButtons;