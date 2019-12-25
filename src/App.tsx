import React, { Suspense } from 'react';
import classes from './App.module.sass';
import Header from './components/Header';
import Filter from './components/Filter';
import ErrorBoundary from './containers/ErrorBoundary';
import FlightList from './containers/FlightsList';
import Loader from './components/Loader';
import { FilterContext, initialState } from './reducers/reducer';

function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader/>}>
        <div className={classes.App}>
          <FilterContext.Provider value={initialState}>
            <Header />
            <div className={classes.content}>
              <Filter />
              <FlightList />
            </div>
          </FilterContext.Provider>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
