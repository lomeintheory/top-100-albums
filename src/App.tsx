import React from 'react';
import LandingPage from './components/LandingPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <LandingPage />;
    </ErrorBoundary>
  );
};

export default App;
