import subcategoriesTypes from './types';

const subcategoriesActions = {
  saveSubcategories(subcategories) {
    return {
      type: subcategoriesTypes.SAVE_SUBCATEGORIES,
      payload: subcategories,
    };
  },
};

export default subcategoriesActions;
