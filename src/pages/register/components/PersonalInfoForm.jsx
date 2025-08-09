import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalInfoForm = ({ formData, onInputChange, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onInputChange(name, value);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Icon name="User" size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Personal Information</h2>
        <p className="text-muted-foreground">
          Please provide your basic details to continue
        </p>
      </div>
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData?.firstName || ''}
            onChange={handleInputChange}
            placeholder="Enter first name"
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData?.lastName || ''}
            onChange={handleInputChange}
            placeholder="Enter last name"
            error={errors?.lastName}
            required
          />
        </div>

        {/* Contact Information */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email || ''}
          onChange={handleInputChange}
          placeholder="Enter email address"
          error={errors?.email}
          description="We'll use this for account notifications and updates"
          required
        />

        <Input
          label="Mobile Number"
          type="tel"
          name="mobile"
          value={formData?.mobile || ''}
          onChange={handleInputChange}
          placeholder="+91 98765 43210"
          error={errors?.mobile}
          description="This will be used for OTP-based login and verification"
          required
        />

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData?.dateOfBirth || ''}
            onChange={handleInputChange}
            error={errors?.dateOfBirth}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Gender <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Male', 'Female', 'Other']?.map((gender) => (
                <label
                  key={gender}
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-micro ${
                    formData?.gender === gender?.toLowerCase()
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender?.toLowerCase()}
                    checked={formData?.gender === gender?.toLowerCase()}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{gender}</span>
                </label>
              ))}
            </div>
            {errors?.gender && (
              <p className="text-sm text-destructive mt-1">{errors?.gender}</p>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="#3B82F6" />
            <div>
              <p className="text-sm font-medium text-blue-800">Secure Registration</p>
              <p className="text-sm text-blue-600 mt-1">
                Your mobile number will be used for secure OTP-based authentication. 
                No passwords required - just enter the OTP sent to your mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;