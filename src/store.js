import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./modules/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState());

export default store;
