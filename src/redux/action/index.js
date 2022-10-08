import getToken from '../../services/API';

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const requestAPIToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestTokenSuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token,
});

export const requestTokenFailure = (error) => ({
  type: REQUEST_TOKEN_FAILURE,
  error,
});

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestAPIToken());
    try {
      const tokenAPI = await getToken();
      const { token } = tokenAPI;
      dispatch(requestTokenSuccess(token));
    } catch (error) {
      dispatch(requestTokenFailure(error));
    }
  };
}
