import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InviteFriendsModal = ({ isOpen, onClose }) => {
  const [inviteMethod, setInviteMethod] = useState('email'); // 'email', 'phone', 'link'
  const [emailList, setEmailList] = useState('');
  const [phoneList, setPhoneList] = useState('');
  const [customMessage, setCustomMessage] = useState(`Hi! I'm using IPO Bidder for my investments and thought you might be interested. Join me and get access to exclusive IPO opportunities with professional guidance.`);

  const mockInviteHistory = [
    {
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      status: "Joined",
      sentDate: "2024-01-15",
      joinedDate: "2024-01-16"
    },
    {
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      status: "Pending",
      sentDate: "2024-01-10",
      joinedDate: null
    },
    {
      name: "Vikash Singh",
      email: "vikash.singh@email.com",
      status: "Joined",
      sentDate: "2024-01-08",
      joinedDate: "2024-01-09"
    }
  ];

  const handleSendInvites = () => {
    // Process invitations
    console.log('Sending invites via:', inviteMethod);
    onClose();
  };

  const copyInviteLink = () => {
    const inviteLink = "https://ipobidder.com/invite/subbroker123";
    navigator.clipboard.writeText(inviteLink);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-elevated w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Invite Friends & Family</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Left Panel - Invite Form */}
          <div className="flex-1 p-6 border-r border-border overflow-y-auto">
            <div className="space-y-6">
              {/* Invite Method Selection */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Choose Invite Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setInviteMethod('email')}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      inviteMethod === 'email' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name="Mail" size={24} className="mx-auto mb-2" />
                    <div className="text-sm font-medium">Email</div>
                  </button>
                  <button
                    onClick={() => setInviteMethod('phone')}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      inviteMethod === 'phone' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name="Phone" size={24} className="mx-auto mb-2" />
                    <div className="text-sm font-medium">SMS</div>
                  </button>
                  <button
                    onClick={() => setInviteMethod('link')}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      inviteMethod === 'link' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name="Link" size={24} className="mx-auto mb-2" />
                    <div className="text-sm font-medium">Share Link</div>
                  </button>
                </div>
              </div>

              {/* Email Invites */}
              {inviteMethod === 'email' && (
                <div className="space-y-4">
                  <Input
                    label="Email Addresses"
                    type="text"
                    placeholder="Enter email addresses separated by commas"
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                    description="You can enter multiple email addresses separated by commas"
                  />
                </div>
              )}

              {/* SMS Invites */}
              {inviteMethod === 'phone' && (
                <div className="space-y-4">
                  <Input
                    label="Phone Numbers"
                    type="text"
                    placeholder="Enter phone numbers separated by commas"
                    value={phoneList}
                    onChange={(e) => setPhoneList(e.target.value)}
                    description="Enter 10-digit phone numbers separated by commas"
                  />
                </div>
              )}

              {/* Share Link */}
              {inviteMethod === 'link' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Invite Link
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value="https://ipobidder.com/invite/subbroker123"
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={copyInviteLink}
                        iconName="Copy"
                        iconSize={16}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      iconName="MessageCircle"
                      iconPosition="left"
                      fullWidth
                    >
                      Share on WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Share2"
                      iconPosition="left"
                      fullWidth
                    >
                      More Options
                    </Button>
                  </div>
                </div>
              )}

              {/* Custom Message */}
              {(inviteMethod === 'email' || inviteMethod === 'phone') && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Add a personal message to your invitation..."
                  />
                </div>
              )}

              {/* Referral Benefits */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-medium text-primary mb-2 flex items-center">
                  <Icon name="Gift" size={16} className="mr-2" />
                  Referral Benefits
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Earn ₹500 for each successful referral</li>
                  <li>• Your friends get priority IPO access</li>
                  <li>• Build your client network faster</li>
                </ul>
              </div>

              {/* Send Button */}
              <Button
                variant="default"
                onClick={handleSendInvites}
                iconName="Send"
                iconPosition="left"
                fullWidth
                disabled={
                  (inviteMethod === 'email' && !emailList.trim()) ||
                  (inviteMethod === 'phone' && !phoneList.trim())
                }
              >
                {inviteMethod === 'link' ? 'Share Invite Link' : 'Send Invitations'}
              </Button>
            </div>
          </div>

          {/* Right Panel - Invite History */}
          <div className="w-80 p-6 bg-muted/20 overflow-y-auto">
            <h3 className="text-lg font-medium text-foreground mb-4">Invite History</h3>
            <div className="space-y-3">
              {mockInviteHistory.map((invite, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{invite.name}</h4>
                      <p className="text-xs text-muted-foreground">{invite.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      invite.status === 'Joined' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }`}>
                      {invite.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>Sent: {invite.sentDate}</div>
                    {invite.joinedDate && (
                      <div>Joined: {invite.joinedDate}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendsModal;