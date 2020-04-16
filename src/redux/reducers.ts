/* eslint-disable no-case-declarations */
const initialState = {
  forceDarkmode: false,
  stores: [
    {
      name: 'Default',
      color: '#D32F2F',
      entries: [
        {
          name: 'Item 1',
          done: false,
        },
        {
          name: 'Item 2',
          done: true,
        },
        {
          name: 'Item 3',
          done: false,
        },
      ],
    },
    {
      name: 'Default2',
      color: '#7B1FA2',
      entries: [
        {
          name: 'Item 1',
          done: false,
        },
        {
          name: 'Item 2',
          done: true,
        },
        {
          name: 'Item 3',
          done: false,
        },
        {
          name: 'Item 4',
          done: true,
        },
      ],
    },
  ],
};

interface ChangeItemStatusInterface {
  storeId: number;
  itemId: number;
  itemValue: boolean;
}

const rootReducer: any = (state = initialState, action: {type: string; value: unknown;}) => {
  switch (action.type) {
    case 'SET_FORCE_DARKMODE':
      return { ...state, forceDarkmode: action.value };
    case 'ADD_NEW_STORE':
      return { ...state, stores: [...state.stores, { name: action.value as string, color: 'red', entries: [] }] };
    case 'CHANGE_STORE_ORDER':
      const stores = [...state.stores];
      const values = [...action.value as Array<number>];
      const tmp = stores.splice(values[0], 1);
      stores.splice(values[1], 0, tmp[0]);
      return { ...state, stores };
    case 'CHANGE_ITEM_STATUS':
      const storeValues = action.value as ChangeItemStatusInterface;
      const updatedStore = state.stores[storeValues.storeId];
      updatedStore.entries[storeValues.itemId].done = storeValues.itemValue;
      const iStores = [...state.stores];
      iStores[storeValues.storeId] = updatedStore;
      return { ...state, stores: iStores };
    default:
      return state;
  }
};

export default rootReducer;
