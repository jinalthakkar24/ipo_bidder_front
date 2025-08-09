import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Logo from '../../../components/ui/Logo';

const LoginForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [formData, setFormData] = useState({
    mobile: '',
    otp: ['', '', '', '', '', '']
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // OTP input refs
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

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

  // Mock OTP for demonstration
  const mockOTP = '123456';
  
  // Mock phone numbers for demo
  const mockClientPhone = '9876543210';
  const mockNewUserPhone = '9123456789'; // Example new user number

  // Helper function to normalize phone numbers for comparison
  const normalizePhoneNumber = (phone) => {
    if (!phone) return '';
    // Remove all non-digit characters
    const digitsOnly = phone?.replace(/\D/g, '');
    // Remove country code if present (91 for India)
    if (digitsOnly?.startsWith('91') && digitsOnly?.length === 12) {
      return digitsOnly?.slice(2);
    }
    return digitsOnly;
  };

  // Function to simulate backend user check
  const checkUserExists = (mobileNumber) => {
    const normalizedNumber = normalizePhoneNumber(mobileNumber);
    // Simulate: if it's our known client number, user exists, otherwise it's new
    return normalizedNumber === mockClientPhone;
  };

  const validateMobile = () => {
    const newErrors = {};
    
    if (!formData?.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else {
      const normalized = normalizePhoneNumber(formData?.mobile);
      if (normalized?.length !== 10 || !/^\d{10}$/?.test(normalized)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateOTP = () => {
    const otpValue = formData?.otp?.join('');
    const newErrors = {};
    
    if (otpValue?.length !== 6) {
      newErrors.otp = 'Please enter complete 6-digit OTP';
    } else if (otpValue !== mockOTP) {
      newErrors.otp = 'Invalid OTP. Please try again.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleOTPChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/?.test(value)) return;

    const newOTP = [...formData?.otp];
    newOTP[index] = value;

    setFormData(prev => ({
      ...prev,
      otp: newOTP
    }));

    // Clear OTP error when user starts typing
    if (errors?.otp) {
      setErrors(prev => ({
        ...prev,
        otp: ''
      }));
    }

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs?.[index + 1]?.current?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    // Handle backspace
    if (e?.key === 'Backspace' && !formData?.otp?.[index] && index > 0) {
      otpRefs?.[index - 1]?.current?.focus();
    }
  };

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    
    if (!validateMobile()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate backend check for user existence
      const userExists = checkUserExists(formData?.mobile);
      setIsNewUser(!userExists);

      // Call the API to request OTP
      const response = await axios?.post('http://192.168.1.8:5000/api/auth/request-otp', {
        mobileNumber: formData?.mobile
      });

      if (response?.data?.success) {
        setStep('otp');
        setTimer(30); // 30 second timer
        setCanResend(false);
        setErrors({});
      } else {
        setErrors({
          mobile: response?.data?.message || 'Failed to send OTP'
        });
      }
    } catch (error) {
      console.error('OTP request failed:', error);
      
      // For demo purposes, allow progression even with network error
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      
      // Check if user exists for demo
      const userExists = checkUserExists(formData?.mobile);
      setIsNewUser(!userExists);
      
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    
    if (!validateOTP()) {
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification with unified authentication logic
    setTimeout(() => {
      const normalizedInput = normalizePhoneNumber(formData?.mobile);
      
      // Accept both existing and new users for demo
      if (normalizedInput === mockClientPhone || normalizedInput?.length === 10) {
        // Successful authentication - redirect to client dashboard
        localStorage.setItem('userType', 'client');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userMobile', formData?.mobile);
        
        // Store whether this was a new user registration
        if (isNewUser) {
          localStorage.setItem('isNewRegistration', 'true');
        }
        
        // Dispatch custom event to notify other components about authentication change
        window.dispatchEvent(new Event('auth-change'));
        
        navigate('/client-dashboard');
      } else {
        // Invalid mobile format
        setErrors({
          otp: 'Authentication failed. Please try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    
    try {
      // Call the API to resend OTP
      const response = await axios?.post('http://192.168.1.8:5000/api/auth/request-otp', {
        mobileNumber: formData?.mobile
      });

      if (response?.data?.success) {
        setTimer(30);
        setCanResend(false);
        setFormData(prev => ({
          ...prev,
          otp: ['', '', '', '', '', '']
        }));
        
        // Clear OTP inputs
        otpRefs?.forEach(ref => {
          if (ref?.current) ref.current.value = '';
        });
        
        // Focus first OTP input
        otpRefs?.[0]?.current?.focus();
        setErrors({});
      } else {
        setErrors({
          otp: response?.data?.message || 'Failed to resend OTP'
        });
      }
    } catch (error) {
      console.error('OTP resend failed:', error);
      
      // For demo purposes, still reset the form
      setTimer(30);
      setCanResend(false);
      setFormData(prev => ({
        ...prev,
        otp: ['', '', '', '', '', '']
      }));
      
      // Clear OTP inputs
      otpRefs?.forEach(ref => {
        if (ref?.current) ref.current.value = '';
      });
      
      // Focus first OTP input
      otpRefs?.[0]?.current?.focus();
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setTimer(0);
    setCanResend(false);
    setIsNewUser(false);
    setFormData(prev => ({
      ...prev,
      otp: ['', '', '', '', '', '']
    }));
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg border border-border shadow-elevated p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Logo size="large" showText={false} />
              {/* Animated ring around logo */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center space-x-2">
            {step === 'phone' ? (
              <>
                <Icon name="Sparkles" size={20} className="text-primary" />
                <span>Welcome to IPO Bidder</span>
              </>
            ) : (
              <>
                <Icon name="Shield" size={20} className="text-success" />
                <span>Verify Your Number</span>
              </>
            )}
          </h1>
          <p className="text-muted-foreground">
            {step === 'phone' ?'One platform for all your IPO investments' 
              : `Code sent to ${formData?.mobile}`
            }
          </p>
          {step === 'otp' && (
            <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <Icon 
                    name={isNewUser ? "UserPlus" : "User"} 
                    size={14} 
                    className="text-white" 
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    {isNewUser ? "Creating Your Account" : "Welcome Back!"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isNewUser ? "Setting up your investment profile" : "Accessing your dashboard"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="#EF4444" />
              <div>
                <p className="text-sm font-medium text-red-800">Authentication Failed</p>
                <p className="text-sm text-red-600 mt-1">{errors?.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Phone Number Step */}
        {step === 'phone' && (
          <form onSubmit={handleSendOTP} className="space-y-6">
            {/* Mobile Input */}
            <Input
              label="Mobile Number"
              type="tel"
              name="mobile"
              value={formData?.mobile}
              onChange={handleInputChange}
              placeholder="9876543210"
              error={errors?.mobile}
              required
            />

            {/* Send OTP Button */}
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              fullWidth
              className="h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Icon name="Loader2" size={18} className="animate-spin" />
                  <span>Sending OTP...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Icon name="Send" size={18} />
                  <span>Continue with OTP</span>
                </div>
              )}
            </Button>

            {/* Info Message */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={18} className="text-primary mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Unified Authentication
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • New users: Account created automatically
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • Existing users: Quick access to dashboard
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • No separate registration needed
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Enter 6-Digit Code <span className="text-destructive">*</span>
              </label>
              <div className="flex justify-center space-x-3 mb-4">
                {formData?.otp?.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs?.[index]}
                    type="text"
                    maxLength="1"
                    className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                      errors?.otp 
                        ? 'border-destructive bg-red-50' :'border-border bg-background hover:border-primary/50'
                    }`}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e?.target?.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  />
                ))}
              </div>
              {errors?.otp && (
                <p className="text-sm text-destructive text-center flex items-center justify-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors?.otp}</span>
                </p>
              )}
            </div>

            {/* Timer and Resend */}
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>Resend code in {timer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-sm text-primary hover:text-primary/80 transition-micro disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                >
                  <Icon name="RefreshCw" size={14} />
                  <span>{isLoading ? 'Resending...' : "Didn't receive? Resend code"}</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                fullWidth
                className="h-12 bg-gradient-to-r from-success to-green-600 hover:from-success/90 hover:to-green-600/90 text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name={isNewUser ? "UserCheck" : "LogIn"} size={18} />
                    <span>
                      {isNewUser ? 'Create Account & Continue' : 'Verify & Login'}
                    </span>
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToPhone}
                fullWidth
                className="h-12"
              >
                <Icon name="ArrowLeft" size={16} />
                Change Number
              </Button>
            </div>
          </form>
        )}

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="TestTube" size={18} className="text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-2">Demo Credentials</h4>
              <div className="space-y-1 text-xs text-amber-700">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={12} />
                  <span><strong>Existing:</strong> {mockClientPhone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="UserPlus" size={12} />
                  <span><strong>New User:</strong> Any other 10-digit number</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Key" size={12} />
                  <span><strong>OTP:</strong> {mockOTP}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;