import React from 'react';
import Button from '../../../components/ui/Button';

const HelpButtons = ({ className = '' }) => {
  const handleHelp = () => {
    // Open help documentation or modal
    console.log('Opening help documentation');
  };

  const handleVideoHelp = () => {
    // Open video tutorial or modal
    console.log('Opening video help');
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Button
        type="button"
        variant="outline"
        className="flex-1 h-11 font-medium border-blue-500 text-blue-500 hover:bg-blue-50"
        onClick={handleHelp}
        iconName="HelpCircle"
        iconPosition="left"
      >
        HELP
      </Button>
      
      <Button
        type="button"
        variant="outline"
        className="flex-1 h-11 font-medium border-red-500 text-red-500 hover:bg-red-50"
        onClick={handleVideoHelp}
        iconName="Video"
        iconPosition="left"
      >
        VIDEO HELP
      </Button>
    </div>
  );
};

export default HelpButtons;