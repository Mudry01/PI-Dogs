import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './Reducer';
import thunk from 'redux-thunk';

const store = createStore( 
    rootReducer, 
    compose( applyMiddleware(thunk) )    
);
    
export default store;