import React from 'react';
import classes from './App.module.sass';
import Header from './components/Header';
import Filter from './components/Filter';
import ErrorBoundary from './containers/ErrorBoundary';
import FlightList from './containers/FlightsList';

function App() {
  return (
    <ErrorBoundary>
      <div className={classes.App}>
        <Header />
        <div className={classes.content}>
          <Filter />
          <FlightList />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
