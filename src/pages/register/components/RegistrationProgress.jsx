import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep, totalSteps, steps, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  isCompleted
                    ? 'bg-success border-success text-white'
                    : isCurrent
                    ? 'bg-primary border-primary text-white' :'bg-background border-border text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} strokeWidth={2.5} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${
                    isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block mt-1">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all ${
                  stepNumber < currentStep ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Step Counter */}
      <div className="sm:hidden mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default RegistrationProgress;