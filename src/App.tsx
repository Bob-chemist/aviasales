import React, { Suspense, useReducer, createContext } from 'react';
import classes from './App.module.sass';
import Header from './components/Header';
import Filter from './components/Filter';
import ErrorBoundary from './containers/ErrorBoundary';
import FlightList from './containers/FlightsList';
import Loader from './components/Loader';
import { initialState, testReducer } from './reducers/reducer';

export const FilterContext = createContext({});

function App() {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader/>}>
        <div className={classes.App}>
          <FilterContext.Provider value={{ dispatch, state }}>
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
