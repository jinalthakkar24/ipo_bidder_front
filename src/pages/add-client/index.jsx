import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ClientForm from './components/ClientForm';

const AddClient = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log form data (replace with actual API call)
      console.log('Client data submitted:', formData);
      
      setSubmitMessage('Client added successfully!');
      
      // Navigate to client management after success
      setTimeout(() => {
        navigate('/client-management');
      }, 1500);
      
    } catch (error) {
      console.error('Error adding client:', error);
      setSubmitMessage('Error adding client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Demat Account</h1>
          <p className="text-muted-foreground">
            Register new client with comprehensive demat account integration
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg shadow-subtle p-6 lg:p-8">
            <ClientForm 
              onSubmit={handleFormSubmit}
              loading={isSubmitting}
            />
            
            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`mt-6 p-4 rounded-lg text-center ${
                submitMessage.includes('successfully') 
                  ? 'bg-success/10 text-success border border-success/20' :'bg-destructive/10 text-destructive border border-destructive/20'
              }`}>
                {submitMessage}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="mt-6 bg-muted/50 border border-border rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm">ℹ</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Important Guidelines</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Ensure PAN number matches exactly as per official documents</li>
                  <li>• Client ID should be the beneficiary number from demat account</li>
                  <li>• UPI ID must be active and verified for seamless transactions</li>
                  <li>• All client information is encrypted and stored securely</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddClient;