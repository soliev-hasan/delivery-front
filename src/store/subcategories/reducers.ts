import subcategoriesTypes from './types';

const initialState = {
  subcategories: [],
};

const subcategoriesReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case subcategoriesTypes.SAVE_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload,
      };
    default:
      return state;
  }
};

export default subcategoriesReducers;
