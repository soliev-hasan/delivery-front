import {combineReducers} from 'redux';
import categoriesReducers from './categories/reducers';
import subcategoriesReducers from './subcategories/reducers';
export default combineReducers({
  categories: categoriesReducers,
  subcategories: subcategoriesReducers,
});
