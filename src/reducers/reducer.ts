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

export const initialState: IFilter = {
  'all': true,
  '0': true,
  '1': true,
  '2': true,
  '3': true,
};

export const testReducer = (state: IFilter, action: IAction) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
