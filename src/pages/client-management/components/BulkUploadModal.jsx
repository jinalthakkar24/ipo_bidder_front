import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkUploadModal = ({ isOpen, onClose }) => {
  const [uploadStep, setUploadStep] = useState('upload'); // 'upload', 'processing', 'results'
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const mockValidationResults = {
    total: 25,
    valid: 22,
    errors: 3,
    errorDetails: [
      { row: 5, field: 'Email', error: 'Invalid email format' },
      { row: 12, field: 'Phone', error: 'Phone number must be 10 digits' },
      { row: 18, field: 'PAN', error: 'Invalid PAN format' }
    ]
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && (file.type === 'text/csv' || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setUploadedFile(file);
      setUploadStep('processing');
      
      // Simulate processing
      setTimeout(() => {
        setUploadStep('results');
      }, 2000);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setUploadStep('upload');
    setUploadedFile(null);
    setDragActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmUpload = () => {
    // Process valid records
    onClose();
    resetUpload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-elevated w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Bulk Upload Clients</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { onClose(); resetUpload(); }}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {uploadStep === 'upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Upload a CSV or Excel file with client information. Download our template to ensure proper formatting.
                </p>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  className="mb-6"
                >
                  Download Template
                </Button>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Drop your file here, or click to browse
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports CSV, XLS, XLSX files up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  iconName="FolderOpen"
                  iconPosition="left"
                >
                  Choose File
                </Button>
              </div>

              {/* Required Fields Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Required Fields:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>• Full Name</div>
                  <div>• Email Address</div>
                  <div>• Phone Number</div>
                  <div>• PAN Number</div>
                  <div>• Date of Birth</div>
                  <div>• Address</div>
                </div>
              </div>
            </div>
          )}

          {uploadStep === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-foreground mb-2">Processing File...</h3>
              <p className="text-muted-foreground">
                Validating {uploadedFile?.name} and checking for errors
              </p>
            </div>
          )}

          {uploadStep === 'results' && (
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{mockValidationResults.total}</div>
                  <div className="text-sm text-muted-foreground">Total Records</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{mockValidationResults.valid}</div>
                  <div className="text-sm text-muted-foreground">Valid Records</div>
                </div>
                <div className="text-center p-4 bg-error/10 rounded-lg">
                  <div className="text-2xl font-bold text-error">{mockValidationResults.errors}</div>
                  <div className="text-sm text-muted-foreground">Errors Found</div>
                </div>
              </div>

              {/* Error Details */}
              {mockValidationResults.errors > 0 && (
                <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                  <h4 className="font-medium text-error mb-3 flex items-center">
                    <Icon name="AlertTriangle" size={16} className="mr-2" />
                    Validation Errors
                  </h4>
                  <div className="space-y-2">
                    {mockValidationResults.errorDetails.map((error, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">Row {error.row}:</span>
                        <span className="text-muted-foreground ml-2">{error.field} - {error.error}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={resetUpload}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Upload Different File
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Errors
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleConfirmUpload}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Import {mockValidationResults.valid} Valid Records
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;