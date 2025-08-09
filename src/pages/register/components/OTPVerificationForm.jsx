import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OTPVerificationForm = ({ formData, onInputChange, errors }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // OTP input refs
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Mock OTP for demonstration
  const mockOTP = '123456';

  // Timer effect for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Send initial OTP when component mounts
  useEffect(() => {
    if (formData?.mobile && !isVerified) {
      // Simulate sending OTP
      console.log(`OTP sent to ${formData?.mobile}: ${mockOTP}`);
    }
  }, [formData?.mobile, isVerified]);

  const handleOTPChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/?.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs?.[index + 1]?.current?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (newOTP?.join('')?.length === 6) {
      handleVerifyOTP(newOTP?.join(''));
    }
  };

  const handleOTPKeyDown = (index, e) => {
    // Handle backspace
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      otpRefs?.[index - 1]?.current?.focus();
    }
  };

  const handleVerifyOTP = async (otpValue = otp?.join('')) => {
    if (otpValue?.length !== 6) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (otpValue === mockOTP) {
        setIsVerified(true);
        onInputChange('mobileVerified', true);
      } else {
        // Clear OTP inputs on failure
        setOtp(['', '', '', '', '', '']);
        otpRefs?.forEach(ref => {
          if (ref?.current) ref.current.value = '';
        });
        otpRefs?.[0]?.current?.focus();
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    
    // Clear OTP inputs
    otpRefs?.forEach(ref => {
      if (ref?.current) ref.current.value = '';
    });
    
    // Focus first OTP input
    otpRefs?.[0]?.current?.focus();
    
    // Simulate resending OTP
    console.log(`New OTP sent to ${formData?.mobile}: ${mockOTP}`);
  };

  if (isVerified) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Icon name="CheckCircle" size={32} color="#22C55E" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Mobile Number Verified!
        </h2>
        <p className="text-muted-foreground mb-6">
          Your mobile number {formData?.mobile} has been successfully verified.
        </p>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} color="#22C55E" />
            <div className="text-left">
              <p className="text-sm font-medium text-green-800">Secure Login Enabled</p>
              <p className="text-sm text-green-600">
                You can now login using OTP sent to this mobile number.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Icon name="Smartphone" size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Verify Mobile Number
        </h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit OTP to
        </p>
        <p className="font-medium text-foreground">
          {formData?.mobile || '+91 98765 43210'}
        </p>
      </div>
      {/* OTP Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-4 text-center">
          Enter 6-digit OTP
        </label>
        <div className="flex justify-center space-x-3 mb-4">
          {otp?.map((digit, index) => (
            <input
              key={index}
              ref={otpRefs?.[index]}
              type="text"
              maxLength="1"
              className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                isLoading ? 'opacity-50' : ''
              }`}
              value={digit}
              onChange={(e) => handleOTPChange(index, e?.target?.value)}
              onKeyDown={(e) => handleOTPKeyDown(index, e)}
              disabled={isLoading}
            />
          ))}
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Verifying OTP...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {otp?.join('')?.length === 6 && !isLoading && !isVerified && (
          <p className="text-sm text-destructive text-center mb-4">
            Invalid OTP. Please try again.
          </p>
        )}
      </div>
      {/* Timer and Resend */}
      <div className="text-center mb-6">
        {timer > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend OTP in <span className="font-medium">{timer}</span> seconds
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend}
            className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Didn't receive OTP? Resend
          </button>
        )}
      </div>
      {/* Manual Verify Button (if needed) */}
      {otp?.join('')?.length === 6 && !isLoading && (
        <Button
          type="button"
          onClick={() => handleVerifyOTP()}
          loading={isLoading}
          fullWidth
          className="mb-4"
        >
          Verify OTP
        </Button>
      )}
      {/* Demo Info */}
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Demo Information:</h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>• Use OTP: <strong className="text-foreground">{mockOTP}</strong></div>
          <div>• OTP is automatically verified when you enter all 6 digits</div>
          <div>• In production, this would be sent via SMS</div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationForm;