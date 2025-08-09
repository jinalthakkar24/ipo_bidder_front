import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VerificationForm = ({ formData, onInputChange, errors, className = '' }) => {
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailTimer, setEmailTimer] = useState(0);
  const [mobileTimer, setMobileTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  useEffect(() => {
    let emailInterval;
    if (emailTimer > 0) {
      emailInterval = setInterval(() => {
        setEmailTimer(emailTimer - 1);
      }, 1000);
    }
    return () => clearInterval(emailInterval);
  }, [emailTimer]);

  useEffect(() => {
    let mobileInterval;
    if (mobileTimer > 0) {
      mobileInterval = setInterval(() => {
        setMobileTimer(mobileTimer - 1);
      }, 1000);
    }
    return () => clearInterval(mobileInterval);
  }, [mobileTimer]);

  const sendEmailOtp = () => {
    // Mock OTP sending
    setEmailTimer(60);
    // In real implementation, call API to send OTP
    console.log('Email OTP sent to:', formData.email);
  };

  const sendMobileOtp = () => {
    // Mock OTP sending
    setMobileTimer(60);
    // In real implementation, call API to send OTP
    console.log('Mobile OTP sent to:', formData.mobile);
  };

  const verifyEmailOtp = () => {
    // Mock verification - in real app, verify with backend
    if (emailOtp === '123456') {
      setEmailVerified(true);
      onInputChange('emailVerified', true);
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  const verifyMobileOtp = () => {
    // Mock verification - in real app, verify with backend
    if (mobileOtp === '654321') {
      setMobileVerified(true);
      onInputChange('mobileVerified', true);
    } else {
      alert('Invalid OTP. Use 654321 for demo.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Verify Your Contact Details</h2>
        <p className="text-muted-foreground">We'll send verification codes to confirm your email and mobile number</p>
      </div>

      {/* Email Verification */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              emailVerified ? 'bg-success' : 'bg-primary'
            } text-white`}>
              <Icon name={emailVerified ? 'CheckCircle' : 'Mail'} size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Email Verification</h3>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
            </div>
          </div>
          {emailVerified && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Verified</span>
            </div>
          )}
        </div>

        {!emailVerified && (
          <div className="space-y-4">
            <div className="flex space-x-3">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                maxLength={6}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={verifyEmailOtp}
                disabled={emailOtp.length !== 6}
              >
                Verify
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={sendEmailOtp}
                disabled={emailTimer > 0}
                iconName="Send"
                iconPosition="left"
              >
                {emailTimer > 0 ? `Resend in ${formatTime(emailTimer)}` : 'Send OTP'}
              </Button>
              <p className="text-xs text-muted-foreground">Demo OTP: 123456</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Verification */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              mobileVerified ? 'bg-success' : 'bg-primary'
            } text-white`}>
              <Icon name={mobileVerified ? 'CheckCircle' : 'Smartphone'} size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Mobile Verification</h3>
              <p className="text-sm text-muted-foreground">+91 {formData.mobile}</p>
            </div>
          </div>
          {mobileVerified && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Verified</span>
            </div>
          )}
        </div>

        {!mobileVerified && (
          <div className="space-y-4">
            <div className="flex space-x-3">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                maxLength={6}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={verifyMobileOtp}
                disabled={mobileOtp.length !== 6}
              >
                Verify
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={sendMobileOtp}
                disabled={mobileTimer > 0}
                iconName="Send"
                iconPosition="left"
              >
                {mobileTimer > 0 ? `Resend in ${formatTime(mobileTimer)}` : 'Send OTP'}
              </Button>
              <p className="text-xs text-muted-foreground">Demo OTP: 654321</p>
            </div>
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Verification Requirements</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className={`flex items-center space-x-2 ${emailVerified ? 'text-success' : ''}`}>
                <Icon name={emailVerified ? 'CheckCircle' : 'Circle'} size={12} />
                <span>Email verification is required for account security</span>
              </li>
              <li className={`flex items-center space-x-2 ${mobileVerified ? 'text-success' : ''}`}>
                <Icon name={mobileVerified ? 'CheckCircle' : 'Circle'} size={12} />
                <span>Mobile verification is required for trade confirmations</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Shield" size={12} />
                <span>Both verifications must be completed to proceed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="border border-warning/20 bg-warning/5 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Security Notice</h4>
            <p className="text-xs text-muted-foreground">
              Never share your OTP with anyone. IPO Bidder representatives will never ask for your OTP over phone or email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;