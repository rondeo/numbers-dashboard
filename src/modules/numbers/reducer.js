import types from './types';

const initialState = {
  whiteballs: {
    numbers: [],
    column: "number",
    direction: "DESC",
    hasErrored: false,
    isLoading: false,
    layout: types.LAYOUT_GRID
  },
  powerballs: {
    numbers: [],
    column: "number",
    direction: "DESC",
    hasErrored: false,
    isLoading: false,
    layout: types.LAYOUT_GRID
  }
};

const numbersReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_NUMBERS_ERROR:
      return {
        ...state,
        [action.numberType]: {
          ...state[action.numberType],
          hasErrored: action.hasErrored
        }
      };      

    case types.FETCH_NUMBERS_IS_LOADING:
      return {
        ...state,
        [action.numberType]: {
          ...state[action.numberType],
          hasErrored: false,
          isLoading: action.isLoading
        }
      };

    case types.FETCH_NUMBERS_SUCCESS:
      return {
        ...state,
        [action.numberType]: {
          ...state[action.numberType],
          hasErrored: false,
          numbers: action.payload.numbers,
          column: action.payload.sortColumn,
          direction: action.payload.sortDirection
        }
      };

    case types.SET_NUMBERS_SORT_ORDER:
      return {
        ...state,
        [action.numberType]: {
          ...state[action.numberType],
          column: action.column,
          direction: action.direction
        }
      };

    case types.SET_LAYOUT:
      return {
        ...state,
        [action.numberType]: {
          ...state[action.numberType],
          layout: action.layout
        }
      };

    default:
      return state;

  }
};

export default numbersReducer;
