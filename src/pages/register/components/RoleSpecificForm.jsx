import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RoleSpecificForm = ({ selectedRole, formData, onInputChange, errors, className = '' }) => {
  const handleChange = (field) => (e) => {
    onInputChange(field, e?.target?.value);
  };

  const handleFileChange = (field) => (e) => {
    const file = e?.target?.files?.[0];
    onInputChange(field, file);
  };

  // Only render client form since subbroker option is removed
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Identity Verification</h2>
        <p className="text-muted-foreground">Provide your identity documents for KYC compliance</p>
      </div>
      <Input
        label="PAN Number"
        type="text"
        placeholder="Enter your 10-digit PAN number"
        description="Permanent Account Number issued by Income Tax Department"
        value={formData?.panNumber || ''}
        onChange={handleChange('panNumber')}
        error={errors?.panNumber}
        required
        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
        maxLength={10}
      />
      <Input
        label="Aadhaar Number"
        type="text"
        placeholder="Enter your 12-digit Aadhaar number"
        description="Unique Identification Number issued by UIDAI"
        value={formData?.aadhaarNumber || ''}
        onChange={handleChange('aadhaarNumber')}
        error={errors?.aadhaarNumber}
        required
        pattern="[0-9]{12}"
        maxLength={12}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            PAN Card Upload <span className="text-error">*</span>
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload PAN card</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange('panCardFile')}
              className="hidden"
              id="panCardUpload"
            />
            <label
              htmlFor="panCardUpload"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Choose File
            </label>
            {formData?.panCardFile && (
              <p className="text-xs text-success mt-2">{formData?.panCardFile?.name}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Aadhaar Card Upload <span className="text-error">*</span>
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload Aadhaar card</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange('aadhaarCardFile')}
              className="hidden"
              id="aadhaarCardUpload"
            />
            <label
              htmlFor="aadhaarCardUpload"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Choose File
            </label>
            {formData?.aadhaarCardFile && (
              <p className="text-xs text-success mt-2">{formData?.aadhaarCardFile?.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSpecificForm;