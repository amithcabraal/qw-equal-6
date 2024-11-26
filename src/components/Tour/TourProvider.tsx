import React from 'react';
import { Tooltip } from './Tooltip';
import { useTour } from '../../hooks/useTour';

interface TourProviderProps {
  children: React.ReactNode;
}

export const TourContext = React.createContext<{
  startTour: () => void;
  endTour: () => void;
}>({
  startTour: () => {},
  endTour: () => {},
});

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const { currentStep, showTour, startTour, nextStep, endTour, steps } = useTour();

  const renderTooltip = () => {
    if (!showTour || currentStep === null) return null;

    const currentTourStep = steps[currentStep];
    const targetElement = document.querySelector(currentTourStep.target);

    if (!targetElement) return null;

    const rect = targetElement.getBoundingClientRect();
    
    return (
      <div
        style={{
          position: 'absolute',
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        }}
      >
        <Tooltip
          content={currentTourStep.content}
          isOpen={true}
          onClose={endTour}
          onNext={nextStep}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>
    );
  };

  return (
    <TourContext.Provider value={{ startTour, endTour }}>
      {children}
      {renderTooltip()}
    </TourContext.Provider>
  );
};