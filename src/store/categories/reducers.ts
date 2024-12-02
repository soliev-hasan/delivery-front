import categoriesTypes from './types';

const initialState = {
  categories: [],
};

const categoriesReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case categoriesTypes.SAVE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducers;
