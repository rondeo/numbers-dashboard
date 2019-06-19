import types from './types';

const user = {
  displayName: "Go Ahead, Login!",
  annonymous: true,
  hasErrored: false,
  loginFailed: false
};

const userInfoReducer = (state = user, action) => {
  switch (action.type) {

    case types.FETCH_USER_ERROR:
      return {
        ...state,
        annonymous: true,
        hasErrored: action.hasErrored
      };

    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        displayName: action.payload.displayName,
        annonymous: false,
        hasErrored: false
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        displayName: action.payload.displayName,
        annonymous: false,
        hasErrored: false,
        loginFailed: false
      };

    case types.LOGIN_FAILURE:
      return {
        ...state,
        hasErrored: true,
        annonymous: true,
        displayName: "Go Ahead, Login!",
        loginFailed: true
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        annonymous: true,
        hasErrored: false,
        displayName: "Go Ahead, Login!"
      };

    case types.LOGOUT_FAILURE:
      return {
        ...state,
        hasErrored: true,
        annonymous: true,
        displayName: "Go Ahead, Login!"
      };

    default:
      return state;
  }
};

export default userInfoReducer;
