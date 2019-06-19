import types from './types';

export const fetchDrawingsSuccess = (response) => {
  return {
    type: types.FETCH_DRAWINGS_SUCCESS,
    payload: response
  }
};

export const fetchDrawingsError = (bool) => {
  return {
    type: types.FETCH_DRAWINGS_ERROR,
    hasErrored: bool
  }
};

export const drawingsIsLoading = (bool) => {
  return {
    type: types.FETCH_DRAWINGS_IS_LOADING,
    isLoading: bool
  }
};

export const setLayout = (layout) => {
  return {
    type: types.SET_LAYOUT,
    layout: layout
  }
};

export const fetchDrawings = (size, page) => {
  return (dispatch) => {
    dispatch(drawingsIsLoading(true));

    const url = `/api/drawings/list/${size}/${page}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(drawingsIsLoading(false));
        return response;
      })
      .then(data => data.json())
      .then((response) => dispatch(fetchDrawingsSuccess(response)))
      .catch(() => dispatch(fetchDrawingsError(true)));
  }
};
