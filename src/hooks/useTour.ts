import { useState, useCallback } from 'react';

export interface TourStep {
  target: string;
  content: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="numbers"]',
    content: "Start by selecting a number from either side. You'll need to combine two numbers with an operator.",
  },
  {
    target: '[data-tour="operators"]',
    content: "After selecting your first number, choose an operator (+, -, *, /) to perform the calculation.",
  },
  {
    target: '[data-tour="current-operation"]',
    content: "Select a second number to complete the operation. Then click the play button to add it to your side.",
  },
  {
    target: '[data-tour="operations-list"]',
    content: "Your operations will appear here. You can remove them anytime by clicking the trash icon.",
  },
  {
    target: '[data-tour="total"]',
    content: "Keep track of your total here. You need to make both sides equal, but you don't have to use all numbers!",
  },
  {
    target: '[data-tour="check-balance"]',
    content: "When you think both sides are equal, click here to check your balance and win the game!",
  },
];

export const useTour = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [showTour, setShowTour] = useState(false);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setShowTour(true);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === null || prev >= TOUR_STEPS.length - 1) {
        return null;
      }
      return prev + 1;
    });
  }, []);

  const endTour = useCallback(() => {
    setCurrentStep(null);
    setShowTour(false);
  }, []);

  return {
    currentStep,
    showTour,
    startTour,
    nextStep,
    endTour,
    steps: TOUR_STEPS,
  };
};