import types from './types';

export const fetchUserSuccess = (response) => {
  return {
    type: types.FETCH_USER_SUCCESS,
    payload: response
  }
};

export const fetchUserError = (bool) => {
  return {
    type: types.FETCH_USER_ERROR,
    hasErrored: bool
  }
};

export const loginSuccess = (response) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: response
  }
};

export const loginFailure = () => {
  return {
    type: types.LOGIN_FAILURE
  }
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  }
};

export const logoutFailure = () => {
  return {
    type: types.LOGOUT_FAILURE
  }
};

export const fetchUser = () => {
  return (dispatch) => {
    fetch("/api/user/status")
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(data => data.json())
      .then((response) => dispatch(fetchUserSuccess(response)))
      .catch(() => dispatch(fetchUserError(true)));
  }
};

export const login = (username, pwd) => {

  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', pwd);

  return (dispatch) => {
    fetch("/api/login",{
      body: formData,
      method: "post"
    })
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(data => data.json())
    .then((response) => dispatch(loginSuccess(response)))
    .catch(() => dispatch(loginFailure()));
  }

};

export const logout = () => {
  return (dispatch) => {
    fetch("/api/logout")
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(data => data.json())
      .then((response) => dispatch(logoutSuccess()))
      .catch(() => dispatch(logoutFailure()));
  }
};
