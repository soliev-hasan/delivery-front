import {combineReducers} from 'redux';
import categoriesReducers from './categories/reducers';
import cartReducers from './cart/reducers';
export default combineReducers({
  categories: categoriesReducers,
  cart: cartReducers,
});
