import React, { Suspense } from 'react';
import classes from './App.module.sass';
import Header from './components/Header';
import Filter from './components/Filter';
import ErrorBoundary from './containers/ErrorBoundary';
import FlightList from './containers/FlightsList';
import Loader from './components/Loader';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader/>}>
        <div className={classes.App}>
          <Header />
          <div className={classes.content}>
            <Filter />
            <FlightList />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
