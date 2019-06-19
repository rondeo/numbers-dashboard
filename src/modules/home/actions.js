import types from './types';

export const fetchHomePageSuccess = (response) => {
  return {
    type: types.FETCH_HOMEPAGE_SUCCESS,
    payload: response
  }
};

export const fetchHomePageError = (bool) => {
  return {
    type: types.FETCH_HOMEPAGE_ERROR,
    hasErrored: bool
  }
};

export const homePageIsLoading = (bool) => {
  return {
    type: types.FETCH_HOMEPAGE_IS_LOADING,
    isLoading: bool
  }
};

export const fetchHomePage = () => {
  return (dispatch) => {
    dispatch(homePageIsLoading(true));
    fetch("/api/home/details")
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(homePageIsLoading(false));
        return response;
      })
      .then(data => data.json())
      .then((response) => dispatch(fetchHomePageSuccess(response)))
      .catch(() => dispatch(fetchHomePageError(true)));
  }
};
