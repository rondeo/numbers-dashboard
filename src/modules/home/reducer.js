import types from './types';

const initialState = {
  drawing: null,
  jackpot: null,
  next: "",
  hasErrored: false,
  isLoading: false
};

const homePageReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_HOMEPAGE_ERROR:
      return {
        ...state,
        hasErrored: action.hasErrored
      };

    case types.FETCH_HOMEPAGE_IS_LOADING:
      return {
        ...state
        ,
        hasErrored: false,
        isLoading: action.isLoading
      };

    case types.FETCH_HOMEPAGE_SUCCESS:
      return {
        ...state,
        hasErrored: false,
        drawing: action.payload.drawing,
        jackpot: action.payload.jackpot,
        next: action.payload.next
    };

    default:
      return state;

  }
};

export default homePageReducer;
