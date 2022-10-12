import getToken from '../../services/API';

export const ADD_USER = 'ADD_USER';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE';
<<<<<<< HEAD
export const ADD_SCORE = 'ADD_SCORE';

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});
=======
export const SCORE_POINTS = 'SCORE_POINTS';
>>>>>>> 068ea3b7488b5bdc0a5b2cdcf0bc416ec64f7755

export const addUser = (user) => ({
  type: ADD_USER,
  user,
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

export const getPoints = (points) => ({
  type: SCORE_POINTS,
  points,
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
