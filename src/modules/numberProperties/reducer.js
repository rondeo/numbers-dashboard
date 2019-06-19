import types from './types';

const initialState = {
    number: null,
    drawingsCount: 0,
    lastCount: 0,
    sampleSize: 250,
    isLoading: false,
    hasErrored: false
};

const numberPropsReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case types.FETCH_NUMBER_PROPERTIES_ERROR:
        return {
            ...state,
            hasErrored: action.hasErrored
        };     
  
      case types.FETCH_NUMBER_PROPERTIES_IS_LOADING:
        return {
            ...state,
            hasErrored: false,
            isLoading: action.isLoading
        };

      case types.SET_SAMPLE_SIZE:
        return {
          ...state,
          sampleSize: action.sampleSize
        };
  
      case types.FETCH_NUMBER_PROPERTIES_SUCCESS:
        return {
            ...state,
            hasErrored: false,
            number: action.payload.number,
            drawingsCount: action.payload.drawingsCount,
            lastCount: action.payload.lastCount
        };
  
      default:
        return state;
  
    }
  };
  
  export default numberPropsReducer;