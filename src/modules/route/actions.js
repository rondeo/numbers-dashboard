import types from './types';

export const setActiveRoute = activeRoute => {
  return {
    type: types.SET_ACTIVE_ROUTE,
    payload: activeRoute
  };
};
