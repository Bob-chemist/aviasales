export const UPDATE = 'UPDATE';

export interface Action {
  type: typeof UPDATE;
  payload: FilterState;
}

export interface FilterState {
    [key: string]: boolean;
    'all': boolean;
    '0': boolean;
    '1': boolean;
    '2': boolean;
    '3': boolean;
}

export const initialState: FilterState = {
  'all': true,
  '0': true,
  '1': true,
  '2': true,
  '3': true,
};

export const testReducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
