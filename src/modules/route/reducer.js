import types from './types';

const route = {
  name: '/'
};

const activeRoute = (state = route, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_ROUTE:
      if(action.payload !== "/login") {
        return {
          ...state,
          name: action.payload
        };
      } else {
        return state;
      }
    default:
      return state;
  }

};

export default activeRoute;
