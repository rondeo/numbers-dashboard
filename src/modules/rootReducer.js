import { combineReducers } from 'redux';
import activeRoute from './route/reducer';
import userInfoReducer from './user/reducer';
import messagesReducer from './messages/reducer';
import drawingsReducer from './drawings/reducer';
import homePageReducer from './home/reducer';
import numbersReducer from './numbers/reducer';
import numberPropsReducer from './numberProperties/reducer';

const rootReducer = combineReducers({
  activeRoute,
  userInfo: userInfoReducer,
  messages: messagesReducer,
  drawings: drawingsReducer,
  homePage: homePageReducer,
  numbers: numbersReducer,
  numberProps: numberPropsReducer
});

export default rootReducer;
