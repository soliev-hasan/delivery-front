import {combineReducers} from 'redux';
import categoriesReducers from './categories/reducers';
export default combineReducers({
  categories: categoriesReducers,
});
