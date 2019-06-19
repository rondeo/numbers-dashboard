import types from './types';

const initialState = {
  items: [],
  count: 0,
  page: 0,
  pageSize: 25,
  totalDrawings: 0,
  hasErrored: false,
  isLoading: false,
  layout: types.LAYOUT_GRID
};

const drawingsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_DRAWINGS_ERROR:
      return {
        ...state,
        hasErrored: action.hasErrored
      };

    case types.FETCH_DRAWINGS_IS_LOADING:
      return {
        ...state,
        hasErrored: false,
        isLoading: action.isLoading
      };

    case types.FETCH_DRAWINGS_SUCCESS:
      return {
        ...state,
        hasErrored: false,
        items: action.payload.drawings,
        count: action.payload.count,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        totalDrawings: action.payload.totalDrawings
      };

    case types.SET_LAYOUT:
      return {
        ...state,
        layout: action.layout
      };

    default:
      return state;

  }
};

export default drawingsReducer;
