const initialState = {
  forceDarkmode: false,
  stores: [
    {
      name: 'Default',
      color: '211, 47, 47',
      entries: [] as Array<{
        name: string;
        done: boolean;
      }>,
    },
  ],
};

const colors = [
  '211, 47, 47',
  '194, 24, 91',
  '123, 31, 162',
  '81, 45, 168',
  '48, 63, 159',
  '25, 118, 210',
  '2, 136, 209',
  '0, 151, 167',
  '0, 121, 107',
  '56, 142, 60',
  '104, 159, 56',
  '175, 180, 43',
  '251, 192, 45',
  '255, 160, 0',
  '245, 124, 0',
  '230, 74, 25',
];

interface ChangeItemInterface {
  storeId: number;
  itemId: number;
  itemName: string;
  itemValue: boolean;
}

interface ChangeStoreInterface {
  id: number;
  name: string;
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer: any = (state = initialState, action: {type: string; value: unknown;}) => {
  let params, store, stores;
  switch (action.type) {
    // eslint-disable-next-line lines-around-comment
    /* SETTINGS */
    case 'SET_FORCE_DARKMODE':
      return { ...state, forceDarkmode: action.value };

    /* STORE MANAGEMENT */
    case 'ADD_NEW_STORE':
      return { ...state, stores: [...state.stores, { name: action.value as string, color: colors[Math.floor(Math.random() * colors.length)], entries: [] }] };
    case 'SAVE_STORE':
      params = action.value as ChangeStoreInterface;
      stores = [...state.stores];
      stores[params.id] = { ...stores[params.id], name: params.name, color: params.color };
      return { ...state, stores };
    case 'REMOVE_STORE':
      stores = [...state.stores];
      stores.splice(action.value as number);
      return { ...state, stores };
    case 'CHANGE_STORE_ORDER':
      stores = [...state.stores];
      params = [...action.value as Array<number>];
      stores.splice(params[1], 0, stores.splice(params[0], 1)[0]);
      return { ...state, stores };

    /* ENTRY MANAGEMENT */
    case 'ADD_ITEM':
      params = action.value as ChangeItemInterface;
      stores = [...state.stores];
      store = state.stores[params.storeId];
      store.entries.push({ name: params.itemName, done: false });
      stores[params.storeId] = store;
      return { ...state, stores };
    case 'REMOVE_ITEM':
      params = action.value as ChangeItemInterface;
      stores = [...state.stores];
      store = state.stores[params.storeId];
      store.entries.splice(params.itemId, 1);
      stores[params.storeId] = store;
      return { ...state, stores };
    case 'CHANGE_ITEM_STATUS':
      params = action.value as ChangeItemInterface;
      store = state.stores[params.storeId];
      store.entries[params.itemId].done = params.itemValue;
      stores = [...state.stores];
      stores[params.storeId] = store;
      return { ...state, stores };
    default:
      return state;
  }
};

export default rootReducer;
