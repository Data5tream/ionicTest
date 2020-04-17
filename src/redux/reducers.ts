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

interface ChangeStoreInterface {
  id: number;
  name: string;
  color: string;
}

const rootReducer: any = (state = initialState, action: {type: string; value: unknown;}) => {
  let stores;
  switch (action.type) {
    case 'SET_FORCE_DARKMODE':
      return { ...state, forceDarkmode: action.value };
    case 'ADD_NEW_STORE':
      return { ...state, stores: [...state.stores, { name: action.value as string, color: 'red', entries: [] }] };
    case 'SAVE_STORE':
      const saveValues = action.value as ChangeStoreInterface;
      stores = [...state.stores];
      stores[saveValues.id] = { ...stores[saveValues.id], name: saveValues.name, color: saveValues.color };
      return { ...state, stores };
    case 'REMOVE_STORE':
      stores = [...state.stores];
      stores.splice(action.value as number);
      return { ...state, stores };
    case 'CHANGE_STORE_ORDER':
      stores = [...state.stores];
      const values = [...action.value as Array<number>];
      const tmp = stores.splice(values[0], 1);
      stores.splice(values[1], 0, tmp[0]);
      return { ...state, stores };
    case 'CHANGE_ITEM_STATUS':
      const storeValues = action.value as ChangeItemStatusInterface;
      const updatedStore = state.stores[storeValues.storeId];
      updatedStore.entries[storeValues.itemId].done = storeValues.itemValue;
      stores = [...state.stores];
      stores[storeValues.storeId] = updatedStore;
      return { ...state, stores };
    default:
      return state;
  }
};

export default rootReducer;
