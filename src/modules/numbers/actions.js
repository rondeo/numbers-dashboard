import types from './types';

export const fetchNumbersSuccess = (response, numberType) => {
  return {
    type: types.FETCH_NUMBERS_SUCCESS,
    payload: response,
    numberType: numberType
  }
};

export const fetchNumbersError = (bool, numberType) => {
  return {
    type: types.FETCH_NUMBERS_ERROR,
    hasErrored: bool,
    numberType: numberType
  }
};

export const numbersIsLoading = (bool, numberType) => {
  return {
    type: types.FETCH_NUMBERS_IS_LOADING,
    isLoading: bool,
    numberType: numberType
  }
};

export const setSortOrder = (numberType, column, direction) => {
  return {
    type: types.SET_NUMBERS_SORT_ORDER,
    numberType: numberType,
    column: column,
    direction: direction
  }
};

export const setLayout = (numberType, layout) => {
  return {
    type: types.SET_LAYOUT,
    numberType: numberType,
    layout: layout
  }
};

export const fetchNumbers = (numberType, column, direction) => {
  return (dispatch) => {
    //dispatch(numbersIsLoading(true, numberType));

    const url = `/api/numbers/list/${numberType}/${column}/${direction}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(numbersIsLoading(false, numberType));
        return response;
      })
      .then(data => data.json())      
      .then((response) => dispatch(fetchNumbersSuccess(response, numberType)))
      .catch(() => dispatch(fetchNumbersError(true, numberType)));
  }
};
