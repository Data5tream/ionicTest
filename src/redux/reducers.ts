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
    default:
      return state;
  }
};

export default listApp;
