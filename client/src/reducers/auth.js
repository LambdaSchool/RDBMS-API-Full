import * as actionType from '../actions';

const initialState = {
  authenticated: false,
  userId: -1,
  error: '',
};

export default (auth = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_USER_SUCCESS:
      return {
        ...auth,
        authenticated: true,
        userId: action.payload,
      };
    case actionType.AUTH_USER_FAIL:
      return {
        ...auth,
        error: 'Login failed: userId and name did not match.',
      };

    case actionType.AUTH_USER_ERROR:
      return {
        ...auth,
        error: action.payload.response.data.message,
      };
    default:
      return auth;
  }
};
