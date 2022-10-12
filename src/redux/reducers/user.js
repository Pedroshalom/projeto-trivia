import { ADD_USER, SCORE_POINTS } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.user.email,
      name: action.user.name,
    };
  case SCORE_POINTS:
    return {
      ...state,
      score: Number(action.points) + Number(state.score),
    };
  default:
    return state;
  }
}

export default player;
