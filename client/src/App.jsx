import React, { useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleNewBug = () => {
    setRefresh(!refresh);
  };

  return (
    <ErrorBoundary>
      <h1>Bug Tracker</h1>
      <BugForm onBugCreated={handleNewBug} />
      <BugList key={refresh} />
    </ErrorBoundary>
  );
}

export default App;
