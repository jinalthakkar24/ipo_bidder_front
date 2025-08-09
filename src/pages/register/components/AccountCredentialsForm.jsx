import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AccountCredentialsForm = ({ formData, onInputChange, errors, className = '' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    onInputChange(field, value);
    
    if (field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-error';
    if (passwordStrength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Account Credentials</h2>
        <p className="text-muted-foreground">Create secure login credentials for your account</p>
      </div>

      <Input
        label="Username"
        type="text"
        placeholder="Choose a unique username"
        description="This will be used to log into your account"
        value={formData.username || ''}
        onChange={handleChange('username')}
        error={errors.username}
        required
        minLength={4}
        maxLength={20}
      />

      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData.password || ''}
            onChange={handleChange('password')}
            error={errors.password}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Password Strength:</span>
              <span className={`text-xs font-medium ${
                passwordStrength <= 2 ? 'text-error' : passwordStrength <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter your password"
          value={formData.confirmPassword || ''}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>

      {/* Password Requirements */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-3">Password Requirements:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { text: 'At least 8 characters', met: formData.password?.length >= 8 },
            { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password || '') },
            { text: 'One lowercase letter', met: /[a-z]/.test(formData.password || '') },
            { text: 'One number', met: /[0-9]/.test(formData.password || '') },
            { text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password || '') }
          ].map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon 
                name={req.met ? 'CheckCircle' : 'Circle'} 
                size={14} 
                className={req.met ? 'text-success' : 'text-muted-foreground'} 
              />
              <span className={`text-xs ${req.met ? 'text-success' : 'text-muted-foreground'}`}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountCredentialsForm;