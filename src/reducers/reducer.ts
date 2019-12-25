import { createContext } from 'react';

interface IAction {
  type: string,
  payload: object,
}

interface IFilter {
    [key: string]: boolean,
    'all': boolean,
    '0': boolean,
    '1': boolean,
    '2': boolean,
    '3': boolean,
}

export const initialState = {
  'all': true,
  '0': true,
  '1': true,
  '2': true,
  '3': true,
};

export const FilterContext = createContext(initialState);

export const testReducer = (state: IFilter, action: IAction) => {
  switch (action.type) {
    case 'test_update':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
