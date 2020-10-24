import React, { Suspense, useReducer, createContext, Dispatch, FC } from 'react';
import classes from './App.module.sass';
import Header from './components/Header';
import Filter from './components/Filter';
import ErrorBoundary from './containers/ErrorBoundary';
import Loader from './components/Loader';
import { initialState, testReducer, FilterState, Action } from './reducers';
import FlightList from './containers/FlightsList';

interface Context {
  dispatch: Dispatch<Action>;
  state: FilterState;
}
export const FilterContext = createContext<Context>({} as Context);

const App: FC = () => {
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
};

export default App;
