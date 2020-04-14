/* eslint-disable no-case-declarations */
const initialState = {
  forceDarkmode: false,
  stores: [
    {
      name: 'Default',
      entries: [],
    },
  ],
};

const listApp: any = (state = initialState, action: {type: string; value: unknown;}) => {
  switch (action.type) {
    case 'SET_FORCE_DARKMODE':
      return { ...state, forceDarkmode: action.value };
    case 'ADD_NEW_STORE':
      return { ...state, stores: [...state.stores, { name: action.value as string, entries: [] }] };
    case 'CHANGE_STORE_ORDER':
      const stores = [...state.stores];
      console.log(action.value);
      const values = [...action.value as Array<number>];
      const tmp = stores.splice(values[0], 1);
      stores.splice(values[1], 0, tmp[0]);
      return { ...state, stores };
    default:
      return state;
  }
};

export default listApp;
