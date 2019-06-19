import types from './types';

export const fetchNumberPropsSuccess = (response) => {
  return {
    type: types.FETCH_NUMBER_PROPERTIES_SUCCESS,
    payload: response
  }
};

export const fetchNumberPropsError = (bool) => {
  return {
    type: types.FETCH_NUMBER_PROPERTIES_ERROR,
    hasErrored: bool
  }
};

export const numberPropsIsLoading = (bool) => {
  return {
    type: types.FETCH_NUMBER_PROPERTIES_IS_LOADING,
    isLoading: bool
  }
};

export const setSampleSize = (size) =>  {
  return {
    type: types.SET_SAMPLE_SIZE,
    sampleSize: size
  }
};

export const fetchNumberProperties = (numberType, number, countSize) => {
  return (dispatch) => {

    const url = `/api/numbers/properties/${numberType}/${number}/${countSize}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(numberPropsIsLoading(false));
        return response;
      })
      .then(data => data.json())      
      .then((response) => dispatch(fetchNumberPropsSuccess(response)))
      .catch(() => dispatch(fetchNumberPropsError(true)));
  }
};
