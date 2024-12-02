import categoriesTypes from './types';

const categoriesActions = {
  saveCategories(categories) {
    return {
      type: categoriesTypes.SAVE_CATEGORIES,
      payload: categories,
    };
  },
};

export default categoriesActions;
