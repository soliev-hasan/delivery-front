import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk as any));

export default store;
